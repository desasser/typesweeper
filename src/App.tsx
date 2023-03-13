import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Typesweeper</h1>
        <Game></Game>
        <p>Disclaimer: This is a work in progress and currently has some bugs.</p>
      </header>
    </div>
  );
}

export default App;
