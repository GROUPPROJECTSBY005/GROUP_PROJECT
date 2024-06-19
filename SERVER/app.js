// const express = require('express')
// const router = require('./routes/router')
// const app = express()
// const port = 3000

// app.use(cors())
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// router
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
