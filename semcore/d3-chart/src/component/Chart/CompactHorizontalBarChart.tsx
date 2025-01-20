import React from 'react';
import { createComponent } from '@semcore/core';
import { BaseChartProps, BaseLegendProps } from './AbstractChart.type';
import {
  CompactHorizontalBarChartData,
  CompactHorizontalBarChartProps,
  CompactHorizontalBarChartType,
} from './CompactHorizontalBarChart.type';
import { scaleBand, scaleLinear } from 'd3-scale';
// @ts-ignore
import { CompactHorizontalBar } from '../..';
import { AbstractChart } from './AbstractChart';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class CompactHorizontalBarChartComponent extends AbstractChart<
  CompactHorizontalBarChartData,
  CompactHorizontalBarChartProps,
  typeof CompactHorizontalBarChartComponent.enhance
> {
  static displayName = 'Chart.CompactHorizontalBar';
  public static defaultProps: Partial<BaseChartProps<any>> = {
    direction: 'column',
    showXAxis: false,
    showYAxis: false,
    showTooltip: true,
    showLegend: false,
  };

  static enhance = [i18nEnhance(localizedMessages)] as const;

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
      <CompactHorizontalBar x={x} y={y}>
        {this.renderCompactHorizontalBarTooltip()}
        <CompactHorizontalBar.Hover onClick={onClickHoverRect} />
        <CompactHorizontalBar.Annotation>
          <CompactHorizontalBar.Label />
          <CompactHorizontalBar.Percent />
          <CompactHorizontalBar.Value />
        </CompactHorizontalBar.Annotation>
        <CompactHorizontalBar.Bar onClick={onClickBar}>
          <CompactHorizontalBar.Bar.Background />
          <CompactHorizontalBar.Bar.Fill />
        </CompactHorizontalBar.Bar>
      </CompactHorizontalBar>
    );
  }

  protected renderCompactHorizontalBarTooltip(): React.ReactNode {
    const { data, x, y, showTooltip } = this.asProps;

    if (!showTooltip) {
      return null;
    }

    return (
      <CompactHorizontalBar.Tooltip wMin={100}>
        {({ index }: any) => {
          return {
            children: (
              <>
                <CompactHorizontalBar.Tooltip.Title>
                  {data[index][y]}
                </CompactHorizontalBar.Tooltip.Title>

                <CompactHorizontalBar.Tooltip.Dot>
                  {data[index][x]}
                </CompactHorizontalBar.Tooltip.Dot>
              </>
            ),
          };
        }}
      </CompactHorizontalBar.Tooltip>
    );
  }

  renderTooltip(): React.ReactNode {
    return null;
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'CompactHorizontalBar' });
  }

  private get categoryScale() {
    const { marginY = 40, plotHeight, data, y } = this.asProps;

    return scaleBand()
      .range([plotHeight - marginY, marginY])
      .domain([...data].reverse().map((d) => d[y]) as any)
      .paddingInner(0.6)
      .paddingOuter(0.2);
  }

  private get valueScale() {
    const { marginY = 0, plotWidth } = this.asProps;

    const sum = [...super.flatValues.values()].reduce((acc, d) => acc + d, 0);

    return scaleLinear().range([marginY, plotWidth]).domain([marginY, sum]);
  }
}

export const CompactHorizontalBarChart: CompactHorizontalBarChartType = createComponent(
  CompactHorizontalBarChartComponent,
);
