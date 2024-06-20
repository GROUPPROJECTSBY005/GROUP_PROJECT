import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const user = useRef({ username: 'Player', pos: { x: 0, y: 0 }, points: 0 });
    const otherUser = useRef({ username: 'Opponent', pos: { x: -64, y: -64 }, points: 0, lastTime: 0 });
    const puck = useRef({ pos: { x: 640, y: 400 }, vel: { x: 0, y: 0 }, radius: 25, lastTime: 0 });

    const [userImg, setUserImg] = useState(null);
    const [otherUserImg, setOtherUserImg] = useState(null);
    const [puckImg, setPuckImg] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const s = io('http://localhost:3000');
        setSocket(s);

        s.on('connect', () => {
            console.log('Connected to server');
            s.emit('join', { name: 'Player' });
        });

        s.on('joinSuccess', () => {
            console.log('Successfully joined the game');
        });

        s.on('updateInfo', (data) => {
            if (data.object === 'otherUser' && data.time > otherUser.current.lastTime) {
                otherUser.current.pos = data.pos;
                otherUser.current.lastTime = data.time;
            } else if (data.object === 'puck' && data.time > puck.current.lastTime) {
                puck.current.pos = data.pos;
                puck.current.vel = data.vel;
                puck.current.lastTime = data.time;
            }
        });

        s.on('beginPlay', () => {
            console.log('Game started');
            update();
        });

        s.on('pauseGame', () => {
            console.log('Game paused, waiting for opponent');
        });

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            puck.current.pos.x += puck.current.vel.x;
            puck.current.pos.y += puck.current.vel.y;
            bouncePuck();

            puck.current.vel.x *= 0.9975;
            puck.current.vel.y *= 0.9975;

            if (puckImg && userImg && otherUserImg) {
                ctx.drawImage(puckImg, puck.current.pos.x - puckImg.width / 2, puck.current.pos.y - puckImg.height / 2);
                ctx.drawImage(userImg, user.current.pos.x - userImg.width / 2, user.current.pos.y - userImg.height / 2);
                ctx.drawImage(otherUserImg, otherUser.current.pos.x - otherUserImg.width / 2, otherUser.current.pos.y - otherUserImg.height / 2);
            }

            ctx.save();
            ctx.fillText(`${user.current.username}: ${user.current.points}`, 5, 25);
            ctx.textAlign = 'end';
            ctx.fillText(`${otherUser.current.points} :${otherUser.current.username}`, canvas.width - 5, 25);
            ctx.restore();

            s.emit('update', { pos: user.current.pos });

            requestAnimationFrame(update);
        };

        const bouncePuck = () => {
            if ((puck.current.pos.x - puck.current.radius < 0) || (puck.current.pos.x + puck.current.radius > canvas.width)) {
                puck.current.vel.x *= -1;
            }
            if ((puck.current.pos.y - puck.current.radius < 0) || (puck.current.pos.y + puck.current.radius > canvas.height)) {
                puck.current.vel.y *= -1;
            }
        };

        document.addEventListener('mousemove', (e) => {
            const canvasPos = canvas.getBoundingClientRect();
            user.current.pos.x = Math.max(0, Math.min(e.clientX - canvasPos.left, canvas.width));
            user.current.pos.y = Math.max(0, Math.min(e.clientY - canvasPos.top, canvas.height));
        });

        const userImgElement = new Image();
        userImgElement.src = "../media/userPaddle.png";
        userImgElement.onload = () => setUserImg(userImgElement);

        const otherUserImgElement = new Image();
        otherUserImgElement.src = "../media/enemyPaddle.png";
        otherUserImgElement.onload = () => setOtherUserImg(otherUserImgElement);

        const puckImgElement = new Image();
        puckImgElement.src = "../media/puck.png";
        puckImgElement.onload = () => setPuckImg(puckImgElement);

        ctx.font = "14pt 'Roboto'";

        return () => {
            if (s) s.disconnect();
        };
    }, []);

    return (
        <canvas ref={canvasRef} width="1280" height="800" style={{ border: '1px solid black', backgroundImage: 'url(/background.png)', backgroundSize: 'cover' }}>
            Please update to an HTML5 compatible web browser :)
        </canvas>
    );
};

export default Canvas;
