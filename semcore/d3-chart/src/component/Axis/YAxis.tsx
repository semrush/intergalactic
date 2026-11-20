import { Box } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import * as React from 'react';

import { AbstractAxisComponent } from './Axis';
import styles from './axis.shadow.css';
import type { NSAxis } from './Axis.type';
import { invert } from '../../utils';

class YAxisComponent extends AbstractAxisComponent {
  static style = styles;

  static defaultProps: NSAxis.DefaultProps = {
    yAxisPosition: 'left',
  };

  override getCssTranslate(translate: number): string {
    return `translateY(calc(${translate}px - 50%))`;
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
