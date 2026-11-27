import { createComponent } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { scaleBand, scaleLinear, type ScaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Bar, minMax, Tooltip, StackBar, type BarProps } from '../..';
import { Grid } from '../Grid/Grid';
import { HoverRect } from '../Hover/HoverRect';
import { AbstractAxisChart } from './AbstractChart/AbstractAxisChart';
import type { ChartState } from './AbstractChart/AbstractChart';
import type { HistogramChartData, HistogramChartDefaultProps, HistogramChartProps, HistogramChartType } from './HistogramChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class HistogramChartComponent extends AbstractAxisChart<
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
    locale: 'en',
    deltaPercentGrowthColor: 'good',
  } as const;

  get xScale() {
    const {
      xScale,
      data,
      groupKey,
    } = this.asProps;
    const { plotWidth, plotHeight } = this;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][groupKey];
    const range = [0, plotWidth];

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
        .range([plotHeight, 0])
        .domain([0, max])
    );
  }

  get isStack(): boolean {
    const { dataDefinitions } = this.state;

    return dataDefinitions.length > 1;
  }

  renderChart() {
    const { groupKey } = this.asProps;
    const { dataDefinitions, highlightedItem } = this.state;

    if (this.isStack) {
      return (
        <StackBar x={groupKey}>
          {dataDefinitions.map((item, index) => {
            const BarComponent = StackBar.Bar;

            const commonBarComponentProps: BarProps = {
              color: item.color,
              transparent: highlightedItem !== -1 && highlightedItem !== index,
            };

            commonBarComponentProps.y = item.id;

            return item.checked && <BarComponent key={item.id} {...commonBarComponentProps} />;
          })}
        </StackBar>
      );
    }

    const item = dataDefinitions[0];

    return (
      item.checked && (
        <Bar
          x={groupKey}
          y={item.id}
          key={item.id}
          color={item.color}
        />
      )
    );
  }

  renderTooltip(): React.ReactNode {
    const { data, groupKey } = this.asProps;

    return (
      <Tooltip
        x={groupKey}
        wMin={100}
      >
        {({ index }: any) => {
          const dataItem = data[index];

          return {
            children: this.getTooltipChildren({
              Tooltip: Tooltip,
              dataItem,
              index,
            }),
          };
        }}
      </Tooltip>
    );
  }

  protected override renderGrid(): React.ReactNode {
    const {
      showXAxis,
      showYAxis,
      xTicksCount,
      yTicksCount,
      groupKey,
    } = this.asProps;

    return (
      <>
        {showYAxis && (
          <>
            <Grid
              scale={[this.xScale, this.yScale]}
              orientation='horizontal'
              dataHintsHandler={this.dataHintsHandlers}
              ticksCount={yTicksCount}
            />
            <HoverRect
              data={this.data}
              eventEmitter={this.eventEmitter}
              scale={[this.xScale, this.yScale]}
              keyX={groupKey}
            />
          </>
        )}

        {showXAxis !== false && this.renderXAxisLine()}
      </>
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
