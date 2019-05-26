import * as React from 'react';
import { CSSProperties, FC } from 'react';
import './Logger.css';

interface LoggerContainerStyles {
  style? : CSSProperties
}

const LoggerContainer : FC<LoggerContainerStyles> = ({ children, style }) => {
  return (<div className='logger-container' style={ style || {} }>
    { children }
  </div>);
};

export default LoggerContainer;

