import React, { FC } from 'react';
import "./style.css";

interface ResetType {
    onClick: React.MouseEventHandler<HTMLElement>,
}

const GameWon : FC<ResetType> = ({ onClick }) => {

    return (
        <div className="game-win">
            <h2>Congratulations!</h2>
            <h3>You won!</h3>
            <button onClick={onClick}>Play Again</button>
        </div>
    );
}

export default GameWon;