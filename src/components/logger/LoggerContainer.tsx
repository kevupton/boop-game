import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, FC } from 'react';
import './Logger.scss';

interface LoggerContainerStyles {
  style? : CSSProperties,
  className? : string,
  maxHeight? : string,
}

const LoggerContainer : FC<LoggerContainerStyles> = ({ children, style = {}, className, maxHeight }) => {
  return (<div className={ classNames('logger-container', className) } style={ {
    ...style,
    maxHeight,
  } }>
    { children }
  </div>);
};

export default LoggerContainer;

