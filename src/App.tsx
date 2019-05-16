import React from 'react';
import './App.css';
import { ReactiveXComponent } from 'reactive-x-component';
import {gameState } from './game';



export default ReactiveXComponent({
  state: gameState.state$,
}, { state: gameState.state })(({ state }) => {
  return (
    <div className="App">
      <div style={ {
        borderRadius: '50%',
        backgroundColor: 'red',
        position: 'absolute',
        width: 20,
        height: 20,
        top: state.player1PosY,
        left: state.player1PosX,
        transform: 'translate(-50%, -50%)',
        transition: '200ms',
      } }/>
    </div>
  );
});
