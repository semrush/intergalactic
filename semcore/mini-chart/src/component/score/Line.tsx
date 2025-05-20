import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';

import style from './line.shadow.css';
import {
  ScoreLineComponent,
  ScoreLineGaugeProps,
  SegmentProps,
  InnerSegmentProps,
} from './Line.types';

class LineRoot extends Component<ScoreLineGaugeProps, {}, {}, typeof LineRoot.enhance> {
  static enhance = [resolveColorEnhance()] as const;
  static displayName = 'ScoreLine';

  static style = style;

  static defaultProps = {
    animate: true,
  };

  getSegmentProps(segmentProps: SegmentProps) {
    const { children, resolveColor } = this.asProps;

    let sum = 0;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<SegmentProps>(child)) {
        sum = sum + child.props.value;
      }
    });

    const width = sum > 0 ? (100 * segmentProps.value) / sum : 0;

    return {
      w: `${width}%`,
      'use:color': resolveColor(segmentProps.color),
    };
  }

  render() {
    const SLineGauge = Root;
    const SLineValue = Box;
    const SAnimationLine = Box;
    const SLineGaugeSegment = Flex;
    const SLineSegmentItem = Box;
    const {
      value,
      styles,
      color = 'chart-palette-order-1',
      baseBgColor,
      resolveColor,
      loading,
      children,
      Children,
      animate,
    } = this.asProps;

    if (children !== undefined) {
      return sstyled(styles)(
        <SLineGauge render={Box} segments base-bg-color={resolveColor(baseBgColor)}>
          <SLineGaugeSegment>
            <Children />
          </SLineGaugeSegment>
          {animate && <SAnimationLine />}
        </SLineGauge>,
      );
    }

    const { segments } = this.asProps;

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
      <SLineGauge render={Box} base-bg-color={resolveColor(baseBgColor)}>
        {!loading && <SLineValue w={percent} color={resolveColor(color)} />}
        {Boolean(SegmentItems.length) && <SLineGaugeSegment>{SegmentItems}</SLineGaugeSegment>}
        {animate && <SAnimationLine />}
      </SLineGauge>,
    );
  }
}

function Segment(props: InnerSegmentProps) {
  const { styles } = props;
  const SLineSegmentItem = Root;

  return sstyled(styles)(<SLineSegmentItem render={Box} />);
}
Segment.displayName = 'Segment';

export const ScoreLine: ScoreLineComponent = createComponent(LineRoot, {
  Segment,
});

ScoreLine.displayName = 'MiniChart.ScoreLine';
