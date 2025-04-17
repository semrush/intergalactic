import React from 'react';
import { PatternFill, PatternSymbol, getPatternSymbolSize } from '@semcore/d3-chart';

const Demo = () => {
  const patterns = 'zigzag';
  const patternKey = 'my-pattern';
  const patternSymbolSize = getPatternSymbolSize({ patternKey, patterns });

  return (
    <svg height='100px' width='200px' aria-label='PatternFill and PatternSymbol' role='img'>
      <PatternFill id='pattern-element' patternKey={patternKey} color='red' patterns={patterns} />
      <rect width='100px' height='100px' x='0' y='0' fill='url(#pattern-element)' stroke='red' />
      <PatternSymbol
        role='none'
        color='red'
        patternKey={patternKey}
        patterns={patterns}
        x={150 - patternSymbolSize[0] / 2}
        y={50 - patternSymbolSize[1] / 2}
      />
    </svg>
  );
};

export default Demo;
