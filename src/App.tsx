import React from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import './App.css';
import { gameState } from './game';

export default ReactiveXComponent({
  state: gameState.state$,
}, { state: gameState.state })(({ state }) => {
  const players = Object.keys(state.players);

  return (
    <div className="App">
      { players.map(playerId => (
        <div key={ playerId } style={ {
          borderRadius: '50%',
          backgroundColor: state.players[playerId].color,
          position: 'absolute',
          width: 20,
          height: 20,
          top: state.players[playerId].y,
          left: state.players[playerId].x,
          transform: 'translate(-50%, -50%)',
          transition: '200ms',
        } }/>
      )) }
    </div>
  );
});
