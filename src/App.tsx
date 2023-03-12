import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Typesweeper</h1>
        <Game></Game>
      </header>
    </div>
  );
}

export default App;
