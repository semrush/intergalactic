import { Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import { Text } from '@semcore/typography';
import * as React from 'react';

import styles from './yAxis.shadow.css';
import type { NSYAxis } from './YAxis.type';
import { scaleOfBandwidth } from '../../utils';

class YAxisComponent extends Component<NSYAxis.Props, [], {}, {}, NSYAxis.State, NSYAxis.DefaultProps> {
  static defaultProps: NSYAxis.DefaultProps = {
    yAxisPosition: 'left',
  };

  state: NSYAxis.State = {
    hoveredValue: null,
    yTranslate: 0,
  };

  get ticks() {
    const { scale, ticksCount } = this.asProps;
    const ticks: Array<string | number | Date> = 'ticks' in scale ? scale.ticks(ticksCount) : scale.domain();

    return ticks.map((tick) => {
      return { value: tick, yTranslate: scaleOfBandwidth(scale, tick) ?? 0 };
    });
  }

  render() {
    const SYAxis = Root;
    const STick = Text;
    const SHoveredTick = Text;
    const { primaryText, valueFormatter, yAxisPosition, hideTickHover } = this.asProps;
    const { hoveredValue, yTranslate } = this.state;

    return sstyled(styles)(
      <SYAxis render={Box} primaryText={primaryText} position={yAxisPosition}>
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
        {!hideTickHover && hoveredValue && (
          <SHoveredTick style={{ transform: `translateY(calc(${yTranslate}px - 50%))` }}>
            {valueFormatter(hoveredValue)}
          </SHoveredTick>
        )}
      </SYAxis>,
    );
  }
}

export const YAxis = createComponent<NSYAxis.Component, typeof YAxisComponent>(YAxisComponent);
