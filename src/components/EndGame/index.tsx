import React, { FC } from 'react';
import "./style.css";


const EndGame : FC = () => {

    return (
        <div>
            <h3>Congratulations, you won!</h3>
            <h3>You lost, start over?</h3>
            <button>New Game</button>
        </div>
    );
}

export default EndGame;