import * as React from 'react';
import { FC } from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import { merge } from 'rxjs/internal/observable/merge';
import { map, scan } from 'rxjs/operators';
import LoggerContainer from './LoggerContainer';
import gameEngine from '../../game';
const logger = gameEngine.logger;

interface LogType {
  message : string;
  type : 'info' | 'error' | 'warning' | 'debug'
  id : number;
}

interface BasicLoggerProps {
  log : LogType[];
}

const BasicLogger : FC<BasicLoggerProps> = ({ log }) => (<LoggerContainer>
  { log.map(({ type, message, id }) => (
    <div key={id} className={type}>[{ type.toUpperCase }] { message }</div>
  )) }
</LoggerContainer>);


let id = 0;
const toType = (type : LogType['type']) => map<string, LogType>((message) => ({
  type, message, id: ++id,
}));


export default ReactiveXComponent({
  log: merge(
    logger.info$.pipe(toType('info')),
    logger.warning$.pipe(toType('warning')),
    logger.error$.pipe(toType('error')),
    logger.debug$.pipe(toType('debug')),
  ).pipe(
    scan<LogType, LogType[]>(((acc, value) => {
      acc.push(value);
      if (acc.length > 1000) {
        acc.shift();
      }
      return acc;
    }), []),
  ),
})(BasicLogger);
