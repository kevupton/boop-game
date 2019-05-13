import { PeerIdentity, PeerParty } from 'game-engine';
import React from 'react';
import { flatMap, tap } from 'rxjs/operators';
import './App.css';
import logo from './logo.svg';

const w = (window as any as {
  party : PeerParty;
  identity : PeerIdentity;
  setIdentity : any;
  setIdentity2 : any;
});

const config : RTCConfiguration = {
  'iceServers': [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ]
};

const party  = w.party = new PeerParty(config);
const party2 = new PeerParty(config);


party.onIceCandidate$.subscribe(({ uuid, candidate }) => {
  party2.iceCandidateReceived(uuid, candidate).subscribe();
});

party2.onIceCandidate$.subscribe(({ uuid, candidate }) => {
  party.iceCandidateReceived(uuid, candidate).subscribe();
});

party.createIdentity().pipe(
  tap(identity => console.log(identity)),
  flatMap(identity => {
    return party2.identityReceived(identity).pipe(
      flatMap(resultIdentity => {
        return party.identityReceived(resultIdentity, identity.uuid);
      }),
    );
  }),
)
  .subscribe();

party2.message$.subscribe(message => {
  console.log('Message Received: ', message);
});

setInterval(() => {
  party.send('test');
}, 500);

const App : React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
