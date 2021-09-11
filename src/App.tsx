import React from 'react';
import logo from './logo.svg';
import './App.css';
import Joystream from './components/Joystream/Joystream';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>
            <Joystream/>
          </code>
        </p>
      </header>
    </div>
  );
}

export default App;
