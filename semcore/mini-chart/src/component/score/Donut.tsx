import React from 'react';
import createComponent, { Component, Root, sstyled, ComponentType } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';
import { assignProps } from '@semcore/core';
import { CommonScoreProps } from './Score';

import style from './donut.shadow.css';

export type ScoreDonutProps = BoxProps & CommonScoreProps;

type Enhances = {
  resolveColor: ReturnType<typeof resolveColorEnhance>;
  isSemiDonut?: true;
};

class DonutRoot extends Component<ScoreDonutProps, {}, {}, Enhances> {
  static enhance = [resolveColorEnhance()];

  static style = style;

  static defaultProps = {
    animate: true,
  };

  render() {
    const SDonutContainer = Root;
    const {
      value,
      styles,
      color = 'chart-palette-order-1',
      resolveColor,
      isSemiDonut,
      loading,
    } = this.asProps;

    const strokeWidth = isSemiDonut ? 6 : 4;
    const radius = isSemiDonut ? 9 : 10;
    const baseStrokeDasharray = isSemiDonut ? Math.PI * radius : Math.PI * 2 * radius;
    const valueStrokeDasharray = baseStrokeDasharray * (value / 100);
    const greyStrokeDasharray = baseStrokeDasharray * ((100 - value) / 100);
    const offsetPoint = isSemiDonut ? baseStrokeDasharray / (100 / 3) : baseStrokeDasharray / 100;

    const strokeDasharrayBetweenSpaces = `${greyStrokeDasharray - 2 * offsetPoint} ${offsetPoint}`;

    let spaceStrokeDasharray = `${offsetPoint} ${
      value < 99 ? `${strokeDasharrayBetweenSpaces}` : ''
    } ${baseStrokeDasharray}`;

    if (isSemiDonut) {
      spaceStrokeDasharray = `${offsetPoint} ${
        value < 95 ? `${strokeDasharrayBetweenSpaces}` : ''
      } ${baseStrokeDasharray}`;
    }

    const viewBox = isSemiDonut ? '0 0 24 12' : '0 0 24 24';

    return sstyled(styles)(
      <SDonutContainer render={Box} semi={isSemiDonut}>
        <svg width='100%' height='100%' viewBox={viewBox} fill='none'>
          <g>
            <circle
              cx='12'
              cy='12'
              r={radius}
              strokeWidth={strokeWidth}
              stroke={resolveColor('chart-grid-bar-chart-base-bg')}
              strokeDasharray={
                loading ? undefined : `${greyStrokeDasharray} ${baseStrokeDasharray}`
              }
              strokeDashoffset={-1 * valueStrokeDasharray}
            />
            {!loading && (
              <>
                <circle
                  cx='12'
                  cy='12'
                  r={radius}
                  strokeWidth={strokeWidth}
                  stroke={resolveColor(color)}
                  strokeDasharray={`${valueStrokeDasharray} ${baseStrokeDasharray}`}
                  strokeDashoffset={valueStrokeDasharray}
                >
                  <animate
                    attributeName={'stroke-dashoffset'}
                    values={`0;${valueStrokeDasharray}`}
                  />
                </circle>
                {value !== 100 && (
                  <circle
                    cx='12'
                    cy='12'
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={resolveColor('chart-grid-border')}
                    strokeDasharray={spaceStrokeDasharray}
                    strokeDashoffset={-1 * valueStrokeDasharray}
                  />
                )}
              </>
            )}
          </g>
        </svg>
      </SDonutContainer>,
    );
  }
}

export const ScoreDonut: ComponentType<ScoreDonutProps, {}, {}, Enhances> =
  createComponent(DonutRoot);

ScoreDonut.displayName = 'MiniChart.ScoreDonut';

export const ScoreSemiDonut: ComponentType<ScoreDonutProps, {}, {}, Enhances> = createComponent(
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
