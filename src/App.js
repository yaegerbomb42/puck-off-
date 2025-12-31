import React from 'react';
import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Puck Battle Arena</h1>
        <p>Use WASD or Arrow Keys to move. Knock enemies out of the circle!</p>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
