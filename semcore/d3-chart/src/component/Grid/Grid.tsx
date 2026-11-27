import { Component, sstyled } from '@semcore/core';
import React from 'react';

import style from './grid.shadow.css';
import type { NSGrid } from './Grid.type';
import createElement from '../../createElement';
import { scaleOfBandwidth } from '../../utils';

class GridComponent extends Component<NSGrid.Props> {
  static displayName = 'Grid';
  static style = style;

  Element!: React.FC<{ children?: React.ReactNode; render: string }>;

  get ticks() {
    const { scale: [xScale, yScale], ticksCount, orientation } = this.asProps;
    const scale = orientation === 'vertical' ? xScale : yScale;
    const ticks: Array<string | number | Date> = 'ticks' in scale ? scale.ticks(ticksCount) : scale.domain();

    return ticks;
  }

  getVerticalPosition(value: string | number | Date) {
    const [xScale, yScale] = this.asProps.scale;
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x1: x,
      y1: yRange[0],
      x2: x,
      y2: yRange[1],
    };
  }

  getHorizontalPosition(value: string | number | Date) {
    const [xScale, yScale] = this.asProps.scale;
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x1: xRange[0],
      y1: y,
      x2: xRange[1],
      y2: y,
    };
  }

  render() {
    const SGrid = this.Element;

    const { styles, scale, orientation, dataHintsHandler } = this.asProps;
    const ticks = this.ticks;

    if (ticks.length >= 2) {
      dataHintsHandler.setupGrid(orientation, Math.abs(Number(ticks[1]) - Number(ticks[0])));
    }

    return ticks.map((value, i) => {
      const linePosition = orientation === 'vertical' ? this.getVerticalPosition(value) : this.getHorizontalPosition(value);

      return sstyled(styles)(<SGrid key={i} render='line' {...linePosition} />);
    });
  }
}

export const Grid = createElement(GridComponent) as React.FC<NSGrid.Props>;
