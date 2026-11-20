import { Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import rafTrottle from '@semcore/core/lib/utils/rafTrottle';
import { Text } from '@semcore/typography';
import { bisector } from 'd3-array';
import * as React from 'react';

import styles from './xAxis.shadow.css';
import type { NSXAxis } from './XAxis.type';
import { invert, scaleOfBandwidth } from '../../utils';
import type { ChartEvents } from '../Chart/AbstractChart/AbstractChart.type';

class XAxisComponent extends Component<NSXAxis.Props, [], {}, {}, NSXAxis.State> {
  state: NSXAxis.State = {
    dataIndex: -1,
  };

  componentDidMount() {
    this.asProps.eventEmitter.on(`hoverListItem_${this.asProps.uid}`, this.handleHoverListItemEvent);
    this.asProps.eventEmitter.on('leaveChart', this.handleLeaveChartEvent);
  }

  componentWillUnmount(): void {
    const { eventEmitter, uid } = this.asProps;
    eventEmitter.off(`hoverListItem_${uid}`, this.handleHoverListItemEvent);
    eventEmitter.off(`leaveChart`, this.handleLeaveChartEvent);
  }

  handleHoverListItemEvent: ChartEvents[`hoverListItem_${string}`] = (index, invertAxis) => {
    if (!invertAxis) {
      this.setState({ dataIndex: index });
    }
  };

  handleLeaveChartEvent: ChartEvents['leaveChart'] = () => {
    this.setState({ dataIndex: -1 });
  };

  handleMoveOverAxis = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;

    if (!(target instanceof Element)) {
      return;
    }

    const { eventEmitter, uid, scale, plotBoundaryRect } = this.asProps;

    const rect = target.getBoundingClientRect();
    const xPoint = event.clientX - rect.left;
    const value = invert(scale, xPoint);
    const index = this.getIndexByValue(value);

    const yPoint = plotBoundaryRect.top + plotBoundaryRect.height / 2;

    eventEmitter.emit(`setTooltipVisible_${uid}`, true);
    eventEmitter.emit(`hoverPosition_${uid}`, xPoint + rect.left, yPoint);
    eventEmitter.emit(`hoverListItem_${uid}`, index, false);
  };

  get ticks() {
    const { scale, ticksCount } = this.asProps;
    const ticks: Array<string | number | Date> = 'ticks' in scale ? scale.ticks(ticksCount) : scale.domain();

    return ticks.map((tick) => {
      return { value: tick, translate: scaleOfBandwidth(scale, tick) ?? 0 };
    });
  }

  renderHoveredTick() {
    const SHoveredTick = Text;

    const { scale, valueFormatter, data, dataKey } = this.asProps;
    const { dataIndex } = this.state;

    const item = data[dataIndex];

    if (!item || typeof dataKey !== 'string' || dataIndex === -1) {
      return null;
    }

    const hoveredYTranslate = scaleOfBandwidth(scale, item?.[dataKey]) ?? 0;
    const style = {
      transform: `translateX(calc(${hoveredYTranslate}px - 50%))`,
    };

    return sstyled(styles)(
      <SHoveredTick size={100} style={style}>
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
      return bisect(data, value);
    } else if ('step' in scale && typeof scale.step !== 'undefined') { // detect bar chart
      const index = data.findIndex((d) => d[dataKey] === value);
      return index;
    }

    return -1;
  }

  render() {
    const SXAxis = Root;
    const STick = Text;

    const { valueFormatter } = this.asProps;

    return sstyled(styles)(
      <SXAxis render={Box} __excludeProps={['data']} onMouseMove={this.handleMoveOverAxis}>
        {this.ticks.map((tick, index) => {
          const style = {
            transform: `translateX(calc(${tick.translate}px - 50%))`,
          };

          return sstyled(styles)(
            <STick key={`${index}_${tick.value}`} size={100} style={style}>
              {valueFormatter(tick.value)}
            </STick>,
          );
        })}
        {this.renderHoveredTick()}
      </SXAxis>,
    );
  }
}

export const XAxis = createComponent<NSXAxis.Component, typeof XAxisComponent>(XAxisComponent);
