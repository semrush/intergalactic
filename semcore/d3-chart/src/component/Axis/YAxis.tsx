import { Box } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import * as React from 'react';

import { AbstractAxisComponent } from './Axis';
import styles from './axis.shadow.css';
import type { NSAxis } from './Axis.type';
import { invert } from '../../utils';

class YAxisComponent extends AbstractAxisComponent {
  static displayName = 'Axis';
  static style = styles;

  static defaultProps: NSAxis.DefaultProps = {
    yAxisPosition: 'left',
  };

  override getCssTranslate(translate: number): string {
    if (typeof translate === 'number') {
      return `translateY(calc(${translate}px - 50%))`;
    }

    return `translateX(${translate})`;
  };

  override handleHoverListItemEvent(index: number, invertAxis: boolean) {
    if (invertAxis) {
      this.setState({ dataIndex: index });
    }
  };

  override handleMoveOverAxis(event: React.MouseEvent<HTMLElement>) {
    const target = event.currentTarget;

    if (!(target instanceof Element)) {
      return;
    }

    const { eventEmitter, scale, plotWidth, yAxisPosition } = this.asProps;

    const rect = target.getBoundingClientRect();
    const point = event.clientY - rect.top;
    const value = invert(scale, point);
    const index = this.getIndexByValue(value);

    const xPoint = yAxisPosition === 'right' ? rect.left - plotWidth / 2 : rect.right + plotWidth / 2;

    eventEmitter.emit(`setTooltipVisible`, true);
    eventEmitter.emit(`hoverPosition`, xPoint, point + rect.top);
    eventEmitter.emit(`hoverListItem`, index, true);
  };

  render() {
    const SYAxis = Root;

    return sstyled(styles)(
      <SYAxis render={Box} onMouseMove={this.handleMoveOverAxis} __excludeProps={['data', 'scale']}>
        {this.renderTicks()}
      </SYAxis>,
    );
  }
}

export const YAxis = createComponent<NSAxis.Component, typeof YAxisComponent>(YAxisComponent);
