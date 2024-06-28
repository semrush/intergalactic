import React from 'react';
import createComponent from '@semcore/core';
import { BaseChartProps, BaseLegendProps } from './AbstractChart.type';
import {
  DistributionBarChartData,
  DistributionBarChartProps,
  DistributionBarChartType,
} from './DistributionBarChart.type';
import { scaleBand, scaleLinear } from 'd3-scale';
// @ts-ignore
import { DistributionBar } from '../..';
import { AbstractChart } from './AbstractChart';

class DistributionBarChartComponent extends AbstractChart<
  DistributionBarChartData,
  DistributionBarChartProps
> {
  static displayName = 'Chart.DistributionBar';
  public static defaultProps: Partial<BaseChartProps<any>> = {
    direction: 'column',
    showXAxis: false,
    showYAxis: false,
    showTooltip: true,
    showLegend: false,
  };

  get xScale() {
    return this.asProps.xScale ?? this.valueScale;
  }

  get yScale() {
    return this.asProps.yScale ?? this.categoryScale;
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    return {};
  }

  renderChart() {
    const { x, y, onClickHoverRect, onClickBar } = this.asProps;

    return (
      <DistributionBar x={x} y={y}>
        {this.renderDistributionTooltip()}
        <DistributionBar.Hover onClick={onClickHoverRect} />
        <DistributionBar.Annotation>
          <DistributionBar.Label />
          <DistributionBar.Percent />
          <DistributionBar.Value />
        </DistributionBar.Annotation>
        <DistributionBar.Bar onClick={onClickBar}>
          <DistributionBar.Bar.Background />
          <DistributionBar.Bar.Fill />
        </DistributionBar.Bar>
      </DistributionBar>
    );
  }

  protected renderDistributionTooltip(): React.ReactNode {
    const { data, x, y, showTooltip } = this.asProps;

    if (!showTooltip) {
      return null;
    }

    return (
      <DistributionBar.Tooltip wMin={100}>
        {({ index }: any) => {
          return {
            children: (
              <>
                <DistributionBar.Tooltip.Title>{data[index][y]}</DistributionBar.Tooltip.Title>

                <DistributionBar.Tooltip.Dot>{data[index][x]}</DistributionBar.Tooltip.Dot>
              </>
            ),
          };
        }}
      </DistributionBar.Tooltip>
    );
  }

  renderTooltip(): React.ReactNode {
    return null;
  }

  private get categoryScale() {
    const { marginY = 40, plotHeight, data, y } = this.asProps;

    return scaleBand()
      .range([plotHeight - marginY, marginY])
      .domain([...data].reverse().map((d) => d[y]) as string[])
      .paddingInner(0.6)
      .paddingOuter(0.2);
  }

  private get valueScale() {
    const { marginY = 0, plotWidth } = this.asProps;

    const sum = [...super.flatValues.values()].reduce((acc, d) => acc + d, 0);

    return scaleLinear().range([marginY, plotWidth]).domain([marginY, sum]);
  }
}

export const DistributionBarChart: DistributionBarChartType = createComponent(
  DistributionBarChartComponent,
);
