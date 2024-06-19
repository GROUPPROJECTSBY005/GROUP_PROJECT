import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const OnlineUsers = () => {
  const { onlineUsers } = useContext(AuthContext);

  return (
    <div>
      <h2>Online Users</h2>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
