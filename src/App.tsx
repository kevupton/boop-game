import React from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import './App.css';
import gameEngine from './game';

gameEngine.start();

export default ReactiveXComponent()(() => {
  return (
    <div className="App"
         ref={ node => node && node.appendChild(gameEngine.viewElement) }
    />
  );
});
