import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import Store from './Store';

function App() {
  const [view, setView] = useState('menu'); // menu, game, store
  const [mode, setMode] = useState('single');
  const [inventory, setInventory] = useState([]); // List of owned item IDs
  const [equippedId, setEquippedId] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Puck Battle Arena: HYPE</h1>
        {view === 'menu' && (
          <div className="menu">
             <button onClick={() => { setMode('single'); setView('game'); }}>Play Single Player</button>
             <button onClick={() => { setMode('online'); setView('game'); }}>Play Online Multiplayer</button>
             <button onClick={() => { setMode('team'); setView('game'); }}>Play Team 2v2 (Bots)</button>
             <button onClick={() => setView('store')}>Arena Store</button>
             <div className="credits">
                <p>Equipped: {equippedId ? 'Custom Icon' : 'Default'}</p>
             </div>
          </div>
        )}

        {view === 'game' && (
           <div>
             <button className="back-btn" onClick={() => setView('menu')}>Back to Menu</button>
             <Game mode={mode} equippedId={equippedId} setScore={setScore} />
           </div>
        )}

        {view === 'store' && (
           <div>
             <button className="back-btn" onClick={() => setView('menu')}>Back to Menu</button>
             <Store inventory={inventory} setInventory={setInventory} setEquippedId={setEquippedId} />
           </div>
        )}
      </header>
    </div>
  );
}

export default App;
