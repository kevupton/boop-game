import * as React from 'react';
import { FC } from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import { merge } from 'rxjs/internal/observable/merge';
import { map, scan } from 'rxjs/operators';
import { dateFormat } from '../../util/date-format';
import LoggerContainer from './LoggerContainer';
import gameEngine from '../../game';
const logger = gameEngine.logger;

interface LogType {
  message : string;
  type : 'info' | 'error' | 'warning' | 'debug'
  id : number;
  date : Date;
}

interface BasicLoggerProps {
  log : LogType[];
}

const BasicLogger : FC<BasicLoggerProps> = ({ log }) => (<LoggerContainer className='basic-logger'>
  { log.map(({ type, message, id, date }) => (
    <div key={id} className={type + ' basic-log-item'}
         onClick={() => console.log({ type, message, id, date, })}>
      <span>{ dateFormat(date) } </span>
      <span>[{ type.toUpperCase() }] </span>
      { message }
    </div>
  )) }
</LoggerContainer>);


let id = 0;
const toType = (type : LogType['type']) => map<string, LogType>((message) => ({
  type, message, id: ++id, date: new Date(),
}));


export default ReactiveXComponent({
  log: merge(
    logger.info$.pipe(toType('info')),
    logger.warning$.pipe(toType('warning')),
    logger.error$.pipe(toType('error')),
    logger.debug$.pipe(toType('debug')),
  ).pipe(
    scan<LogType, LogType[]>(((acc, value) => {
      acc.unshift(value);
      if (acc.length > 1000) {
        acc.pop();
      }
      return acc;
    }), []),
  ),
}, { log: [] })(BasicLogger);
