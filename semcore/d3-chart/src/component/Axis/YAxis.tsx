import { Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import { Text } from '@semcore/typography';
import * as React from 'react';

import styles from './yAxis.shadow.css';
import type { NSYAxis } from './YAxis.type';
import { scaleOfBandwidth } from '../../utils';
import type { ChartEvents } from '../Chart/AbstractChart/AbstractChart.type';

class YAxisComponent extends Component<NSYAxis.Props, [], {}, {}, NSYAxis.State, NSYAxis.DefaultProps> {
  static defaultProps: NSYAxis.DefaultProps = {
    yAxisPosition: 'left',
  };

  state: NSYAxis.State = {
    dataIndex: -1,
  };

  componentDidMount() {
    this.asProps.eventEmitter.on(`hoverListItem_${this.asProps.uid}`, this.handleMoveEnterData);
    this.asProps.eventEmitter.on('leaveChart', () => this.setState({ dataIndex: -1 }));
  }

  handleMoveEnterData: ChartEvents[`hoverListItem_${string}`] = (index, invertAxis) => {
    if (invertAxis) {
      this.setState({ dataIndex: index });
    }
  };

  get ticks() {
    const { scale, ticksCount } = this.asProps;
    const ticks: Array<string | number | Date> = 'ticks' in scale ? scale.ticks(ticksCount) : scale.domain();

    return ticks.map((tick) => {
      return { value: tick, yTranslate: scaleOfBandwidth(scale, tick) ?? 0 };
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
      transform: `translateY(calc(${hoveredYTranslate}px - 50%))`,
    };

    return sstyled(styles)(
      <SHoveredTick size={100} style={style}>
        {valueFormatter(item[dataKey])}
      </SHoveredTick>,
    );
  }

  render() {
    const SYAxis = Root;
    const STick = Text;

    const { primaryText, valueFormatter, yAxisPosition } = this.asProps;

    return sstyled(styles)(
      <SYAxis render={Box} primaryText={primaryText} position={yAxisPosition} __excludeProps={['data']}>
        {this.ticks.map((tick, index) => {
          const style = {
            transform: `translateY(calc(${tick.yTranslate}px - 50%))`,
          };

          return sstyled(styles)(
            <STick key={`${index}_${tick.value}`} size={100} style={style}>
              {valueFormatter(tick.value)}
            </STick>,
          );
        })}
        {this.renderHoveredTick()}
      </SYAxis>,
    );
  }
}

export const YAxis = createComponent<NSYAxis.Component, typeof YAxisComponent>(YAxisComponent);
