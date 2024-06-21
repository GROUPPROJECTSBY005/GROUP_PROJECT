import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Canvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      
    }, []);

    return (
        <canvas ref={canvasRef} width="1280" height="800" style={{ border: '1px solid black', backgroundImage: 'url(/background.png)', backgroundSize: 'cover' }}>
            Please update to an HTML5 compatible web browser :)
        </canvas>
    );
};

export default Canvas;
