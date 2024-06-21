import React, { useState } from 'react';
import Canvas from './CanvasGame';

const EnterGame = () => {
    const [username, setUsername] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        if (username) setIsConnected(true);
    };

    return (
        <div>
            <h1>Ice Hockey!</h1>
            <p>Please enter a username to connect to another player.</p>
            {!isConnected ? (
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button onClick={handleConnect}>Connect</button>
                </div>
            ) : (
                <Canvas username={username} />
            )}
        </div>
    );
};

export default EnterGame;
