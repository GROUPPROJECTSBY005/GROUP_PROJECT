import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import socket from "../socketio/socket";
import { ThemeContext } from "../contexts/ThemeContext";
import DotGameComponents from "../components/DotGameComponents";
// import "./Dotgame.css";

const Dotgame = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.auth = { username: localStorage.username };
    socket.disconnect().connect();
  }, []);

  useEffect(() => {
    socket.on("users:online", (user) => {
      setPlayers(user);
    });

    return () => {
      socket.off("users:online");
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="lobby mb-5">
        <div
          className={`game-background ${
            isDarkMode ? "dark-mode" : "light-mode"
          }`}
        ></div>
        <h1 className={`text-center mt-5 ${isDarkMode ? 'text-light' : 'text-dark'}`}>Dot Game</h1>
        <div className="container-fluid mt-5 d-flex align-items-center justify-content-center">
          <div className="row w-75 height-lobby">
            <div className="col">
              <div
                className={`card h-100 ${
                  isDarkMode ? "border-dark" : "border-success"
                }  shadow`}
              >
                <div className="card-body custom-card d-flex flex-column align-items-center justify-content-center">
                    <DotGameComponents />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dotgame;
