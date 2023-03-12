import React, { FC } from 'react';
import "./style.css";

interface CellType {
    onClick: React.MouseEventHandler<HTMLElement>,
    // children: React.ReactNode,
    value: any
}

const Cell : FC<CellType> = ({ onClick, value }) => {

    function getValue() {

        if (value.isMine) {
            return "💣";
        };
        if (value.neighboringMines === 0){
            return null;
        };

        return value.neighboringMines;
    }

    // handle rendering revealed/hidden cells
    let classes = "cell" + (value.isRevealed ? "" : " hidden");

    return (
        <div className={classes} onClick={onClick}>
            <span>{getValue()}</span>
        </div>
    );
}

export default Cell;