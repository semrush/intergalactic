import { Component, sstyled } from '@semcore/core';
import { Text } from '@semcore/typography';
import { bisector } from 'd3-array';
import * as React from 'react';

import type { NSAxis } from './Axis.type';
import { AxisTick } from './AxisTick';
import { scaleOfBandwidth } from '../../utils';

export abstract class AbstractAxisComponent extends Component<NSAxis.Props, [], never, {}, NSAxis.State, NSAxis.DefaultProps> {
  state: NSAxis.State = {
    dataIndex: -1,
  };

  constructor(props: NSAxis.Props) {
    super(props);

    this.handleHoverListItemEvent = this.handleHoverListItemEvent.bind(this);
    this.handleLeaveChartEvent = this.handleLeaveChartEvent.bind(this);
    this.handleMoveOverAxis = this.handleMoveOverAxis.bind(this);
  }

  abstract getCssTranslate(translate: number | `calc(${string})` | `${string}%`): string;
  abstract handleHoverListItemEvent(index: number, invertAxis: boolean): void;
  abstract handleMoveOverAxis(event: React.MouseEvent<HTMLElement>): void;

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    eventEmitter.on(`hoverListItem`, this.handleHoverListItemEvent);
    eventEmitter.on('leaveChart', this.handleLeaveChartEvent);
  }

  componentWillUnmount(): void {
    const { eventEmitter } = this.asProps;
    eventEmitter.off(`hoverListItem`, this.handleHoverListItemEvent);
    eventEmitter.off(`leaveChart`, this.handleLeaveChartEvent);
  }

  handleLeaveChartEvent() {
    this.setState({ dataIndex: -1 });
  }

  get ticks() {
    const { scale, ticksCount } = this.asProps;
    const ticks: Array<string | number | Date> = 'ticks' in scale ? scale.ticks(ticksCount) : scale.domain();

    return ticks;
  }

  renderHoveredTick() {
    const SHoveredTick = Text;

    const { valueFormatter, data, dataKey, styles, plotWidth, yAxisPosition } = this.asProps;
    const { dataIndex } = this.state;
    const item = data[dataIndex];

    if (!item || typeof dataKey !== 'string' || dataIndex === -1) {
      return null;
    }

    const value = item?.[dataKey];
    if (!(typeof value === 'number' || typeof value === 'string' || value instanceof Date)) {
      return null;
    }
    const tickWidth = plotWidth / this.ticks.length;

    const style = {
      transform: this.getTranslate(value),
    };

    return sstyled(styles)(
      <SHoveredTick
        size={100}
        style={style}
        aria-hidden
        wMax={yAxisPosition === undefined && tickWidth > 0 ? tickWidth : undefined}
        inert=''
      >
        {valueFormatter(item[dataKey])}
      </SHoveredTick>,
    );
  }

  getIndexByValue(value: unknown): number {
    const { data, dataKey, scale } = this.asProps;

    if (typeof dataKey !== 'string' || !Array.isArray(data)) {
      return -1;
    }

    if ('invert' in scale && typeof scale.invert === 'function') { // detect line chart
      const bisect = bisector((d: { [key: string]: number }) => d[dataKey]).center;
      // @ts-expect-error difficult to type it because of history  reasons
      return bisect(data, value);
    } else if ('step' in scale && typeof scale.step !== 'undefined') { // detect bar chart
      const index = data.findIndex((d) => d[dataKey] === value);
      return index;
    }

    return -1;
  }

  get plotWidth() {
    const { plotWidth, scale } = this.asProps;
    const [from, to] = scale.range();

    if (from !== 0 && to !== 0) {
      return Math.abs(to - from);
    }

    return plotWidth;
  }

  getTranslate(value: number | string | Date) {
    const { scale, plotWidth, yAxisPosition } = this.asProps;

    const tickWidth = this.plotWidth / this.ticks.length;
    const calculatedTranslate = scaleOfBandwidth(scale, value) ?? 0;

    let translate: Parameters<this['getCssTranslate']>[0] = calculatedTranslate;

    if (!('bandwidth' in scale) && yAxisPosition === undefined) {
      if (calculatedTranslate < tickWidth / 2) {
        translate = '0%';
      } else if (calculatedTranslate > plotWidth - tickWidth / 2) {
        translate = `calc(${translate}px - 100% + ${(plotWidth - this.plotWidth) / 2}px)`;
      }
    }

    return this.getCssTranslate(translate);
  }

  renderTicks() {
    const { valueFormatter, yAxisPosition, primaryText } = this.asProps;

    const tickWidth = this.plotWidth / (this.ticks.length + 1);

    return (
      <>
        {this.ticks.map((tick, index) => {
          return (
            <AxisTick
              key={`${index}_${tick}`}
              style={{ transform: this.getTranslate(tick) }}
              yAxisPosition={yAxisPosition}
              primaryText={primaryText}
              wMax={yAxisPosition === undefined && tickWidth > 0 ? `${tickWidth}px` : undefined} // set width only for X-axis
            >
              {valueFormatter(tick)}
            </AxisTick>
          );
        })}
        {this.renderHoveredTick()}
      </>
    );
  }
}
