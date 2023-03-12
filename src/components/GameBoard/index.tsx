import { FC, useState } from 'react'; 
import Cell from '../Cell';
import GameWon from '../GameWon';
import GameLoss from '../GameLoss';
import "./style.css";

interface GameProps {
    height: number,
    width: number,
    mines: number
}

interface GameData {
    x: number,
    y: number,
    isMine: boolean,
    neighborMines: number,
    isRevealed: boolean,
    isEmpty: boolean,
    isFlagged: boolean
}

// funciton to manage creating a new game
function initBoardData(height:number, width:number, mines:number) {
    let data = createEmptyArray(height, width);
    data = deployMines(data, height, width, mines);
    data = countNeighbours(data, height, width);

    return data;
}

function getRandom(max:number) {
    return Math.floor(Math.random() * (max));
}

// function to generate a grid of cells
function createEmptyArray(height:number, width:number) {
    // TODO: Typing could be improved
    let data:any[] = [];
    for (let i = 0; i < width; i++) {
        data.push([]);
        for (let j = 0; j < height; j++) {
            data[i][j] = {
                x: i,
                y: j,
                isMine: false,
                neighboringMines: 0,
                isRevealed: false,
                isEmpty: false,
                isFlagged: false
            };
        }
    }

    return data;
}

// function to deploy mines at random to the cells
function deployMines(data:any, height:number, width:number, mines:number) {
    let ranX, ranY, mineCounter = 0;
    
    while (mineCounter < mines) {
        ranX = getRandom(width);
        ranY = getRandom(height);

        if (!data[ranX][ranY].isMine) {
            data[ranX][ranY].isMine = true;
            mineCounter++;
        }
    }

    return data;
}

// function to tally how many mines touch a cell
function countNeighbours(data:any, height:number, width:number,) {
    let newData = data;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (data[i][j].isMine !== true) {
                let count = 0;
                const surroundingCells: GameData[] = traverseCells(data[i][j].x,data[i][j].y,data,height,width);
                surroundingCells.map(element => {
                    if (element.isMine) {
                        count++;
                    }
                });
                if (count === 0) {
                    newData[i][j].isEmpty = true;
                }
                newData[i][j].neighboringMines = count;
            }
        }
    }

    return newData;
}


// function to find neighboring cells and return them (grid is laid out 0 to height-1 from top to bottom and 0 to width-1 from left to right)
function traverseCells(x:number,y:number,data:any[],height:number,width:number) {
    const cellNeighbours:GameData[] = [];

    // cell up, except top row
    if (x > 0) {
        cellNeighbours.push(data[x - 1][y]);
    };

    // cell down, except bottom row
    if (x < height - 1) {
        cellNeighbours.push(data[x + 1][y]);
    };

    // cell left, except left column
    if (y > 0) {
        cellNeighbours.push(data[x][y - 1]);
    };

    // cell right, except right column
    if (y < width - 1) {
        cellNeighbours.push(data[x][y + 1]);
    };

    // cell top left, except corresponding corner
    if (x > 0 && y > 0) {
        cellNeighbours.push(data[x - 1][y - 1]);
    };

    // cell top right, except corresponding corner
    if (x > 0 && y < width - 1) {
        cellNeighbours.push(data[x - 1][y + 1]);
    };

    // cell bottom right, except corresponding corner
    if (x < height - 1 && y < width - 1) {
        cellNeighbours.push(data[x + 1][y + 1]);
    };

    // cell bottom left, except corresponding corner
    if (x < height - 1 && y > 0) {
        cellNeighbours.push(data[x + 1][y - 1]);
    };

    return cellNeighbours;
}

const GameBoard : FC<GameProps> = ({ height, width, mines}) => {
    const [gameState, setGameState] = useState({
        boardData: initBoardData(height, width, mines),
        mineCount: mines
    });
    const [gameEnd, setGameEndState] = useState('playing');

    // function to generate the cells
    function renderCells(boardData:any) {
        return boardData.map((columnData: any[], indexA:number) => {
            return columnData.map((rowData, indexB:number) => { 
                return (
                    <Cell onClick={() => handleCellClick(rowData.x, rowData.y)} value={rowData} key={(indexA+1)*(indexB+1)}></Cell>
                )
            })
        })
    }

    // TODO: Additional functions, context menu/right click/etc for flagging and revealing connected cells
    function handleCellClick(x:number, y:number) {
        // if user clicks on a revealed empty cell or a flagged cell, do nothing
        // TODO: Add reveal functionality for clicking an already revealed number
        if (gameState.boardData[x][y].isRevealed || gameState.boardData[x][y].isFlagged) return null;

        // if user clicks on a cell and its a mine, game over
        if (gameState.boardData[x][y].isMine) {
            //TODO: reveal whole board
            revealBoard(width, height, gameState.boardData);

            setGameEndState('loss')
        }

        // modify state to track Flagged and Revealed (cannot be both)
        let newData = gameState.boardData;
        newData[x][y].isFlagged = false;
        newData[x][y].isRevealed = true;

        // if user clicks on a cell and its empty, reveal continuous empty cells and surrounding numbered cells
        if (newData[x][y].isEmpty) {
            newData = revealEmptyCells(x,y,newData);
        }

        // winning states, all mines flagged || all non-mines revealed

        // set state
        setGameState({
            boardData: newData,
            mineCount: mines //TODO: modify this based on flagged cells
        });
    }

    // add flags via handleContextMenu
    function handleContextMenu(event, x:number, y:number) {
        event.preventDefault();
        let newData = gameState.boardData;
        let mines = gameState.mineCount;
        let isWin = false;

        // no action if cell is already revealed
        if (newData[x][y].isRevealed) return;

        if (newData[x][y].isFlagged) {
            newData[x][y].isFlagged = false;
            mines++;
        } else {
            newData[x][y].isFlagged = true;
            mines--
        }

        if (mines===0) {
            const mineArr = getMines(newData);
            const flagArr = getFlags(newData);
            if (JSON.stringify(mineArr) === JSON.stringify(flagArr)) {
                revealBoard();
                console.log('You Win')
            }
        }

        setGameState({
            boardData: newData,
            mineCount: mines
        });
        setGameEndState('win');
    }

    // reveal continuous empty cells and surrounding numbered cells
    function revealEmptyCells(x:number, y:number, data:any[]) {
        let area = traverseCells(x,y,data,height,width);
        area.map(cell => {
            if (!cell.isFlagged && !cell.isRevealed && (cell.isEmpty || !cell.isMine)) {
                data[cell.x][cell.y].isRevealed = true;
                if (cell.isEmpty) {
                    revealEmptyCells(cell.x, cell.y, data);
                }
            }
        });
        return data;
    }

    // reveal whole board
    function revealBoard(width:number, height:number, data:any[]) {
        let newData = data;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                newData[i][j].isRevealed = true;
            }
        }

        setGameState({
            boardData: newData,
            mineCount: mines
        })
    }
    

    return (
        <div className="game-board" style={{gridTemplateColumns: "repeat(" + width + ",1fr)"}}>
            {
                renderCells(gameState.boardData)
            }
            {
                gameEnd === "win" ? <GameWon/> 
                    : gameEnd === "loss" ? <GameLoss/> 
                    : null
            }
        </div>
    );
}

export default GameBoard;