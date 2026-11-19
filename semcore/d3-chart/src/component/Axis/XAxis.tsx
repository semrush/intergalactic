import { Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import { Text } from '@semcore/typography';
import * as React from 'react';

import styles from './xAxis.shadow.css';
import type { NSXAxis } from './XAxis.type';
import { scaleOfBandwidth } from '../../utils';
import type { ChartEvents } from '../Chart/AbstractChart/AbstractChart.type';

class XAxisComponent extends Component<NSXAxis.Props, [], {}, {}, NSXAxis.State> {
  state: NSXAxis.State = {
    dataIndex: -1,
  };

  componentDidMount() {
    this.asProps.eventEmitter.on(`hoverListItem_${this.asProps.uid}`, this.handleMoveEnterData);
    this.asProps.eventEmitter.on('leaveChart', () => this.setState({ dataIndex: -1 }));
  }

  handleMoveEnterData: ChartEvents[`hoverListItem_${string}`] = (index, invertAxis) => {
    if (!invertAxis) {
      this.setState({ dataIndex: index });
    }
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

    if (!item || dataIndex === -1) {
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

  render() {
    const SXAxis = Root;
    const STick = Text;

    const { valueFormatter } = this.asProps;

    return sstyled(styles)(
      <SXAxis render={Box} __excludeProps={['data']}>
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
