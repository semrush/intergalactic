import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import React from 'react';

import style from '../../styles/line.shadow.css';
import type { NSMiniChart } from '../../types';

const STRIPE_WIDTH = 2;
const STRIPE_PERIOD = 4;
const STRIPE_ANGLE = 60;
const JUNCTION_GAP = 2;
const CORNER_RADIUS = 2;

class LineRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSMiniChart.Score.Line.Component>,
  typeof LineRoot.enhance,
  {},
  {},
  {},
  NSMiniChart.Score.Line.DefaultProps
> {
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-extra-slow',
      fallback: '500',
      map: (v: string) => Number.parseInt(v, 10).toString(),
      prop: 'duration',
    }),
    resolveColorEnhance(),
    uniqueIDEnhancement(),
  ] as const;

  static displayName = 'ScoreLine';

  static style = style;

  static defaultProps = {
    animate: true,
  } as const;

  getSegmentProps(segmentProps: NSMiniChart.Score.Line.Segment.Props) {
    const { resolveColor } = this.asProps;

    return {
      'segment-color': resolveColor(segmentProps.color),
    };
  }

  render() {
    const SLineGauge = Root;
    const SScoreSegments = Flex;
    const SScoreSegment = Box;
    const {
      value,
      styles,
      color = 'chart-palette-order-1',
      baseBgColor = 'chart-grid-bar-chart-base-bg',
      resolveColor,
      loading,
      children,
      Children,
      animate,
      duration,
      uid,
    } = this.asProps;

    if (value === undefined) return null;

    if (loading) {
      return sstyled(styles)(
        <SLineGauge render={Box}>
          <svg width='100%' height='100%' fill='none' role='img' display='block'>
            <rect width='100%' height='100%' rx={CORNER_RADIUS} fill={resolveColor('skeleton-bg')} />
          </svg>
        </SLineGauge>,
      );
    }

    if (children !== undefined) {
      return sstyled(styles)(
        <SLineGauge render={Box}>
          <SScoreSegments
            // @ts-ignore
            animate={animate && !loading}
          >
            <Children />
          </SScoreSegments>
        </SLineGauge>,
      );
    }

    const { segments } = this.asProps;

    if (segments) {
      const segmentColor = resolveColor(color);
      const segmentBaseColor = resolveColor(baseBgColor);

      return sstyled(styles)(
        <SLineGauge render={Box}>
          <SScoreSegments
            // @ts-ignore
            animate={animate && !loading}
          >
            {Array(segments).fill(null).map((_, i) =>
              sstyled(styles)(
                <SScoreSegment
                  key={i}
                  segment-color={i < value ? segmentColor : segmentBaseColor}
                />,
              ))}
          </SScoreSegments>
        </SLineGauge>,
      );
    }

    const normalizedValue = Math.max(Math.min(value, 100), 0);
    const valueWidth = `${normalizedValue}%`;
    const hasValue = normalizedValue > 0;
    const hasBase = normalizedValue < 100;
    const basePatternId = `${uid}-base-pattern`;
    const baseMaskId = `${uid}-base-mask`;

    return sstyled(styles)(
      <SLineGauge render={Box}>
        <svg width='100%' height='100%' fill='none' role='img' display='block'>
          <defs>
            {hasValue && (
              <mask id={baseMaskId} maskUnits='userSpaceOnUse' x={0} y={0} width='100%' height='100%'>
                <rect width='100%' height='100%' fill='white' />
                <rect
                  width={valueWidth}
                  height='100%'
                  rx={CORNER_RADIUS}
                  fill='black'
                  stroke='black'
                  strokeWidth={JUNCTION_GAP * 2}
                  strokeLinejoin='round'
                >
                  {animate && (
                    <animate attributeName='width' from='0%' to={valueWidth} dur={duration + 'ms'} />
                  )}
                </rect>
              </mask>
            )}
            <pattern
              id={basePatternId}
              patternUnits='userSpaceOnUse'
              width={STRIPE_PERIOD}
              height={STRIPE_PERIOD}
              patternTransform={`rotate(${STRIPE_ANGLE})`}
            >
              <rect width={STRIPE_PERIOD} height={STRIPE_PERIOD} fill={resolveColor(baseBgColor)} />
              <rect width={STRIPE_WIDTH} height={STRIPE_PERIOD} fill='#00110C' fillOpacity={0.11} />
            </pattern>
          </defs>
          {hasValue && (
            <rect width={valueWidth} height='100%' rx={CORNER_RADIUS} fill={resolveColor(color)}>
              {animate && <animate attributeName='width' from='0%' to={valueWidth} dur={duration + 'ms'} />}
            </rect>
          )}
          {hasBase && (
            <g mask={hasValue ? `url(#${baseMaskId})` : undefined}>
              <rect
                width='100%'
                height='100%'
                rx={CORNER_RADIUS}
                fill={`url(#${basePatternId})`}
              />
            </g>
          )}
        </svg>
      </SLineGauge>,
    );
  }
}

function Segment(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSMiniChart.Score.Line.Segment.Component, typeof LineRoot, 'Segment'>,
) {
  const { styles } = props;
  const SScoreSegment = Root;

  return sstyled(styles)(<SScoreSegment render={Box} />);
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
