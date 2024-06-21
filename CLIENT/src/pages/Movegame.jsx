// App.jsx

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import socket from '../socketio/socket';

// const socket = io('http://localhost:3000');


function MoveGame() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('move', (position) => {
      const newBoard = [...board];
      newBoard[position] = turn;
      setBoard(newBoard);
      setTurn(turn === 'X' ? 'O' : 'X');
    });

    return () => {
      socket.disconnect();
    };
  }, [board, turn]);

  const handleJoinRoom = () => {
    socket.emit('join', room);
    setMessage(`Joined room: ${room}`);
  };

  const handleMove = (position) => {
    if (!board[position]) {
      socket.emit('move', { room, position });
    }
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <input
      id="room"
      name="room"
        type="text"
        placeholder="Enter room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <p>{message}</p>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleMove(index)}>
            {cell}
          </div>
        ))}
      </div>
      <p>Current Turn: {turn}</p>
    </div>
  );
}

export default MoveGame;
