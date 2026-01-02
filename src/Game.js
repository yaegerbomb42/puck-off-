import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ITEMS_LIST, ITEM_TIERS } from './data/items';

const Game = ({ mode, equippedId, setScore: setGlobalScore }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(1);
  const [powerupText, setPowerupText] = useState('');
  const [connected, setConnected] = useState(false);

  // Game constants
  const ARENA_RADIUS = 300;
  const PUCK_RADIUS = 20;
  const PLAYER_COLOR = '#00d4ff';
  const ENEMY_COLOR = '#ff4d4d';
  const BG_COLOR = '#282c34';
  const ARENA_COLOR = '#444';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let socket;

    // Get equipped item color
    const equippedItem = ITEMS_LIST.find(i => i.id === equippedId);
    const playerColor = equippedItem && ITEM_TIERS[equippedItem.tier] ? ITEM_TIERS[equippedItem.tier].color : PLAYER_COLOR;

    // Game state
    let player = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: PUCK_RADIUS,
      mass: 1,
      color: playerColor,
      lives: 1,
      powerup: null,
      id: 'local'
    };

    let enemies = []; // Bots or Other Players
    let powerups = [];
    let particles = [];
    let lastTime = 0;

    // Multiplayer State
    let otherPlayers = {};

    const keys = {
      w: false, a: false, s: false, d: false,
      ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
      ' ': false
    };

    const handleKeyDown = (e) => keys[e.key] = true;
    const handleKeyUp = (e) => {
        keys[e.key] = false;
        if (e.key === ' ' && player.powerup) {
            activatePowerup(player.powerup);
            player.powerup = null;
            setPowerupText('');
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    if (mode === 'online') {
        socket = io('http://localhost:3001');
        socket.on('connect', () => {
            setConnected(true);
            socket.emit('join_game', { color: playerColor, name: 'Player' });
        });

        socket.on('room_joined', (data) => {
            player.id = data.playerId;
        });

        socket.on('state_update', (gameState) => {
            // Update other players
            otherPlayers = gameState.players;
            // Remove self from others
            delete otherPlayers[player.id];
        });
    }

    const spawnEnemy = () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * (ARENA_RADIUS - 100);
      enemies.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: PUCK_RADIUS,
        mass: 1,
        color: ENEMY_COLOR,
        dead: false
      });
    };

    // Initialize game
    const init = () => {
      player.x = 0;
      player.y = 0;
      player.vx = 0;
      player.vy = 0;
      player.lives = mode === 'team' ? 15 : 1;

      enemies = [];
      if (mode !== 'online') {
        for(let i = 0; i < 3; i++) spawnEnemy();
      }
    };

    const spawnPowerup = () => {
        const types = [
            { name: 'Rope Swing', type: 'rope', color: 'yellow' },
            { name: 'Bounce x1.2', type: 'bounce', color: 'orange' },
            { name: '+1 Life', type: 'life', color: 'green' }
        ];
        const p = types[Math.floor(Math.random() * types.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (ARENA_RADIUS - 40);
        powerups.push({
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            radius: 10,
            ...p,
            life: 500
        });
    };

    const addParticles = (x, y, color, count) => {
        for(let i=0; i<count; i++) {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 30,
                color
            });
        }
    };

    const activatePowerup = (p) => {
        if (p.type === 'bounce') {
            player.vx *= -2.5;
            player.vy *= -2.5;
            addParticles(player.x, player.y, 'white', 10);
        } else if (p.type === 'life') {
            setLives(l => l + 1);
        } else if (p.type === 'rope') {
            // Logic for rope
            let targets = mode === 'online' ? Object.values(otherPlayers) : enemies;
             // Find nearest
            let nearest = null;
            let minD = Infinity;
            targets.forEach(e => {
                const d = Math.hypot(e.x - player.x, e.y - player.y);
                if (d < minD) { minD = d; nearest = e; }
            });
             if (nearest && minD < 300) {
                 // In online, we can't easily affect others directly without server logic
                 // But for visual feedback we can
                 addParticles(nearest.x, nearest.y, 'yellow', 5);
             }
        }
    };

    const checkCollision = (p1, p2) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.hypot(dx, dy);
        const minDistance = p1.radius + p2.radius;

        if (distance < minDistance) {
            // Collision detected
            // Resolve overlap
            const overlap = minDistance - distance;
            const nx = dx / distance;
            const ny = dy / distance;

            // Move apart proportional to inverse mass (assuming equal mass for now)
            p1.x -= nx * overlap * 0.5;
            p1.y -= ny * overlap * 0.5;
            p2.x += nx * overlap * 0.5;
            p2.y += ny * overlap * 0.5;

            const v1n = p1.vx * nx + p1.vy * ny;
            const v2n = p2.vx * nx + p2.vy * ny;
            const dvn = v1n - v2n;

            p1.vx -= dvn * nx * 1.2;
            p1.vy -= dvn * ny * 1.2;
            p2.vx += dvn * nx * 1.2;
            p2.vy += dvn * ny * 1.2;

            addParticles((p1.x+p2.x)/2, (p1.y+p2.y)/2, 'orange', 3);
        }
    };

    const update = (dt) => {
      // Input
      const speed = 0.6;
      if (keys.w || keys.ArrowUp) player.vy -= speed;
      if (keys.s || keys.ArrowDown) player.vy += speed;
      if (keys.a || keys.ArrowLeft) player.vx -= speed;
      if (keys.d || keys.ArrowRight) player.vx += speed;

      // Friction
      const friction = 0.96;
      player.vx *= friction;
      player.vy *= friction;
      player.x += player.vx;
      player.y += player.vy;

      // Bounds
      const dist = Math.hypot(player.x, player.y);
      if (dist > ARENA_RADIUS - player.radius) {
         setGameOver(true);
      }

      // Multiplayer Update
      if (mode === 'online' && socket) {
          socket.emit('player_update', {
              x: player.x, y: player.y,
              vx: player.vx, vy: player.vy
          });
      } else {
          // Local logic
          if (Math.random() < 0.005) spawnPowerup();

           // Powerups
          powerups.forEach(p => {
              if (Math.hypot(p.x - player.x, p.y - player.y) < player.radius + p.radius) {
                  if (!player.powerup) {
                      player.powerup = p;
                      setPowerupText(p.name);
                      p.dead = true;
                  }
              }
              p.life--;
              if (p.life <= 0) p.dead = true;
          });
          powerups = powerups.filter(p => !p.dead);

          // Enemies
          enemies.forEach(enemy => {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const distToPlayer = Math.hypot(dx, dy);
            if (distToPlayer > 0) {
                enemy.vx += (dx / distToPlayer) * 0.15;
                enemy.vy += (dy / distToPlayer) * 0.15;
            }

            enemy.vx *= friction;
            enemy.vy *= friction;
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;

            if (Math.hypot(enemy.x, enemy.y) > ARENA_RADIUS + enemy.radius) {
                enemy.dead = true;
                setScore(s => s + 1);
                addParticles(enemy.x, enemy.y, 'red', 15);
            }
          });

          const aliveEnemies = enemies.filter(e => !e.dead);
          if (aliveEnemies.length < enemies.length) {
              enemies = aliveEnemies;
              spawnEnemy();
          }

          // Collisions
          enemies.forEach(enemy => checkCollision(player, enemy));
          for (let i = 0; i < enemies.length; i++) {
              for (let j = i + 1; j < enemies.length; j++) {
                  checkCollision(enemies[i], enemies[j]);
              }
          }
      }

      particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
      });
      particles = particles.filter(p => p.life > 0);
    };

    const draw = () => {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Arena
      ctx.beginPath();
      ctx.arc(0, 0, ARENA_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = ARENA_COLOR;
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // Powerups
      powerups.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
          ctx.fillStyle = p.color;
          ctx.fill();
      });

      // Player
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Other Players (Online)
      if (mode === 'online') {
          Object.values(otherPlayers).forEach(p => {
              ctx.beginPath();
              ctx.arc(p.x, p.y, PUCK_RADIUS, 0, Math.PI * 2);
              ctx.fillStyle = p.color || '#fff';
              ctx.fill();
              ctx.strokeStyle = '#fff';
              ctx.stroke();
          });
      }

      // Enemies (Offline)
      if (mode !== 'online') {
          enemies.forEach(enemy => {
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            ctx.fillStyle = enemy.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.stroke();
          });
      }

      particles.forEach(p => {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 3, 3);
      });

      ctx.restore();
    };

    const loop = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const dt = timestamp - lastTime;
      lastTime = timestamp;

      if (!gameOver) {
          update(dt);
      }
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    init();
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
      if (socket) socket.disconnect();
    };
  }, [gameOver, mode, equippedId, setGlobalScore]);

  return (
    <div className="game-container">
        <div className="hud">
            {mode === 'online' && !connected && <div>Connecting...</div>}
            Score: {score} | Powerup: {powerupText || 'None'}
            {gameOver && <div className="game-over">GAME OVER <button onClick={() => window.location.reload()}>Restart</button></div>}
        </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        style={{ border: '1px solid black', borderRadius: '4px' }}
      />
    </div>
  );
};

export default Game;
