import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import OnlineUsers from './components/OnlineUsers';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <div className="main-content">
              <Navbar />
              <>
                <Link path="/" exact="true" component={HomePage} />
                <Link path="/login" component={LoginForm} />
                <Link path="/register" component={RegisterForm} />
                <Link path="/online-users" component={OnlineUsers} />
                <Link path="/game" component={GamePage} />
              </>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
