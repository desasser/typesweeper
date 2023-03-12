import React, { FC } from 'react';
import "./style.css";


const EndGame : FC = () => {
    // TODO: Add some transition or something to soften the modal, change position and size
    // TODO: Send gameEnd as props to control the text instead of separate components
    return (
        <div className="game-over">
            <h3>Oh no! Sadly, you've exploded. Do you want to try again?</h3>
            <button>New Game</button>
        </div>
    );
}

export default EndGame;