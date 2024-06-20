import React, { useEffect, useState } from "react";
import socket from "../socketio/socket";

const TugOfWarGame = () => {
  const [position, setPosition] = useState(50); 

  useEffect(() => {
    socket.on('tug', (newPosition) => {
      setPosition(newPosition);
    });

    return () => {
      socket.off('tug');
    };
  }, []);

  const handleTug = (direction) => {
    let newPosition = position;
    if (direction === 'left') {
      newPosition = Math.max(0, position - 3); 
    } else if (direction === 'right') {
      newPosition = Math.min(100, position + 3); 
    }
    setPosition(newPosition);
    socket.emit('tug', newPosition);
  };

  return (
    <div className="tug-of-war-game">
      <div className="rope">
        <div className="marker" style={{ left: `${position}%` }}></div>
      </div>
      <div className="controls">
        <button onClick={() => handleTug('left')}>Tug Left</button>
        <button onClick={() => handleTug('right')}>Tug Right</button>
      </div>
    </div>
  );
};

export default TugOfWarGame;
