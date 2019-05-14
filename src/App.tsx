import { SocketParty } from '@kevupton/game-engine';
import React from 'react';
import './App.css';
import logo from './logo.svg';

const config : RTCConfiguration = {
  // 'iceServers': [
  //   {'urls': 'stun:stun.stunprotocol.org:3478'},
  //   {'urls': 'stun:stun.l.google.com:19302'},
  // ]
};

const party = new SocketParty(config);

party.message$.subscribe(message => {
  console.log(message);
});

let i = 0;

const App : React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={ () => {
          setInterval(() => {
            i++;
            party.send('test ' + i);
          }, 1000);
        } }>Start Sending Data
        </button>
      </header>
    </div>
  );
};

export default App;
