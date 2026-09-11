import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import style from '../../styles/line.shadow.css';
import type { NSMiniChart } from '../../types';

class LineRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSMiniChart.Score.Line.Component>,
  typeof LineRoot.enhance,
  {},
  {},
  {},
  NSMiniChart.Score.Line.DefaultProps
> {
  static enhance = [resolveColorEnhance()] as const;
  static displayName = 'ScoreLine';

  static style = style;

  static defaultProps = {
    animate: true,
  } as const;

  getSegmentProps(segmentProps: NSMiniChart.Score.Line.Segment.Props) {
    const { children, resolveColor } = this.asProps;

    let sum = 0;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<NSMiniChart.Score.Line.Segment.Props>(child)) {
        sum = sum + child.props.value;
      }
    });

    const width = sum > 0 ? (100 * segmentProps.value) / sum : 0;

    return {
      'w': `${width}%`,
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

    if (value === undefined) return null;

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

function Segment(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSMiniChart.Score.Line.Segment.Component, typeof LineRoot, 'Segment'>,
) {
  const { styles } = props;
  const SLineSegmentItem = Root;

  return sstyled(styles)(<SLineSegmentItem render={Box} />);
}

/**
 * MiniCharts.ScoreLine
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-api|API} | {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-code|Examples}
 */
export const ScoreLine = createComponent<
  NSMiniChart.Score.Line.Component,
  typeof LineRoot
>(LineRoot, { Segment });

// Since the Intergalactic.Component was unfolded to plain component structure.
// @ts-ignore
ScoreLine.displayName = 'MiniChart.ScoreLine';
