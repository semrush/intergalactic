import React from 'react';
import createComponent from '@semcore/core';
import { BaseChartProps, BaseLegendProps } from './AbstractChart.type';
import {
  CigarettesPackChartData,
  CigarettesPackChartProps,
  CigarettesPackChartType,
} from './CigarettesPackChart.type';
import { scaleBand, scaleLinear } from 'd3-scale';
// @ts-ignore
import { CigarettesPack } from '../..';
import { AbstractChart } from './AbstractChart';

class CigarettesPackChartComponent extends AbstractChart<
  CigarettesPackChartData,
  CigarettesPackChartProps
> {
  static displayName = 'Chart.CigarettesPack';
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
      <CigarettesPack x={x} y={y}>
        {this.renderCigarettePackTooltip()}
        <CigarettesPack.Hover onClick={onClickHoverRect} />
        <CigarettesPack.Annotation>
          <CigarettesPack.Label />
          <CigarettesPack.Percent />
          <CigarettesPack.Value />
        </CigarettesPack.Annotation>
        <CigarettesPack.Bar onClick={onClickBar}>
          <CigarettesPack.Bar.Background />
          <CigarettesPack.Bar.Fill />
        </CigarettesPack.Bar>
      </CigarettesPack>
    );
  }

  protected renderCigarettePackTooltip(): React.ReactNode {
    const { data, x, y, showTooltip } = this.asProps;

    if (!showTooltip) {
      return null;
    }

    return (
      <CigarettesPack.Tooltip wMin={100}>
        {({ index }: any) => {
          return {
            children: (
              <>
                <CigarettesPack.Tooltip.Title>{data[index][y]}</CigarettesPack.Tooltip.Title>

                <CigarettesPack.Tooltip.Dot>{data[index][x]}</CigarettesPack.Tooltip.Dot>
              </>
            ),
          };
        }}
      </CigarettesPack.Tooltip>
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

export const CigarettesPackChart: CigarettesPackChartType = createComponent(
  CigarettesPackChartComponent,
);
