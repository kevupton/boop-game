import { GameEngine, GameEventManager } from '@kevupton/game-engine';
import React from 'react';
import './App.css';
import Logger from './components/logger/Logger';
import gameEngine from './game';

export default () => {
  return (
    <div className="App"
         ref={ node => node && node.appendChild(gameEngine.viewElement) }>

      <div className='frame-rate'>
        <h6>Frame Rate:</h6>
        <Logger channel={GameEngine.FRAME_LOOP_LOG} take={10} />
      </div>

      <div className='tick-rate'>
        <h6>Tick Rate:</h6>
        <Logger channel={GameEngine.TICK_LOOP_LOG} take={10} />
      </div>

      <div className='event-log'>
        <h6>Event Log:</h6>
        <Logger channel={GameEventManager.EVENT_TRIGGER_LOG} take={10} />
      </div>
    </div>
  );
};
