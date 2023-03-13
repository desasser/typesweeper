import React, { FC } from 'react';
import "./style.css";

interface CellType {
    onClick: React.MouseEventHandler<HTMLElement>,
    onContextMenu: React.MouseEventHandler<HTMLElement>,
    children: React.ReactNode,
    value: any
}

const Cell : FC<CellType> = ({ onClick, onContextMenu, children, value }) => {

    function getValue() {

        if (!value.isRevealed) {
            return value.isFlagged ? "🚩" : null;
        }
        if (value.isMine) {
            return "💣";
        };
        if (value.neighboringMines === 0){
            return null;
        };

        return value.neighboringMines;
    }

    // handle rendering revealed/hidden cells
    let classes = "cell" + (value.isRevealed ? "" : " hidden") + (value.isFlagged ? " flagged" : "");

    return (
        <div className={classes} onClick={onClick} onContextMenu={onContextMenu}>
            <span>{getValue()}</span>
        </div>
    );
}

export default Cell;