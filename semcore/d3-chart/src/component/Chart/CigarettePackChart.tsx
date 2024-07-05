import React from 'react';
import createComponent from '@semcore/core';
import { BaseChartProps, BaseLegendProps } from './AbstractChart.type';
import {
  CigarettePackChartData,
  CigarettePackChartProps,
  CigarettePackChartType,
} from './CigarettePackChart.type';
import { scaleBand, scaleLinear } from 'd3-scale';
// @ts-ignore
import { CigarettePack } from '../..';
import { AbstractChart } from './AbstractChart';

class CigarettePackChartComponent extends AbstractChart<
  CigarettePackChartData,
  CigarettePackChartProps
> {
  static displayName = 'Chart.CigarettePack';
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
      <CigarettePack x={x} y={y}>
        {this.renderCigarettePackTooltip()}
        <CigarettePack.Hover onClick={onClickHoverRect} />
        <CigarettePack.Annotation>
          <CigarettePack.Label />
          <CigarettePack.Percent />
          <CigarettePack.Value />
        </CigarettePack.Annotation>
        <CigarettePack.Bar onClick={onClickBar}>
          <CigarettePack.Bar.Background />
          <CigarettePack.Bar.Fill />
        </CigarettePack.Bar>
      </CigarettePack>
    );
  }

  protected renderCigarettePackTooltip(): React.ReactNode {
    const { data, x, y, showTooltip } = this.asProps;

    if (!showTooltip) {
      return null;
    }

    return (
      <CigarettePack.Tooltip wMin={100}>
        {({ index }: any) => {
          return {
            children: (
              <>
                <CigarettePack.Tooltip.Title>{data[index][y]}</CigarettePack.Tooltip.Title>

                <CigarettePack.Tooltip.Dot>{data[index][x]}</CigarettePack.Tooltip.Dot>
              </>
            ),
          };
        }}
      </CigarettePack.Tooltip>
    );
  }

  renderTooltip(): React.ReactNode {
    return null;
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

export const CigarettePackChart: CigarettePackChartType = createComponent(
  CigarettePackChartComponent,
);
