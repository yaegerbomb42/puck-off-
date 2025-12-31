import React, { useRef, useEffect, useState } from 'react';

const Game = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game constants
  const ARENA_RADIUS = 300;
  const PUCK_RADIUS = 20;
  const PLAYER_COLOR = '#00d4ff'; // Cyan
  const ENEMY_COLOR = '#ff4d4d'; // Red
  const BG_COLOR = '#282c34';
  const ARENA_COLOR = '#444';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Game state
    let player = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: PUCK_RADIUS,
      mass: 1,
      color: PLAYER_COLOR
    };

    let enemies = [];
    let lastTime = 0;

    // Input handling
    const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      ArrowUp: false,
      ArrowLeft: false,
      ArrowDown: false,
      ArrowRight: false
    };

    const handleKeyDown = (e) => keys[e.key] = true;
    const handleKeyUp = (e) => keys[e.key] = false;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Initialize game
    const init = () => {
      player.x = 0;
      player.y = 0;
      player.vx = 0;
      player.vy = 0;
      enemies = [];
      // Spawn some enemies
      for(let i = 0; i < 3; i++) {
        spawnEnemy();
      }
    };

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
        color: ENEMY_COLOR
      });
    };

    const update = (dt) => {
      // Player Input
      const speed = 0.5;
      if (keys.w || keys.ArrowUp) player.vy -= speed;
      if (keys.s || keys.ArrowDown) player.vy += speed;
      if (keys.a || keys.ArrowLeft) player.vx -= speed;
      if (keys.d || keys.ArrowRight) player.vx += speed;

      // Friction
      const friction = 0.98;
      player.vx *= friction;
      player.vy *= friction;

      // Update positions
      player.x += player.vx;
      player.y += player.vy;

      // Check arena bounds for player
      const dist = Math.sqrt(player.x * player.x + player.y * player.y);
      if (dist > ARENA_RADIUS - player.radius) {
         // Simple bounce or stop? Let's stop for player inside, or maybe game over if pushed out?
         // "Sumo" usually means you lose if you go out.
         // Let's make it Game Over if player leaves arena.
         setGameOver(true);
      }

      // Update enemies
      enemies.forEach(enemy => {
        // Simple AI: Move towards player slightly
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distToPlayer = Math.sqrt(dx*dx + dy*dy);
        if (distToPlayer > 0) {
            enemy.vx += (dx / distToPlayer) * 0.1;
            enemy.vy += (dy / distToPlayer) * 0.1;
        }

        enemy.vx *= friction;
        enemy.vy *= friction;
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        // Check bounds for enemies
        const eDist = Math.sqrt(enemy.x * enemy.x + enemy.y * enemy.y);
        if (eDist > ARENA_RADIUS + enemy.radius) {
            // Enemy knocked out!
            // Remove enemy and add score?
            // For now, mark for removal
            enemy.dead = true;
            setScore(s => s + 1);
        }
      });

      // Remove dead enemies
      const aliveEnemies = enemies.filter(e => !e.dead);
      if (aliveEnemies.length < enemies.length) {
          enemies = aliveEnemies;
          // Spawn new one to keep pressure
          spawnEnemy();
      }

      // Collisions
      // Player vs Enemies
      enemies.forEach(enemy => {
          checkCollision(player, enemy);
      });

      // Enemy vs Enemy
      for (let i = 0; i < enemies.length; i++) {
          for (let j = i + 1; j < enemies.length; j++) {
              checkCollision(enemies[i], enemies[j]);
          }
      }
    };

    const checkCollision = (p1, p2) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
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

            // Elastic collision response
            // Normal velocity
            const v1n = p1.vx * nx + p1.vy * ny;
            const v2n = p2.vx * nx + p2.vy * ny;

            // Tangent velocity (unchanged)
            // We just swap normal velocities for equal mass
            // v1n_new = v2n
            // v2n_new = v1n

            // Apply impulse
            const dvn = v1n - v2n;
            p1.vx -= dvn * nx;
            p1.vy -= dvn * ny;
            p2.vx += dvn * nx;
            p2.vy += dvn * ny;

            // Add some "pop"
            p1.vx *= 1.1; p1.vy *= 1.1;
            p2.vx *= 1.1; p2.vy *= 1.1;
        }
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center view
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Draw Arena
      ctx.beginPath();
      ctx.arc(0, 0, ARENA_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = ARENA_COLOR;
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // Draw Player
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Enemies
      enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = enemy.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();
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
    };
  }, [gameOver]);

  return (
    <div className="game-container">
        <div className="hud">
            Score: {score}
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
