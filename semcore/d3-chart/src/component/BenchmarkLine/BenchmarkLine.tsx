import { Component, sstyled } from '@semcore/core';
import React from 'react';

import type { BenchmarkLineProps } from './BenchmarkLine.type';
import style from './benckmarkLine.shadow.css';
import createElement from '../../createElement';

class BenchmarkLineRoot extends Component<BenchmarkLineProps> {
  static style = style;

  render() {
    // @ts-ignore
    const SLabel = this.Element;
    const SLine = 'line';
    const SRect = 'rect';
    const SText = 'text';
    const SGroup = 'g';

    const {
      styles,
      theme,
      benchmarkValue,
      xScale,
      yScale,
      data,
    } = this.asProps;

    const y = yScale(benchmarkValue);

    return sstyled(styles)(
      <SGroup y={`${y}px`}>
        <SLine
          x1={0}
          x2='100%'
          y1={0}
          y2={0}
          strokeWidth={1}
          strokeDasharray='4 4'
          stroke={theme === 'accent' ? 'red' : 'black'}
        />
        <SLabel render='g'>
          <path
            d='M5 5L0 10L5 15Z'
            fill={theme === 'accent' ? 'red' : 'black'}
            stroke={theme === 'accent' ? 'red' : 'black'}
            strokeWidth='2'
            strokeLinejoin='round'
          />
          <SRect
            x={4}
            y={0}
            width='86'
            height='20'
            rx='6'
            fill={theme === 'accent' ? 'red' : 'black'}
          />
          <SText
            x='45'
            y='10'
            fill='#FFF'

            fontSize='12'
            fontWeight='600'
            textAnchor='middle'
            dominantBaseline='central'
          >
            {benchmarkValue}
          </SText>
        </SLabel>
      </SGroup>,
    );
  }
}

export const BenchmarkLine = createElement(BenchmarkLineRoot);
