const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin : "http://localhost:5173"
    }
});
const port = 3000



app.use(express.urlencoded({extended: true}))
app.use(express.json())

io.on("connection", (socket) => {
    // ...
  });

app.use(router)


httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})