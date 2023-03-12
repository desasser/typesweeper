import { FC, useState } from 'react'; 
import GameBoard from '../GameBoard';

const Game : FC = () => {
    const [boardSize, setBoardSize] = useState({
        height: 9,
        width: 9,
        mines: 10
    });

    return (
        <div className="game-wrapper">
            <GameBoard height={boardSize.height} width={boardSize.width} mines={boardSize.mines}></GameBoard>
        </div>
    );
}

export default Game;