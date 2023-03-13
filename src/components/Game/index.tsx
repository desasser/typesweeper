import { FC, FormEvent, useState } from 'react'; 
import "./style.css";
import GameBoard from '../GameBoard';

const Game : FC = () => {
    const [boardSize, setBoardSize] = useState({
        height: 9,
        width: 9,
        mines: 10
    });
    const [values, setValues] = useState(boardSize);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setBoardSize(values);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]:event.target.value})
    };

    return (
        <div className="game-wrapper">
            <form className="size-form" onSubmit={(e:FormEvent) => handleSubmit(e)}>
                <label>Height:</label>
                <input type="text" name="height"  onChange={(e) => handleChange(e)} placeholder="Enter number here..."/>
                <label>Width:</label>
                <input type="text" name="width"  onChange={(e) => handleChange(e)} placeholder="Enter number here..."/>
                <label>Mines:</label>
                <input type="text" name="mines"  onChange={(e) => handleChange(e)} placeholder="Enter number here..."/>
                <button type="submit" value="Submit" className="submit-button">Play</button>
            </form>
            <GameBoard height={boardSize.height} width={boardSize.width} mines={boardSize.mines}/>
        </div>
    );
}

export default Game;