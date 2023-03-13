import React, { FC } from 'react';
import "./style.css";

interface ResetType {
    onClick: React.MouseEventHandler<HTMLElement>,
}

const EndGame : FC<ResetType> = ({ onClick }) => {
    return (
        <div className="game-over">
            <h3>Oh no! Sadly, you've exploded. Do you want to try again?</h3>
            <button onClick={onClick}>Play Again</button>
        </div>
    );
}

export default EndGame;