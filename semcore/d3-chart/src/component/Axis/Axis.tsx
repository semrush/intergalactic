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
    this.asProps.eventEmitter.on(`hoverListItem_${this.asProps.uid}`, this.handleHoverListItemEvent);
    this.asProps.eventEmitter.on('leaveChart', this.handleLeaveChartEvent);
  }

  componentWillUnmount(): void {
    const { eventEmitter, uid } = this.asProps;
    eventEmitter.off(`hoverListItem_${uid}`, this.handleHoverListItemEvent);
    eventEmitter.off(`leaveChart`, this.handleLeaveChartEvent);
  }

  handleLeaveChartEvent() {
    this.setState({ dataIndex: -1 });
  }

  get ticks() {
    const { scale, ticksCount } = this.asProps;
    const ticks: Array<string | number | Date> = 'ticks' in scale ? scale.ticks(ticksCount) : scale.domain();

    return ticks.map((tick) => {
      return { value: tick, translate: scaleOfBandwidth(scale, tick) ?? 0 };
    });
  }

  renderHoveredTick() {
    const SHoveredTick = Text;

    const { scale, valueFormatter, data, dataKey, styles } = this.asProps;
    const { dataIndex } = this.state;
    const item = data[dataIndex];

    if (!item || typeof dataKey !== 'string' || dataIndex === -1) {
      return null;
    }

    const value = item?.[dataKey];
    if (!(typeof value === 'number' || typeof value === 'string' || value instanceof Date)) {
      return null;
    }

    let hoveredTranslate: Parameters<this['getCssTranslate']>[0];

    if (dataIndex === 0 && !('bandwidth' in scale)) {
      hoveredTranslate = '0%';
    } else if (dataIndex === data.length - 1 && !('bandwidth' in scale)) {
      hoveredTranslate = `calc(${scaleOfBandwidth(scale, value) ?? 0}px - 100%)`;
    } else {
      hoveredTranslate = scaleOfBandwidth(scale, value) ?? 0;
    }

    const style = {
      transform: this.getCssTranslate(hoveredTranslate),
    };

    return sstyled(styles)(
      <SHoveredTick size={100} style={style} aria-hidden>
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

  renderTicks() {
    const { valueFormatter } = this.asProps;

    return (
      <>
        {this.ticks.map((tick, index) => {
          return (
            <AxisTick
              key={`${index}_${tick.value}`}
              value={tick.value}
              valueFormatter={valueFormatter}
              translate={this.getCssTranslate(tick.translate)}
            />
          );
        })}
        {this.renderHoveredTick()}
      </>
    );
  }
}
