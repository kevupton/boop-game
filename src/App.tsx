import { GameEngine, GameEventManager } from '@kevupton/game-engine';
import React from 'react';
import './App.css';
import ObjectLogger from './components/logger/ObjectLogger';
import gameEngine from './game';

export default () => {
  return (
    <div className="App"
         ref={ node => node && node.appendChild(gameEngine.viewElement) }>

      <div className='frame-rate'>
        <h6>Frame Rate:</h6>
        <ObjectLogger channel={GameEngine.FRAME_LOOP_LOG} take={10} />
      </div>

      <div className='tick-rate'>
        <h6>Tick Rate:</h6>
        <ObjectLogger channel={GameEngine.TICK_LOOP_LOG} take={10} />
      </div>

      <div className='event-log'>
        <h6>Event Log:</h6>
        <ObjectLogger channel={GameEventManager.EVENT_TRIGGER_LOG} take={10} />
      </div>
    </div>
  );
};
