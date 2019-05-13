import { PeerParty } from '@kevupton/game-engine';
import React from 'react';
import { flatMap, tap } from 'rxjs/operators';
import './App.css';
import logo from './logo.svg';

const config : RTCConfiguration = {
  // 'iceServers': [
  //   {'urls': 'stun:stun.stunprotocol.org:3478'},
  //   {'urls': 'stun:stun.l.google.com:19302'},
  // ]
};

const party  = new PeerParty(config);
const parties : { [key : string] : PeerParty } = {
  [party.uuid]: party,
};

const uuidToPartyUuid : { [key : string] : string } = {
};

party.onIceCandidate$.subscribe(({ uuid, candidate }) => {
  parties[uuidToPartyUuid[uuid]].iceCandidateReceived(uuid, candidate).subscribe();
});

for (let i = 0; i < 10; i++) {
  const otherParty = new PeerParty(config);

  otherParty.message$.subscribe(message => {
    console.log(otherParty.uuid + ': ' + message);
  });

  parties[otherParty.uuid] = otherParty;
  otherParty.onIceCandidate$.subscribe(({ uuid, candidate }) => {
    party.iceCandidateReceived(uuid, candidate).subscribe();
  });

  party.createIdentity().pipe(
    tap(identity => uuidToPartyUuid[identity.uuid] = party.uuid),
    flatMap(identity => {
      return otherParty.identityReceived(identity).pipe(
        flatMap(resultIdentity => {
          uuidToPartyUuid[resultIdentity.uuid] = otherParty.uuid;
          return party.identityReceived(resultIdentity, identity.uuid);
        }),
      );
    }),
  )
    .subscribe();
}

let i = 0;
setInterval(() => {
  i++;
  party.send('test ' + i);
}, 1000);

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
