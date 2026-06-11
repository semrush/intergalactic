import { createComponent } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { scaleBand, scaleLinear, type ScaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Bar, minMax, HoverRect, StackBar, type BarProps } from '../..';
import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import type { HistogramChartData, HistogramChartDefaultProps, HistogramChartProps, HistogramChartType } from './HistogramChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class HistogramChartComponent extends AbstractChart<
  HistogramChartData,
  HistogramChartProps,
  typeof HistogramChartComponent.enhance,
  {},
  ChartState,
  HistogramChartDefaultProps
> {
  static displayName = 'Chart.Histogram';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    direction: 'column',
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
  } as const;

  get xScale() {
    const {
      xScale,
      marginY = 30,
      marginX = 30,
      invertAxis,
      data,
      groupKey,
    } = this.asProps;
    const { plotWidth, plotHeight } = this;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][groupKey];
    const range = invertAxis
      ? [plotHeight - marginX, this.plotPadding]
      : [marginY, plotWidth - this.plotPadding];

    if (testItem instanceof Date && !Number.isNaN(testItem.getMilliseconds())) {
      const domain = minMax(data, groupKey);

      return scaleTime(domain, range);
    }

    const domain = data.map((item) => item[groupKey]);

    return scaleBand(domain, range).paddingInner(0.05).paddingOuter(0.2);
  }

  get yScale(): ScaleLinear<any, any> {
    const {
      yScale,
      marginY = 30,
      marginX = 30,
      invertAxis,
      data,
    } = this.asProps;
    const { plotWidth, plotHeight } = this;

    let max: number;

    if (this.isStack) {
      max = data.reduce((max, item) => {
        const barSum = Object.values(item).reduce<number>((sum, val) => {
          if (val instanceof Date && !Number.isNaN(val.getMilliseconds())) {
            return sum + val.getMilliseconds();
          }

          return sum + (val as number);
        }, 0);

        if (barSum > max) {
          max = barSum;
        }

        return max;
      }, 0);
    } else {
      const flatValues = super.flatValues;

      max = Math.max(...flatValues);
    }

    return (
      yScale ??
      scaleLinear()
        .range(
          invertAxis
            ? [marginY, plotWidth - this.plotPadding]
            : [plotHeight - marginX, this.plotPadding],
        )
        .domain([0, max])
    );
  }

  get isStack(): boolean {
    const { dataDefinitions } = this.state;

    return dataDefinitions.length > 1;
  }

  renderChart() {
    const { groupKey, invertAxis } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    if (this.isStack) {
      return (
        <StackBar x={invertAxis ? undefined : groupKey} y={invertAxis ? groupKey : undefined}>
          {dataDefinitions.map((item, index) => {
            const BarComponent = invertAxis ? StackBar.HorizontalBar : StackBar.Bar;

            const commonBarComponentProps: BarProps = {
              color: item.color,
              transparent: highlightedLine !== -1 && highlightedLine !== index,
            };

            if (invertAxis) {
              commonBarComponentProps.x = item.id;
            } else {
              commonBarComponentProps.y = item.id;
            }

            return item.checked && <BarComponent key={item.id} {...commonBarComponentProps} />;
          })}
        </StackBar>
      );
    }

    const item = dataDefinitions[0];

    return (
      item.checked && (
        <Bar
          x={invertAxis ? item.id : groupKey}
          y={invertAxis ? groupKey : item.id}
          key={item.id}
          color={item.color}
        />
      )
    );
  }

  renderTooltip(): React.ReactNode {
    const { data, groupKey, invertAxis } = this.asProps;

    return (
      <HoverRect.Tooltip
        x={invertAxis ? undefined : groupKey}
        y={invertAxis ? groupKey : undefined}
        wMin={100}
      >
        {({ xIndex, yIndex }: any) => {
          const index = invertAxis ? yIndex : xIndex;
          const dataItem = data[index];

          return {
            children: this.getTooltipChildren({
              Tooltip: HoverRect.Tooltip,
              dataItem,
            }),
          };
        }}
      </HoverRect.Tooltip>
    );
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Histogram' });
  }
}

/**
 * HistogramChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/histogram-chart/histogram-chart-api/|API}
 */
export const HistogramChart = createComponent<
  HistogramChartType,
  typeof HistogramChartComponent
>(HistogramChartComponent);
