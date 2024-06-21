const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./routes");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
});
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let users = {};
let user = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    users[socket.id] = { username: data.name, pos: { x: 0, y: 0 }, points: 0 };
    socket.emit("joinSuccess");

    if (Object.keys(users).length === 2) {
      io.emit('beginPlay');
    }
  });

  socket.on("update", (data) => {
    if (users[socket.id]) {
      users[socket.id].pos = data.pos;
      socket.broadcast.emit("updateInfo", { object: "otherUser", pos: data.pos, time: new Date().getTime() });
    }
  });

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });

  socket.on("tug", (data) => {
    io.emit('tug', data);
  });

  socket.on("disconnect", () => {
    console.log('User disconnected:', socket.id);
    delete users[socket.id];
    if (Object.keys(users).length < 2) {
      io.emit('pauseGame');
    }
  });

  if (socket.handshake.auth.username) {
    user.push({
      id: socket.id,
      username: socket.handshake.auth.username,
    });

    socket.on("disconnect", () => {
      user = user.filter(item => item.id !== socket.id);
      io.emit('users:online', user);
    });
    io.emit('users:online', user);
  }


  //movegame mulai dari siniii
  // socket.on('join', (room) => {
  //   socket.join(room);
  //   console.log(`User joined room: ${room}`);
  // });

  // socket.on('move', (data) => {
  //   const { room, position } = data;
  //   io.to(room).emit('move', position); // Emit move event to all clients in the room
  // });
  // untuk game titik
  users[socket.id] = { x: 600, y: 600 };

  socket.emit('currentUsers', users);

  socket.broadcast.emit('newUser', { id: socket.id, pos: users[socket.id] });

  socket.on('move', (data) => {
    if (users[socket.id]) {
      users[socket.id] = data;
      socket.broadcast.emit('userMoved', { id: socket.id, pos: data });
    }
  });

  socket.on('disconnectdot', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
    socket.broadcast.emit('userDisconnecteddot', socket.id);
  });
});

app.use(router);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
