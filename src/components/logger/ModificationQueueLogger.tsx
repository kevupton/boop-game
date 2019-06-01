import { ModificationQueue, CurrentModifications } from '@kevupton/game-engine';
import * as React from 'react';
import { FC } from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import gameEngine from '../../game';
import LoggerContainer from './LoggerContainer';

interface LoggerProps {
  queue : CurrentModifications<any>[];
}

export default ReactiveXComponent({
  queue: gameEngine.logger.on$(ModificationQueue.QUEUE_LOG),
}, { queue: [] })<FC<LoggerProps>>(({ queue = [] }) => {
  return (
    <LoggerContainer className='modification-queue-log'>
      <div className='log-item'>
        { queue.map((item, index) => (
          <div key={ index } onMouseDown={ () => console.log(item) } className='queue-item'>
            { item.request.uuid }
          </div>
        )) }
      </div>
    </LoggerContainer>
  );
});
