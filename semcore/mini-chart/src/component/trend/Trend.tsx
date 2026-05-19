import type { BoxProps } from '@semcore/base-components';
import type { ValidDefaultProps } from '@semcore/core';
import { Component } from '@semcore/core';
import React from 'react';

export type CommonTrendProps = BoxProps & {
  /**
   * Flag to enable animate of charts
   * @default true
   */
  animate?: boolean;

  /**
   * Flag to enable skeleton
   * @default false
   */
  loading?: boolean;

  /**
   * Data for chart
   */
  data: any[];
};

type CommonTrendState = { width: number; height: number };

export abstract class Trend<
  P extends CommonTrendProps,
  E extends readonly ((...args: any[]) => any)[],
  DP extends ValidDefaultProps<DP, P> = never,
> extends Component<P, E, Readonly<{}>, {}, CommonTrendState, DP> {
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
