import React from 'react';
import LoginForm from './components/LoginForm';
import OnlineUsers from './components/OnlineUsers';
import Sidebar from './components/Sidebar';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app">
          <Sidebar />
          <LoginForm />
          <OnlineUsers />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
