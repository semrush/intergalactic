import { Box, type BoxProps } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled, assignProps } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import React from 'react';

import style from './donut.shadow.css';
import type { CommonScoreProps } from './Score';
import { ScoreDonutUtils } from '../../utils/ScoreDonutUtils';

export type ScoreDonutProps = BoxProps & CommonScoreProps;

class DonutRoot extends Component<ScoreDonutProps, typeof DonutRoot.enhance> {
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-extra-slow',
      fallback: '500',
      map: (v: string) => Number.parseInt(v, 10).toString(),
      prop: 'duration',
    }),
    resolveColorEnhance(),
  ] as const;

  static style = style;

  static defaultProps = {
    animate: true,
  };

  render() {
    const SDonutContainer = Root;
    const {
      value,
      styles,
      baseBgColor = 'chart-grid-bar-chart-base-bg',
      color = 'chart-palette-order-1',
      resolveColor,
      isSemiDonut,
      loading,
      animate,
      duration,
    } = this.asProps;

    const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);
    const { __excludeProps, extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <SDonutContainer render={Box} semi={isSemiDonut} __excludeProps={__excludeProps}>
        <svg
          width='100%'
          height='100%'
          viewBox={scoreDonut.viewBox}
          fill='none'
          role='img'
          {...extractedAriaProps}
        >
          <g>
            <circle
              cx='12'
              cy='12'
              r={scoreDonut.radius}
              strokeWidth={scoreDonut.strokeWidth}
              stroke={resolveColor(baseBgColor)}
              strokeDasharray={
                loading
                  ? undefined
                  : `${scoreDonut.baseLength} ${scoreDonut.fullLength}`
              }
              strokeDashoffset={scoreDonut.baseOffset}
            >
              {animate && value > 0 && (
                <>
                  <animate
                    attributeName='stroke-dasharray'
                    from={`${scoreDonut.animatedBaseLengthFrom} ${scoreDonut.fullLength}`}
                    to={`${scoreDonut.animatedBaseLengthTo} ${scoreDonut.fullLength}`}
                    dur={duration + 'ms'}
                  />
                  <animate
                    attributeName='stroke-dashoffset'
                    from={-1 * scoreDonut.startMargin}
                    to={scoreDonut.baseOffset}
                    dur={duration + 'ms'}
                  />
                </>
              )}
            </circle>
            {!loading && value > 0 && (
              <>
                <circle
                  cx='12'
                  cy='12'
                  r={scoreDonut.radius}
                  strokeWidth={scoreDonut.strokeWidth}
                  stroke={resolveColor(color)}
                  strokeDasharray={`${scoreDonut.valueLength} ${scoreDonut.fullLength}`}
                >
                  {animate && (
                    <animate
                      attributeName='stroke-dasharray'
                      from={`0 ${scoreDonut.fullLength}`}
                      to={`${scoreDonut.valueLength} ${scoreDonut.fullLength}`}
                      dur={duration + 'ms'}
                    />
                  )}
                </circle>
              </>
            )}
          </g>
        </svg>
      </SDonutContainer>,
    );
  }
}

export const ScoreDonut = createComponent<'svg', ScoreDonutProps, {}, typeof DonutRoot.enhance>(DonutRoot);

ScoreDonut.displayName = 'MiniChart.ScoreDonut';

export const ScoreSemiDonut = createComponent<'svg', ScoreDonutProps, {}, typeof DonutRoot.enhance>(
  DonutRoot,
  {},
  {
    enhancements: [
      () => {
        return {
          wrapperProps: (props: ScoreDonutProps) => {
            return assignProps(props, { isSemiDonut: true });
          },
        };
      },
    ],
  },
);

ScoreSemiDonut.displayName = 'MiniChart.ScoreSemiDonut';
