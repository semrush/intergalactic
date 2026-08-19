import type { Intergalactic } from '@semcore/core';
import { Component } from '@semcore/core';
import React from 'react';

import type { NSMiniChart } from '../../types';

export abstract class Trend<
  P extends Record<string, any>,
  E extends readonly ((...args: any[]) => any)[],
  DP extends Intergalactic.InternalTypings.ValidDefaultProps<DP, P> = never,
> extends Component<P, E, Readonly<{}>, {}, NSMiniChart.Trend.CommonState, DP> {
  state = {
    width: 200,
    height: 100,
  };

  containerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setSizes();
  }

  componentDidUpdate(prevProps: P) {
    if (
      prevProps.w !== this.props.w ||
      prevProps.h !== this.props.h ||
      prevProps.data !== this.props.data
    ) {
      this.setSizes();
    }
  }

  get defaultWidth(): number {
    const { width, height } = this.state;

    return (width / height) * this.defaultHeight;
  }

  get defaultHeight(): number {
    return 100;
  }

  get svgWidth(): number {
    return this.defaultWidth;
  }

  get svgHeight(): number {
    return this.defaultHeight;
  }

  setSizes() {
    if (this.containerRef.current) {
      const boundingClientRect = this.containerRef.current.getBoundingClientRect();

      const { width, height } = boundingClientRect;

      if (width > 0 && height > 0) {
        this.setState({ width, height });
      }
    }
  }
}
