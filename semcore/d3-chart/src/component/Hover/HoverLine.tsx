import { Component, sstyled } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import React from 'react';

import style from './hover.shadow.css';
import type { NSHoverLine } from './HoverLine.type';
import createElement from '../../createElement';
import { scaleOfBandwidth } from '../../utils';
import type { ChartEvents } from '../Chart/AbstractChart/AbstractChart.type';

const STROKE_WIDTH = 1;
const NOTCH_WIDTH = 9;
const NOTCH_DELTA = NOTCH_WIDTH / 2 - STROKE_WIDTH / 4;

class HoverLineComponent extends Component<NSHoverLine.Props, [], NSHoverLine.UncontrolledProps, {}, {}, NSHoverLine.DefaultProps> {
  static displayName = 'HoverLine';
  static style = style;

  static defaultProps = {
    defaultIndex: -1,
  };

  uncontrolledProps(): NSHoverLine.UncontrolledProps {
    return {
      index: -1,
    };
  }

  Element!: React.FC<{ children?: React.ReactNode; render: string }>;

  componentDidMount() {
    const { eventEmitter, uid } = this.asProps;

    eventEmitter.on(`hoverListItem_${uid}`, this.handleHoverListItemEvent);
    eventEmitter.on('leaveChart', this.handleLeaveChartEvent);
  }

  componentWillUnmount(): void {
    const { eventEmitter, uid } = this.asProps;
    eventEmitter.off(`hoverListItem_${uid}`, this.handleHoverListItemEvent);
    eventEmitter.off(`leaveChart`, this.handleLeaveChartEvent);
  }

  handleHoverListItemEvent: ChartEvents[`hoverListItem_${string}`] = (index, invertAxis) => {
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

  render() {
    const SHoverLine = this.Element;
    const { styles, keyX, keyY, scale } = this.asProps;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const xValue = this.getValue(keyX);
    const yValue = this.getValue(keyY);

    const x1 = this.getInitPoint(xScale, xValue);
    const y1 = this.getInitPoint(yScale, yValue);

    return sstyled(styles)(
      <>
        {typeof x1 === 'number'
          ? (
              <>
                <SHoverLine render='g' stroke-width={STROKE_WIDTH} aria-hidden>
                  <line x1={x1 - NOTCH_DELTA} x2={x1 + NOTCH_DELTA} y1={yRange[0]} y2={yRange[0]} />
                  <line x1={x1} y1={yRange[0]} x2={x1} y2={yRange[1]} />
                  <line x1={x1 - NOTCH_DELTA} x2={x1 + NOTCH_DELTA} y1={yRange[1]} y2={yRange[1]} />
                </SHoverLine>
              </>
            )
          : null}
        {typeof y1 === 'number'
          ? (
              <>
                <SHoverLine render='g' stroke-width={STROKE_WIDTH} aria-hidden>
                  <line x1={xRange[0]} y1={y1 - NOTCH_DELTA} x2={xRange[0]} y2={y1 + NOTCH_DELTA} />
                  <line x1={xRange[0]} y1={y1} x2={xRange[1]} y2={y1} />
                  <line x1={xRange[1]} y1={y1 - NOTCH_DELTA} x2={xRange[1]} y2={y1 + NOTCH_DELTA} />
                </SHoverLine>
              </>
            )
          : null}
      </>,
    );
  }
}

export const HoverLine = createElement(HoverLineComponent) as React.FC<NSHoverLine.Props>;
