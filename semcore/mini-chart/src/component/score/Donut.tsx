import React from 'react';
import { createComponent, Component, Root, sstyled, ComponentType } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { assignProps } from '@semcore/core';
import { CommonScoreProps } from './Score';

import style from './donut.shadow.css';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';

export type ScoreDonutProps = BoxProps & CommonScoreProps;

type Enhances = {
  resolveColor: ReturnType<typeof resolveColorEnhance>;
  isSemiDonut?: true;
};

class DonutRoot extends Component<ScoreDonutProps, {}, {}, typeof DonutRoot.enhance> {
  static enhance = [resolveColorEnhance()] as const;

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
    const strokeDashoffsetBase = -1 * (valueStrokeDasharray + (isSemiDonut ? offsetPoint : 0));
    const { __excludeProps, extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <SDonutContainer render={Box} semi={isSemiDonut} __excludeProps={__excludeProps}>
        <svg
          width='100%'
          height='100%'
          viewBox={viewBox}
          fill='none'
          role='img'
          {...extractedAriaProps}
        >
          <g>
            <circle
              cx='12'
              cy='12'
              r={radius}
              strokeWidth={strokeWidth}
              stroke={resolveColor(baseBgColor)}
              strokeDasharray={
                loading ? undefined : `${greyStrokeDasharray} ${baseStrokeDasharray}`
              }
              strokeDashoffset={strokeDashoffsetBase}
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
                {value !== 100 && !isSemiDonut && (
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
