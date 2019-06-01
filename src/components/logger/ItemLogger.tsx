import * as React from 'react';
import { FC } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { obsidian as styleColor } from 'react-syntax-highlighter/dist/styles/hljs';
import { ReactiveXComponent } from 'reactive-x-component';
import LoggerContainer from './LoggerContainer';

interface LoggerProps {
  item : any;
}

styleColor.hljs.background = 'rgba(0,0,0,0.5)';
styleColor.hljs.margin = '-5px';

const ItemLogger : FC<LoggerProps> = ({ item = {} }) => {
  return (<LoggerContainer maxHeight='none'>
    <SyntaxHighlighter language='javascript' style={ {
      ...styleColor,
      background: 'transparent',
    }}>
      { JSON.stringify(item, undefined, 4) }
    </SyntaxHighlighter>
  </LoggerContainer>);
};

export default ReactiveXComponent()(ItemLogger);
