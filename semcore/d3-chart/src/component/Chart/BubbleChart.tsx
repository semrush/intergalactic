import React from 'react';
import createComponent from '@semcore/core';
import { scaleLinear, ScaleLinear, ScalePower } from 'd3-scale';
// @ts-ignore
import { Bubble, getBubbleChartValueScale } from '../..';
import { AbstractChart } from './AbstractChart';
import {
  BubbleChartData,
  BubbleChartProps,
  BubbleChartType,
  ScaledValues,
} from './BubbleChart.type';
import { Text } from '@semcore/typography';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

class BubbleChartComponent extends AbstractChart<BubbleChartData, BubbleChartProps> {
  static displayName = 'Chart.Bubble';

  protected get dataKeys(): string[] {
    const { data } = this.props;

    return data.map((_, index) => index.toString());
  }

  get defaultDataDefinitions(): Array<LegendItem & { columns: React.ReactNode[] }> {
    const { legendProps, data } = this.props;

    return data.map((item, index) => {
      const key = index.toString();
      const legendData = legendProps?.legendMap?.[key];

      if (item.color === undefined) {
        item.color = this.resolveColor(key, index);
      }

      const dataDefinition: LegendItem & { columns: React.ReactNode[] } = {
        id: key,
        label: legendData?.label ?? item.label ?? key,
        icon: legendData?.icon ?? undefined,
        checked: legendData?.defaultChecked ?? true,
        color: item.color,
        columns: [],
      };

      if (legendData?.additionalInfo || legendData?.count) {
        dataDefinition.additionalInfo = legendData.additionalInfo
          ? { label: legendData.additionalInfo }
          : legendData.count
          ? { count: legendData.count }
          : undefined;
      }

      return dataDefinition;
    });
  }

  get valueScale(): ScalePower<number, number> {
    const { data } = this.asProps;

    return getBubbleChartValueScale(data, 'value');
  }

  calculateDomain(key: 'x' | 'y', range: [number, number]) {
    const { data } = this.asProps;
    const miniestValue = data.reduce(
      (acc, item) => {
        if (item[key] - item.value < acc.min) {
          acc.min = item[key] - item.value;
          acc.value = item.value;
        }
        return acc;
      },
      { value: data[0].value, min: data[0][key] - data[0].value },
    ).value;
    const maxestValue = data.reduce(
      (acc, item) => {
        if (item.value + item[key] > acc.max) {
          acc.max = item.value + item.x;
          acc.value = item.value;
        }
        return acc;
      },
      { value: data[0].value, max: data[0].value + data[0][key] },
    ).value;

    let min = Math.min(...data.map((d) => d[key]));
    let max = Math.max(...data.map((d) => d[key]));
    const pixelRactio = Math.abs(max - min) / Math.abs(range[0] - range[1]);
    const minValueShift = this.valueScale(miniestValue) * pixelRactio;
    const maxValueShift = this.valueScale(maxestValue) * pixelRactio;
    min -= minValueShift * 2;
    max += maxValueShift * 2;

    return [min, max] as [min: number, max: number];
  }

  get xScale() {
    const { xScale, marginY = 30, plotWidth } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding] as [number, number];
    const domain = this.calculateDomain('x', range);

    return scaleLinear().domain(domain).range(range);
  }

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, plotHeight } = this.asProps;

    if (yScale) {
      return yScale;
    }

    const range = [plotHeight - marginX, this.plotPadding] as [number, number];
    const domain = this.calculateDomain('y', range);

    return scaleLinear().domain(domain).range(range);
  }

  defaultLegendProps() {
    return {
      shape: 'Circle' as const,
    };
  }

  renderChart() {
    return <Bubble x='x' y='y' value='value' color={'color'} label={'label'} />;
  }

  renderTooltip() {
    const { showTooltip } = this.asProps;

    if (!showTooltip) {
      return null;
    }

    return (
      <Bubble.Tooltip>
        {({ index, data }: any) => {
          return {
            children: (
              <>
                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                <Text tag='div'>X axis {data[index].x}</Text>
                <Text tag='div'>Y axis {data[index].y}</Text>
                <Text tag='div'>Value {data[index].value}</Text>
              </>
            ),
          };
        }}
      </Bubble.Tooltip>
    );
  }
}

export const BubbleChart: BubbleChartType = createComponent(BubbleChartComponent);
