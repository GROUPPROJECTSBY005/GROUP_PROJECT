import Navbar from "../components/Navbar";
import socket from "../socketio/socket";
import { useEffect, useState } from "react";
import Canvas from "./CanvasGame";



export default function Game() {
  
  const players = [
    "Player1",
    "Player2",
    "Player1",
    "Player2",
    "Player1",
    "Player2",
    "Player1",
    "Player2",
    "Player1",
    "Player2",
    "Player1",
    "Player2",

  ];
const [player ,setPlayer] = useState([])

useEffect(()=>{

  socket.auth = (cb) => {
    cb({ username: localStorage.username })
  }
  
    socket.disconnect().connect()
  
},[])

useEffect(()=>{
  socket.on('users:online' , (user)=>{
    console.log(user)
    setPlayer(user)
  })

  // return (
  //   socket.off('users:online')
  // )
},[])



  return (
    <>
    <Navbar/>
      <div className="lobby">
        <div className="game-background"></div>
        <h1 className="text-center mt-5">Hockey</h1>
        <div className="container-fluid mt-5 d-flex align-items-center justify-content-center">
          <div className="row w-75 height-lobby">
            <div className="col-md-4">
              <div className="card text-bg-success shadow">
                <div className="card-header text-center pt-3">
                  <h4>Online Players</h4>
                </div>
                <div className="alert alert-warning m-3 shadow text-center border-5">
                Select and invite players to play!
                </div>
                <div className="card-body list-player">
                  <div className="d-grid gap-2">
                    {player.map((player, index) => (
                      <button className="btn btn-light shadow" key={index}>
                        {player.username}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card h-100 border-success shadow">
                <div className="card-header text-bg-success text-center pt-3">
                  <h5>Lobby</h5>
                </div>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="alert alert-warning shadow waiting mb-4 border-5" role="alert">
                    Waiting for invitations <br />
                    from other players<span className="animated-ellipsis"></span>
                  </div>
                  <span className="text-warning-emphasis">or</span>
                  <div className="alert alert-warning shadow border-5 waiting mt-4" role="alert">
                   Create Room
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
