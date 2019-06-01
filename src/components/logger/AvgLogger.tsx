import * as React from 'react';
import { FC } from 'react';
import { ReactiveXComponent } from 'reactive-x-component';
import { Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import LoggerContainer from './LoggerContainer';

interface LoggerProps {
  nb$ : {
    [key : string] : Observable<number>;
  };
  avgMax : number;
  round? : number;
}

const Nb = ReactiveXComponent()<FC<{ nb : number }>>(({ nb }) => (<span>{ nb }</span>));

const AvgLogger : FC<LoggerProps> = ({ nb$, avgMax, round = 0 }) => {
  return (<LoggerContainer className='avg-logger'>
    { Object.keys(nb$).map(key => (
      <div key={ key }>{ key }: <Nb nb={ nb$[key].pipe(
        scan(({ count, avg }, cur) => {
          const useCount = Math.min(avgMax - 1, count);
          const sum      = useCount * avg + cur;
          const newCount = useCount + 1;
          const newAvg   = sum / newCount;

          return {
            count: newCount,
            avg: newAvg,
          };
        }, { count: 0, avg: 0 }),
        map(({ avg }) => avg),
        map(avg => Math.round(Math.pow(10, round) * avg) / Math.pow(10, round)),
      ) }/></div>
    )) }
  </LoggerContainer>);
};

export default AvgLogger;
