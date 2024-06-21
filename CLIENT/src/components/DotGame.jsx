import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socket from '../socketio/socket';

// const socket = io('http://localhost:3000');


const DotGame = () => {
  const [users, setUsers] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mengambil daftar user saat ini
    socket.on('currentUsers', (users) => {
      setUsers(users);
    });

    // Menangani user baru yang bergabung
    socket.on('newUser', (data) => {
      setUsers((prevUsers) => ({ ...prevUsers, [data.id]: data.pos }));
    });

    // Menangani perpindahan user
    socket.on('userMoved', (data) => {
      setUsers((prevUsers) => ({ ...prevUsers, [data.id]: data.pos }));
    });

    // Menangani user yang disconnect
    socket.on('userDisconnecteddot', (id) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        delete newUsers[id];
        return newUsers;
      });
    });

    return () => {
      socket.off('currentUsers');
      socket.off('newUser');
      socket.off('userMoved');
      socket.off('userDisconnecteddot');
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prevPosition) => {
        let { x, y } = prevPosition;
        switch (e.key) {
          case 'ArrowUp':
            y -= 5;
            break;
          case 'ArrowDown':
            y += 5;
            break;
          case 'ArrowLeft':
            x -= 5;
            break;
          case 'ArrowRight':
            x += 5;
            break;
          default:
            return prevPosition;
        }
        const newPos = { x, y };
        socket.emit('move', newPos);
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      {Object.keys(users).map((id) => (
        <div
          key={id}
          style={{
            position: 'absolut',
            left: users[id].x,
            top: users[id].y,
            width: 10,
            height: 10,
            backgroundColor: 'red',
          }}
        />
      ))}
    </div>
  );
};

export default DotGame;
