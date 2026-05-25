import { Box } from '@semcore/base-components';
import { createComponent, assignProps, Root, sstyled } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import { Trend, type CommonTrendProps } from './Trend';
import style from '../skeleton/skeleton.shadow.css';

type BarItem = {
  /**
   * Value
   */
  value: number;
  /**
   * Color of value
   */
  color?: string;
};

export type TrendBarProps = CommonTrendProps & {
  /**
   * Data to bar chart
   */
  data: BarItem[];
};

class TrendBarRoot extends Trend<TrendBarProps, typeof TrendBarRoot.enhance> {
  static enhance = [resolveColorEnhance()] as const;

  static style = style;

  static defaultProps = {
    animate: true,
  };

  get defaultData(): BarItem[] {
    return [{ value: 20 }, { value: 80 }, { value: 45 }, { value: 10 }];
  }

  get data(): BarItem[] {
    const { data, loading } = this.asProps;

    if (loading) {
      return this.defaultData;
    }

    return data;
  }

  render() {
    const STrendBar = Root;
    const { styles, resolveColor, isHistogram, animate, loading } = this.asProps;
    const step = this.defaultWidth / this.data.length;
    const { __excludeProps, extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <STrendBar render={Box} ref={this.containerRef} __excludeProps={['data', ...__excludeProps]}>
        <svg
          width='100%'
          height='100%'
          viewBox={`0 0 ${this.svgWidth} ${this.svgHeight}`}
          role='img'
          {...extractedAriaProps}
        >
          {this.data.map((barItem, index) => {
            let color = resolveColor('chart-palette-order-other-data');

            if (barItem.color) {
              color = resolveColor(barItem.color);
            }

            return (
              <rect
                key={index}
                x={step * index}
                y={this.defaultHeight - barItem.value}
                width={isHistogram ? step : step * 0.8}
                height={barItem.value}
                fill={color}
              >
                {animate && !loading && (
                  <animate
                    attributeName='y'
                    values={`${this.defaultHeight};${this.defaultHeight - barItem.value}`}
                    dur='500ms'
                  />
                )}
              </rect>
            );
          })}
        </svg>
      </STrendBar>,
    );
  }
}

/**
 * MiniCharts.TrendBar
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-api#trend-charts|API} | {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-code|Examples}
 */
export const TrendBar = createComponent<'svg', TrendBarProps, {}, typeof TrendBarRoot.enhance>(TrendBarRoot);

TrendBar.displayName = 'MiniChart.TrendBar';

/**
 * MiniCharts.TrendHistogram
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-api#trend-charts|API} | {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-code|Examples}
 */
export const TrendHistogram = createComponent<'svg', TrendBarProps, {}, typeof TrendBarRoot.enhance>(
  TrendBarRoot,
  {},
  {
    enhancements: [
      () => {
        return {
          wrapperProps: (props: TrendBarProps) => {
            return assignProps(props, { isHistogram: true });
          },
        };
      },
    ],
  },
);

TrendHistogram.displayName = 'MiniChart.TrendHistogram';
