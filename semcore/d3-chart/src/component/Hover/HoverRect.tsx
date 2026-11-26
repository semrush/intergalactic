import { Component, sstyled } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import React from 'react';

import style from './hover.shadow.css';
import type { NSHoverRect } from './HoverRect.type';
import createElement from '../../createElement';
import { getHorizontalPathFromRect, getVerticalPathFromRect, scaleOfBandwidth, scaleToBand } from '../../utils';
import type { ChartEvents } from '../Chart/AbstractChart/AbstractChart.type';

class HoverRectComponent extends Component<NSHoverRect.Props, [], NSHoverRect.UncontrolledProps, {}, {}, NSHoverRect.DefaultProps> {
  static displayName = 'HoverRect';
  static style = style;

  static defaultProps = {
    defaultIndex: -1,
  };

  uncontrolledProps(): NSHoverRect.UncontrolledProps {
    return {
      index: -1,
    };
  }

  Element!: React.FC<{ children?: React.ReactNode; render: string }>;

  componentDidMount() {
    const { eventEmitter } = this.asProps;

    eventEmitter.on('hoverListItem', this.handleHoverListItemEvent);
    eventEmitter.on('leaveChart', this.handleLeaveChartEvent);
  }

  componentWillUnmount(): void {
    const { eventEmitter } = this.asProps;
    eventEmitter.off(`hoverListItem`, this.handleHoverListItemEvent);
    eventEmitter.off(`leaveChart`, this.handleLeaveChartEvent);
  }

  handleHoverListItemEvent: ChartEvents[`hoverListItem`] = (index, invertAxis) => {
    this.handlers.index(index);
  };

  handleLeaveChartEvent: ChartEvents['leaveChart'] = () => {
    this.handlers.index(-1);
  };

  getValue(key: undefined | string | symbol) {
    const { data, index } = this.asProps;
    if (typeof key === 'string' && index > -1) {
      const value = index !== null ? data[index]?.[key] : undefined;

      return value;
    }

    return undefined;
  }

  getInitPoint(scale: ScaleBand<any> | ScaleTime<any, any> | ScaleLinear<any, any>, value: ReturnType<typeof this.getValue>) {
    if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
      const initPoint = value !== undefined ? scaleOfBandwidth(scale, value) : undefined;

      return initPoint;
    }

    return undefined;
  }

  getRectPath() {
    const { index, data, scale, keyX, keyY } = this.asProps;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const xBand = scaleToBand(xScale);
    const yBand = scaleToBand(yScale);

    const xStep = xBand.step();
    const xPaddingInner = xBand.paddingInner();
    const yStep = yBand.step();
    const yPaddingInner = yBand.paddingInner();

    const xValue = keyX !== undefined ? data[index]?.[keyX] : undefined;
    const yValue = keyY !== undefined ? data[index]?.[keyY] : undefined;

    if (typeof xValue === 'number' || xValue instanceof Date) {
      return getVerticalPathFromRect({
        x: xScale(xValue) - (xStep * xPaddingInner) / 2,
        y: yRange[1],
        width: xStep - xPaddingInner / 2,
        height: yRange[0] - yRange[1],
      });
    }

    if (typeof xValue === 'string' && 'bandwidth' in xScale) {
      const xScaled = xScale(xValue);
      if (xScaled === undefined) {
        return '';
      }

      return getVerticalPathFromRect({
        x: xScaled - (xStep * xPaddingInner) / 2,
        y: yRange[1],
        width: xStep - xPaddingInner / 2,
        height: yRange[0] - yRange[1],
      });
    }

    if (typeof yValue === 'number' || yValue instanceof Date) {
      return getHorizontalPathFromRect({
        x: xRange[0],
        y: yScale(yValue) - (yStep * yPaddingInner) / 2,
        width: xRange[1] - xRange[0],
        height: yStep - yPaddingInner / 2,
      });
    }

    if (typeof yValue === 'string' && 'bandwidth' in yScale) {
      const yScaled = yScale(yValue);
      if (yScaled === undefined) {
        return '';
      }

      return getHorizontalPathFromRect({
        x: xRange[0],
        y: yScaled - (yStep * yPaddingInner) / 2,
        width: xRange[1] - xRange[0],
        height: yStep - yPaddingInner / 2,
      });
    }

    return '';
  }

  render() {
    const SHoverRect = this.Element;
    const { styles } = this.asProps;

    const path = this.getRectPath();

    if (!path) {
      return null;
    }

    return sstyled(styles)(
      <SHoverRect
        aria-hidden
        render='path'
        // @ts-expect-error error in types for chart elements
        d={path}
      />,
    );
  }
}

export const HoverRect = createElement(HoverRectComponent) as React.FC<NSHoverRect.Props>;
