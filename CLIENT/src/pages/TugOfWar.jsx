import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import socket from "../socketio/socket";
import TugOfWarGame from "../components/TugOfWarGame";
import { ThemeContext } from "../contexts/ThemeContext";

const TugOfWar = () => {
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
      <div className="lobby">
        <div
          className={`game-background ${
            isDarkMode ? "dark-mode" : "light-mode"
          }`}
        ></div>
        <h1 className={`text-center mt-5 ${isDarkMode ? 'text-light' : 'text-dark'}`}>Tug Of War</h1>
        <div className="container-fluid mt-5 d-flex align-items-center justify-content-center">
          <div className="row w-75 height-lobby">
            <div className="col-md-4">
              <div
                className={`card ${
                  isDarkMode ? "text-bg-dark" : "text-bg-success"
                } shadow`}
              >
                <div className="card-header text-center pt-3">
                  <h4>Online Players</h4>
                </div>
                <div className="alert alert-warning m-3 shadow text-center border-5 waiting">
                  All online Players!
                </div>
                <div className="card-body list-player">
                  <div className="d-grid gap-2">
                    {players.map((player, index) => (
                      <button className="btn btn-light shadow" key={index}>
                        {player.username}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div
                className={`card h-100 ${
                  isDarkMode ? "border-dark" : "border-success"
                }  shadow`}
              >
                <div
                  className={`card-header ${
                    isDarkMode ? "text-bg-dark" : "text-bg-success"
                  } text-center pt-3`}
                >
                  <h5>Lobby</h5>
                </div>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <TugOfWarGame />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TugOfWar;
