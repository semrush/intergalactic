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
      ? [plotHeight, this.plotPadding]
      : [0, plotWidth - this.plotPadding];

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
            ? [0, plotWidth - this.plotPadding]
            : [plotHeight, this.plotPadding],
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
    const { dataDefinitions, highlightedItem } = this.state;

    if (this.isStack) {
      return (
        <StackBar x={invertAxis ? undefined : groupKey} y={invertAxis ? groupKey : undefined}>
          {dataDefinitions.map((item, index) => {
            const BarComponent = invertAxis ? StackBar.HorizontalBar : StackBar.Bar;

            const commonBarComponentProps: BarProps = {
              color: item.color,
              transparent: highlightedItem !== -1 && highlightedItem !== index,
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
      <Tooltip
        x={invertAxis ? undefined : groupKey}
        y={invertAxis ? groupKey : undefined}
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
      invertAxis,
      showXAxis,
      showYAxis,
      xTicksCount,
      yTicksCount,
      groupKey,
    } = this.asProps;

    return (
      <>
        {showYAxis && invertAxis !== true && (
          <>
            <Grid
              scale={[this.xScale, this.yScale]}
              orientation='horizontal'
              dataHintsHandler={this.dataHintsHandlers}
              ticksCount={yTicksCount}
            />
            <HoverRect
              data={this.data}
              uid={this.plotId}
              eventEmitter={this.eventEmitter}
              scale={[this.xScale, this.yScale]}
              keyX={groupKey}
            />
          </>
        )}

        {showXAxis && invertAxis === true && (
          <>
            <Grid
              scale={[this.xScale, this.yScale]}
              orientation='vertical'
              dataHintsHandler={this.dataHintsHandlers}
              ticksCount={xTicksCount}
            />
            <HoverRect
              data={this.data}
              uid={this.plotId}
              eventEmitter={this.eventEmitter}
              scale={[this.xScale, this.yScale]}
              keyY={groupKey}
            />
          </>
        )}
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
