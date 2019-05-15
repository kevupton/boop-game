import React from 'react';
import './App.css';
import { events } from './game';
import logo from './logo.svg';
import './game';

const config : RTCConfiguration = {
  // 'iceServers': [
  //   {'urls': 'stun:stun.stunprotocol.org:3478'},
  //   {'urls': 'stun:stun.l.google.com:19302'},
  // ]
};

let i = 0;

const App : React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={() => events.triggerLocalEvent('multiply').subscribe()}>Start Sending Data
        </button>
      </header>
    </div>
  );
};

export default App;
