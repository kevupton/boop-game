import * as React from 'react';
import { FC } from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import { map } from 'rxjs/operators';
import gameEngine from '../../game';
import '../object-logger/ObjectLogger.css';

interface LoggerProps {
  channel : string;
  take : number;
}

const ObjectLogger : FC<LoggerProps> = ({ channel, take }) => {
  const history : any[] = [];

  return (<div>
    <LogItem values={ gameEngine.logger.on$(channel).pipe(
      map(item => {
        history.push(item);

        if (history.length > take) {
          history.shift();
        }

        return history;
      }),
    ) }/>
  </div>);
};

const LogItem = ReactiveXComponent({}, { values: [] })<FC<{ values : any[] }>>(({ values }) => {
  return (<div className='log-item'>
    { values && values.map((value, index) => (<div key={index}>
      { JSON.stringify(value, undefined, 4) }
    </div>)) }
  </div>);
});

export default ObjectLogger;
