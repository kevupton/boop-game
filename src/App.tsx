import { GameEngine, GameState } from '@kevupton/game-engine';
import React from 'react';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/operators';
import './App.css';
import AvgLogger from './components/logger/AvgLogger';
import BasicLogger from './components/logger/BasicLogger';
import EventLogger from './components/logger/EventLogger';
import ItemLogger from './components/logger/ItemLogger';
import gameEngine from './game';

const avgPipes = pipe(
  map<any, number>(({ delta }) => delta),
  filter((delta) => delta !== 0),
  map(delta => 1000 / delta),
);

export default () => {
  return (
    <div className="App"
         ref={ node => node && node.appendChild(gameEngine.viewElement) }>

      <div className='top-left'>
        <h6>Log:</h6>
        <BasicLogger/>

        <h6>Event Log:</h6>
        <div className='event-log'>
          <EventLogger keep={ 20 }/>
        </div>
      </div>

      <div className='top-right fps'>
        <AvgLogger nb$={ {
          FPS: gameEngine.logger.on$(GameEngine.FRAME_LOOP_LOG).pipe(avgPipes),
          TPS: gameEngine.logger.on$(GameEngine.TICK_LOOP_LOG).pipe(avgPipes),
        } }
                   avgMax={ 20 }
                   round={ 0 }/>

        <h6>Game State:</h6>
        <ItemLogger item={ gameEngine.logger.on$(GameState.STATE_LOG) }/>
      </div>
    </div>
  );
};
