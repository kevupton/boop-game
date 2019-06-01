import { GameEvent, GameEventManager } from '@kevupton/game-engine';
import * as React from 'react';
import { FC } from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import { scan } from 'rxjs/operators';
import gameEngine from '../../game';
import { dateFormat } from '../../util/date-format';
import LoggerContainer from './LoggerContainer';

interface LoggerProps {
  keep : number;
}

interface EventLogData {
  event : GameEvent;
  eventUuid : string;
}

interface EventDetails extends EventLogData {
  date : Date;
}

const EventLogger : FC<LoggerProps> = ({ keep }) => {
  return (<LoggerContainer>
    <LogItem values={ gameEngine.logger.on$(GameEventManager.EVENT_TRIGGER_LOG).pipe(
      scan<EventLogData, EventDetails[]>((acc, item) => {
        acc.unshift({ ...item, date: new Date() });

        if (acc.length > keep) {
          acc.pop();
        }

        return acc;
      }, []),
    ) }/>
  </LoggerContainer>);
};

const LogItem = ReactiveXComponent()<FC<{ values : EventDetails[] }>>(({ values = [] }) => {
  return (<div className='log-item'>
    { values && values.map((data) => (
      <div key={ data.eventUuid } onMouseDown={ () => console.log(data) } className='event-item'>
        <span>{ dateFormat(data.date) } </span>
        <span>{ data.event.constructor.name }</span>
      </div>
    )) }
  </div>);
});

export default EventLogger;
