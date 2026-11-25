import { Box } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import * as React from 'react';

import { AbstractAxisComponent } from './Axis';
import styles from './axis.shadow.css';
import type { NSAxis } from './Axis.type';
import { invert } from '../../utils';

class XAxisComponent extends AbstractAxisComponent {
  static displayName = 'Axis';
  static style = styles;

  override getCssTranslate(translate: number | `calc(${string})` | `${string}%`): string {
    if (typeof translate === 'number') {
      return `translateX(calc(${translate}px - 50%))`;
    }

    return `translateX(${translate})`;
  };

  override handleHoverListItemEvent(index: number, invertAxis: boolean) {
    if (!invertAxis) {
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
    const SXAxis = Root;

    return sstyled(styles)(
      <SXAxis render={Box} onMouseMove={this.handleMoveOverAxis} __excludeProps={['data', 'scale']}>
        {this.renderTicks()}
      </SXAxis>,
    );
  }
}

export const XAxis = createComponent<NSAxis.Component, typeof XAxisComponent>(XAxisComponent);
