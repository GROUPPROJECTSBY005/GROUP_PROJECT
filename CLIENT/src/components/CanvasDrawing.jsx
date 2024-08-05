import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import socket from '../socketio/socket';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvasContainer = canvasRef.current.parentElement;
      setCanvasSize({ width: canvasContainer.clientWidth, height: canvasContainer.clientHeight });
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    socket.on('drawing', (data) => {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0);
      image.src = data;
    });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      socket.off('drawing');
    };
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    draw(offsetX, offsetY);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    sendCanvasData();
  };

  const draw = (x, y) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    draw(offsetX, offsetY);
  };

  const sendCanvasData = () => {
    const dataURL = canvasRef.current.toDataURL();
    socket.emit('drawing', dataURL);
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={handleMouseMove}
      onMouseOut={finishDrawing}
      style={{ border: '1px solid black', width: '100%', height: '100%' }}
    />
  );
};

export default DrawingCanvas;
