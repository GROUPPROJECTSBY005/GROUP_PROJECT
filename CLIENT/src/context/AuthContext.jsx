import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/online-users');
        setOnlineUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch online users', error);
      }
    };

    fetchOnlineUsers();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, onlineUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
