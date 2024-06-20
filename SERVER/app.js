const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./routes");
const cors = require('cors')


const app = express();
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let users = {}
let user = []
io.on("connection", (socket) => {
  // ...
  socket.on("join", (data) => {
    users[socket.id] = { username: data.name, pos: { x: 0, y: 0 }, points: 0 };
    socket.emit("joinSuccess");
});
socket.on("update", (data) => {
  if (users[socket.id]) {
      users[socket.id].pos = data.pos;
  }
  io.emit("updateInfo", { object: "otherUser", pos: data.pos, time: new Date().getTime() });
});

socket.on("disconnect", () => {
  console.log('user disconnected');
  delete users[socket.id];
});

  // console.log( socket.handshake.auth.username  , '<<<--username')
  if (socket.handshake.auth.username){

    user.push({
      id: socket.id,
      username: socket.handshake.auth.username,
    });
    
    socket.on("disconnect", () => {
      user = user.filter(item =>  item.id !== socket.id)
      io.emit('users:online' , user)
    });
    // console.log(user)
    io.emit('users:online' , user)
  }
});

app.use(router);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
