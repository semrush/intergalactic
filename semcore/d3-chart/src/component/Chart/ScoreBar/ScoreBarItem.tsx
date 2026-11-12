import { Box } from '@semcore/base-components';
import { Component, createComponent, sstyled } from '@semcore/core';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './scoreBarChart.shadow.css';
import type { ScoreBarItemType, ScoreBarItemTypeProps } from './ScoreBarItem.type';

class ScoreBarItemComponent extends Component<ScoreBarItemTypeProps> {
  static displayName = 'Chart.ScoreBar.Item';

  handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
    const { item, index, onClick } = this.asProps;

    onClick?.({ ...item, index }, event);
  };

  handleMouseMove = trottle((event: React.MouseEvent) => {
    const { eventEmitter, index, uid } = this.asProps;
    const { clientX, clientY } = event;

    eventEmitter.emit(`setTooltipPosition_${uid}`, clientX, clientY);
    eventEmitter.emit(`setTooltipRenderingProps_${uid}`, {}, { index });
    eventEmitter.emit(`setTooltipVisible_${uid}`, index !== null);
  });

  handleMouseLeave = trottle(() => {
    const { uid } = this.asProps;

    this.asProps.eventEmitter.emit(`setTooltipVisible_${uid}`, false);
  });

  render() {
    const { item, mode, totalValue, onClick, valueFormatter, duration, titleFormatter, color } = this.asProps;
    const SItem = Box;
    const SCategory = Text;
    const SPercent = Text;
    const SValue = Text;
    const SValueLink = Link;
    const SBar = Box;
    const SBarValue = Box;
    const SBarBackground = Box;

    const percent = parseInt((100 * (item.value / totalValue)).toFixed(0));
    const bg = 100 - percent;
    const displayValue = valueFormatter(item.value);
    const displayCategory = titleFormatter ? titleFormatter(item.category) : item.category;

    return sstyled(style)(
      <SItem
        tag='li'
        // @ts-expect-error custom css variables
        style={{ '--global-target-width': percent }}
        mode={mode}
        clickable={Boolean(onClick)}
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <SCategory>
          {displayCategory}
        </SCategory>
        <SPercent use='secondary'>
          {percent}%
        </SPercent>
        {item.href
          ? (
              <SValueLink href={item.href} onClick={(e) => e.stopPropagation()}>{displayValue}</SValueLink>
            )
          : (
              <SValue>
                {displayValue}
              </SValue>
            )}
        {/* @ts-expect-error mode is for css only */}
        <SBar mode={mode} aria-hidden='true' duration={duration}>
          <SBarValue color={color} />
          <SBarBackground style={{ width: `${bg}%` }} />
        </SBar>
      </SItem>,
    );
  }
}

export const ScoreBarItem = createComponent<
  ScoreBarItemType,
  typeof ScoreBarItemComponent
>(ScoreBarItemComponent);
