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

let user = []
io.on("connection", (socket) => {
  // ...

  // console.log( socket.handshake.auth.username  , '<<<--username')
  if (socket.handshake.auth.username)
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
});

app.use(router);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
