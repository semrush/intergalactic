import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, assignProps, Root, sstyled } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import { Trend } from './Trend';
import style from '../../styles/skeleton.shadow.css';
import type { NSMiniChart } from '../../types';

const TOP_RADIUS = 1;
class TrendBarRoot extends Trend<
  Intergalactic.InternalTypings.InferComponentProps<NSMiniChart.Trend.Bar.Component>,
  typeof TrendBarRoot.enhance,
  NSMiniChart.Trend.Bar.DefaultProps
> {
  static enhance = [resolveColorEnhance()] as const;

  static style = style;

  static defaultProps = {
    animate: true,
  } as const;

  get defaultData(): NSMiniChart.Trend.Bar.Item[] {
    return [{ value: 20 }, { value: 80 }, { value: 45 }, { value: 10 }];
  }

  get data(): NSMiniChart.Trend.Bar.Item[] {
    const { data, loading } = this.asProps;

    if (loading) {
      return this.defaultData;
    }

    return data;
  }

  getBarWidth(step: number) {
    const { isHistogram } = this.asProps;

    return isHistogram ? step : step * 0.8;
  }

  getBarPath(x: number, width: number, height: number) {
    const bottom = this.defaultHeight;
    const top = bottom - height;
    const r = Math.max(0, Math.min(TOP_RADIUS, width / 2, height));

    return [
      `M${x},${bottom}`,
      `V${top + r}`,
      `A${r},${r} 0 0 1 ${x + r},${top}`,
      `H${x + width - r}`,
      `A${r},${r} 0 0 1 ${x + width},${top + r}`,
      `V${bottom}`,
      'Z',
    ].join(' ');
  }

  render() {
    const STrendBar = Root;
    const { styles, resolveColor, animate, loading } = this.asProps;
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

            const x = step * index;
            const width = this.getBarWidth(step);
            const height = barItem.value;

            return (
              <path
                key={index}
                d={this.getBarPath(x, width, height)}
                fill={color}
              >
                {animate && !loading && (
                  <animateTransform attributeName='transform' type='translate' values={`0 ${height};0 0`} dur='500ms' />
                )}
              </path>
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
export const TrendBar = createComponent<NSMiniChart.Trend.Bar.Component, typeof TrendBarRoot>(TrendBarRoot);

TrendBar.displayName = 'MiniChart.TrendBar';

/**
 * MiniCharts.TrendHistogram
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-api#trend-charts|API} | {@link https://developer.semrush.com/intergalactic/data-display/mini-chart/mini-chart-code|Examples}
 */
export const TrendHistogram = createComponent<NSMiniChart.Trend.Bar.Component, typeof TrendBarRoot>(
  TrendBarRoot,
  {},
  {
    enhancements: [
      () => {
        return {
          wrapperProps: (props: NSMiniChart.Trend.Bar.Props) => {
            return assignProps(props, { isHistogram: true });
          },
        };
      },
    ],
  },
);

TrendHistogram.displayName = 'MiniChart.TrendHistogram';
