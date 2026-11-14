import { Box } from '@semcore/base-components';
import { Component, createComponent, sstyled } from '@semcore/core';
import trottle from '@semcore/core/lib/utils/rafTrottle';
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

  percentFormatter(value: number) {
    if (value < 0 || value > 100) {
      return `${value}%`;
    }

    return new Intl.NumberFormat(this.asProps.locale, { style: 'percent' }).format(value / 100);
  };

  renderContent() {
    const { item, mode, totalValue, valueFormatter, duration, titleFormatter, color } = this.asProps;

    const SCategory = Text;
    const SPercent = Text;
    const SValue = Text;
    const SBar = Box;
    const SBarValue = Box;
    const SBarBackground = Box;

    const percent = parseInt((100 * (item.value / totalValue)).toFixed(0));
    const bg = 100 - percent;
    const displayValue = valueFormatter(item.value);
    const displayCategory = titleFormatter ? titleFormatter(item.category) : item.category;
    const displayPercent = this.percentFormatter(percent);

    return sstyled(style)(
      <>
        <SCategory>
          {displayCategory}
        </SCategory>
        <SPercent use='secondary'>
          {displayPercent}
        </SPercent>
        <SValue>
          {displayValue}
        </SValue>
        {/* @ts-expect-error mode is for css only */}
        <SBar mode={mode} aria-hidden='true' duration={duration}>
          <SBarValue color={color} />
          <SBarBackground style={{ width: `${bg}%` }} />
        </SBar>
      </>,
    );
  }

  render() {
    const { item, mode, totalValue, onClick } = this.asProps;
    const SItem = Box;
    const SContainer = Box;

    const percent = parseInt((100 * (item.value / totalValue)).toFixed(0));

    return sstyled(style)(
      <SItem
        tag='li'
        // @ts-expect-error custom css variables
        style={{ '--global-target-width': percent }}
      >
        <SContainer
          tag={item.href ? 'a' : (onClick ? 'button' : undefined)}
          onClick={this.handleClick}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          tabIndex={(Boolean(onClick) || Boolean(item.href)) ? 0 : undefined}
          // @ts-expect-error css only
          mode={mode}
          href={item.href}
        >
          {this.renderContent()}
        </SContainer>
      </SItem>,
    );
  }
}

export const ScoreBarItem = createComponent<
  ScoreBarItemType,
  typeof ScoreBarItemComponent
>(ScoreBarItemComponent);
