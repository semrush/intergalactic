import React from 'react';
import createComponent, { Component, Root, sstyled, ComponentType } from '@semcore/core';
import { Box, Flex, BoxProps } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';
import { CommonScoreProps } from './Score';

import style from './line.shadow.css';

export type ScoreLineGaugeProps = BoxProps &
  CommonScoreProps & {
    /**
     * Count of line segments
     */
    segments?: number;
  };

type Enhances = {
  resolveColor: ReturnType<typeof resolveColorEnhance>;
};

class LineRoot extends Component<ScoreLineGaugeProps, {}, {}, Enhances> {
  static enhance = [resolveColorEnhance()];

  static style = style;

  static defaultProps = {
    animate: true,
  };

  render() {
    const SLineGauge = Root;
    const SLineValue = Box;
    const SLineGaugeSegment = Flex;
    const SLineSegmentItem = Box;
    const {
      value,
      styles,
      color = 'chart-palette-order-1',
      resolveColor,
      segments,
      loading,
    } = this.asProps;

    const SegmentItems = [];

    if (segments) {
      for (let i = 0; i < segments; i++) {
        const width = `calc((100% - ${segments - 1}px) / ${segments})`;

        SegmentItems.push(
          sstyled(styles)(
            <SLineSegmentItem
              key={i}
              color={i < value ? resolveColor(color) : undefined}
              w={width}
            />,
          ),
        );
      }
    }

    let percent = `${value}%`;

    if (segments) {
      percent = `${(value / segments) * 100}%`;
    }

    return sstyled(styles)(
      <SLineGauge render={Box}>
        {!loading && <SLineValue w={percent} color={resolveColor(color)} />}
        {Boolean(SegmentItems.length) && <SLineGaugeSegment>{SegmentItems}</SLineGaugeSegment>}
      </SLineGauge>,
    );
  }
}

export const ScoreLine: ComponentType<ScoreLineGaugeProps, {}, {}, Enhances> =
  createComponent(LineRoot);

ScoreLine.displayName = 'MiniChart.ScoreLine';
