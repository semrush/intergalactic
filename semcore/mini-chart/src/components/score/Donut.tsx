import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled, assignProps } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import React from 'react';

import style from '../../styles/donut.shadow.css';
import type { NSMiniChart } from '../../types';
import { ScoreDonutUtils } from '../../utils/ScoreDonutUtils';

const STRIPE_WIDTH = 2;
const STRIPE_PERIOD = 4;
const STRIPE_ANGLE = 60;
const SEMI_DONUT_ROTATION = 90;
const JUNCTION_GAP = 1.2;

class DonutRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSMiniChart.Score.Donut.Component>,
  typeof DonutRoot.enhance,
  {},
  {},
  {},
  NSMiniChart.Score.Donut.DefaultProps
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

  static style = style;

  static defaultProps = {
    animate: true,
  } as const;

  render() {
    const SDonutContainer = Root;
    const defaultValueColor = 'chart-palette-order-1';
    const defaultBaseColor = 'chart-grid-bar-chart-base-bg';
    const {
      value,
      styles,
      baseBgColor = defaultBaseColor,
      color = defaultValueColor,
      resolveColor,
      isSemiDonut,
      loading,
      animate,
      duration,
      uid,
    } = this.asProps;

    const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);
    const basePatternId = `${uid}-base-pattern`;
    const baseMaskId = `${uid}-base-mask`;
    const stripeAngle = isSemiDonut ? STRIPE_ANGLE - SEMI_DONUT_ROTATION : STRIPE_ANGLE;
    const { __excludeProps, extractedAriaProps } = extractAriaProps(this.asProps);

    const shouldRenderPattern = baseBgColor === defaultBaseColor;

    if (loading) {
      return sstyled(styles)(
        <SDonutContainer render={Box} semi={isSemiDonut} __excludeProps={__excludeProps}>
          <svg width='100%' height='100%' viewBox={scoreDonut.viewBox} fill='none' role='img' {...extractedAriaProps}>
            <path d={scoreDonut.basePath} fill={resolveColor('skeleton-bg')} />
          </svg>
        </SDonutContainer>,
      );
    }

    return sstyled(styles)(
      <SDonutContainer render={Box} semi={isSemiDonut} __excludeProps={__excludeProps}>
        <svg width='100%' height='100%' viewBox={scoreDonut.viewBox} fill='none' role='img' {...extractedAriaProps}>
          <defs>
            {scoreDonut.hasValue && (
              <mask id={baseMaskId} maskUnits='userSpaceOnUse' x={0} y={0} width={24} height={24}>
                <rect width={24} height={24} fill='white' />
                <path
                  d={scoreDonut.valuePath}
                  fill='black'
                  stroke='black'
                  strokeWidth={JUNCTION_GAP * 2}
                  strokeLinejoin='round'
                >
                  {animate && (
                    <animate attributeName='d' values={scoreDonut.valueAnimationFrames} dur={duration + 'ms'} />
                  )}
                </path>
              </mask>
            )}
            {shouldRenderPattern && (
              <pattern
                id={basePatternId}
                patternUnits='userSpaceOnUse'
                width={STRIPE_PERIOD}
                height={STRIPE_PERIOD}
                patternTransform={`rotate(${stripeAngle})`}
              >
                <rect width={STRIPE_PERIOD} height={STRIPE_PERIOD} fill={resolveColor(baseBgColor)} />
                <rect width={STRIPE_WIDTH} height={STRIPE_PERIOD} fill={resolveColor('bg-primary-neutral')} fillOpacity={0.4} />
              </pattern>
            )}
          </defs>
          <path d={scoreDonut.valuePath} fill={resolveColor(color)}>
            {animate && <animate attributeName='d' values={scoreDonut.valueAnimationFrames} dur={duration + 'ms'} />}
          </path>
          {scoreDonut.hasBase && (
            <g mask={scoreDonut.hasValue ? `url(#${baseMaskId})` : undefined}>
              <path
                d={scoreDonut.basePath}
                fill={shouldRenderPattern ? `url(#${basePatternId})` : resolveColor(baseBgColor)}
              />
            </g>
          )}
        </svg>
      </SDonutContainer>,
    );
  }
}

/**
 * MiniCharts.ScoreDount
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-api|API} | {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-code|Examples}
 */
export const ScoreDonut = createComponent<NSMiniChart.Score.Donut.Component, typeof DonutRoot>(DonutRoot);

ScoreDonut.displayName = 'MiniChart.ScoreDonut';

/**
 * MiniCharts.ScoreSemiDount
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-api|API} | {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-code|Examples}
 */
export const ScoreSemiDonut = createComponent<NSMiniChart.Score.Donut.Component, typeof DonutRoot>(
  DonutRoot,
  {},
  {
    enhancements: [
      () => {
        return {
          wrapperProps: (props: NSMiniChart.Score.Donut.Props) => {
            return assignProps(props, { isSemiDonut: true });
          },
        };
      },
    ],
  },
);

ScoreSemiDonut.displayName = 'MiniChart.ScoreSemiDonut';
