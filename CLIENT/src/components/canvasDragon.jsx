import React, { useEffect, useRef } from 'react';
import Dino from './Dino';
import Obstacle from './Obstacle';
import Ground from './Ground';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const dinoRef = useRef(null);
  const obstacles = useRef([]);
  const groundRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 200;

    const dino = new Dino(ctx);
    dinoRef.current = dino;
    
    const ground = new Ground(ctx);
    groundRef.current = ground;
    
    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ground.update();
      ground.draw();
      dino.update();
      dino.draw();
      obstacles.current.forEach(obstacle => {
        obstacle.update();
        obstacle.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default GameCanvas;
