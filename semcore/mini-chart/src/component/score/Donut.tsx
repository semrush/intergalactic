import { createComponent, Component, Root, sstyled, type ComponentType } from '@semcore/core';
import { assignProps } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { Box, type BoxProps } from '@semcore/flex-box';
import React from 'react';

import style from './donut.shadow.css';
import type { CommonScoreProps } from './Score';
import getScoreDonutFunctions from '../../utils/score.donut.functions';

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

    const {
      getViewBox,
      getStrokeWidth,
      getRadius,
      getBaseStrokeDashArray,
      getStrokeDashArrayParts,
      getStrokeDashOffsetBase,
      getValueStrokeDashArray,
      getGreyStrokeDashArray,
    } = getScoreDonutFunctions(isSemiDonut);

    const strokeWidth = getStrokeWidth();
    const radius = getRadius();
    const viewBox = getViewBox();

    const baseStrokeDashArray = getBaseStrokeDashArray(radius);
    const valueStrokeDashArray = getValueStrokeDashArray(value, baseStrokeDashArray);
    const greyStrokeDashArray = getGreyStrokeDashArray(baseStrokeDashArray, valueStrokeDashArray);
    const spaceStrokeDashArray = getStrokeDashArrayParts(value, baseStrokeDashArray);
    const strokeDashOffsetBase = getStrokeDashOffsetBase(value, baseStrokeDashArray);

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
                loading ? undefined : `${greyStrokeDashArray} ${baseStrokeDashArray}`
              }
              strokeDashoffset={strokeDashOffsetBase}
            />
            {!loading && (
              <>
                <circle
                  cx='12'
                  cy='12'
                  r={radius}
                  strokeWidth={strokeWidth}
                  stroke={resolveColor(color)}
                  strokeDasharray={`${valueStrokeDashArray} ${baseStrokeDashArray}`}
                  strokeDashoffset={valueStrokeDashArray}
                >
                  <animate
                    attributeName='stroke-dashoffset'
                    values={`0;${valueStrokeDashArray}`}
                  />
                </circle>
                {value !== 100 && !isSemiDonut && (
                  <circle
                    cx='12'
                    cy='12'
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={resolveColor('chart-grid-border')}
                    strokeDasharray={spaceStrokeDashArray}
                    strokeDashoffset={-1 * valueStrokeDashArray}
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
