const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const ROOM_SIZE = 4;
let rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_game', (data) => {
    // Find or create room
    let roomID = null;
    for (const id in rooms) {
      if (rooms[id].players.length < ROOM_SIZE) {
        roomID = id;
        break;
      }
    }

    if (!roomID) {
      roomID = Math.random().toString(36).substring(7);
      rooms[roomID] = {
        id: roomID,
        players: [],
        gameState: {
            players: {},
            powerups: []
        }
      };
    }

    socket.join(roomID);
    rooms[roomID].players.push(socket.id);

    // Initialize player in state
    rooms[roomID].gameState.players[socket.id] = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        color: data.color || '#fff',
        name: data.name || 'Player',
        score: 0
    };

    socket.emit('room_joined', { roomID, playerId: socket.id });
    io.to(roomID).emit('player_list', rooms[roomID].players);
  });

  socket.on('player_update', (data) => {
      const roomID = Array.from(socket.rooms).find(r => r !== socket.id);
      if (roomID && rooms[roomID]) {
          // Trust client for movement (simple version)
          // In authoritative version, we would apply inputs here
          rooms[roomID].gameState.players[socket.id].x = data.x;
          rooms[roomID].gameState.players[socket.id].y = data.y;
          rooms[roomID].gameState.players[socket.id].vx = data.vx;
          rooms[roomID].gameState.players[socket.id].vy = data.vy;

          // Broadcast state (could be optimized to tick rate)
          socket.to(roomID).emit('state_update', rooms[roomID].gameState);
      }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Cleanup
    for (const id in rooms) {
        const idx = rooms[id].players.indexOf(socket.id);
        if (idx !== -1) {
            rooms[id].players.splice(idx, 1);
            delete rooms[id].gameState.players[socket.id];
            io.to(id).emit('player_list', rooms[id].players);
            if (rooms[id].players.length === 0) {
                delete rooms[id];
            }
            break;
        }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
