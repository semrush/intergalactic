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

  get xScale() {
    const { xScale, marginY = 30, plotWidth, data, groupKey } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding];

    const miniestValue = data.reduce(
      (acc, item) => {
        if (item.x - item.value < acc.xMin) {
          acc.xMin = item.x - item.value;
          acc.value = item.value;
        }
        return acc;
      },
      { value: data[0].value, xMin: data[0].x - data[0].value },
    ).value;
    const maxestValue = data.reduce(
      (acc, item) => {
        if (item.value + item.x > acc.xMax) {
          acc.xMax = item.value + item.x;
          acc.value = item.value;
        }
        return acc;
      },
      { value: data[0].value, xMax: data[0].value + data[0].x },
    ).value;

    let xMin = Math.min(...data.map((d) => d.x));
    let xMax = Math.max(...data.map((d) => d.x));
    const domainWidh = Math.abs(xMax - xMin);
    const pixelRactio = domainWidh / Math.abs(range[0] - range[1]);
    const minShift = this.valueScale(miniestValue) * pixelRactio;
    const maxShift = this.valueScale(maxestValue) * pixelRactio;
    xMin -= minShift * 2;
    xMax += maxShift * 2;

    return scaleLinear().domain([xMin, xMax]).range(range);
  }

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, plotHeight, data } = this.asProps;

    if (yScale) {
      return yScale;
    }

    const range = [plotHeight - marginX, this.plotPadding];

    const miniestValue = data.reduce(
      (acc, item) => {
        if (item.y - item.value < acc.yMin) {
          acc.yMin = item.y - item.value;
          acc.value = item.value;
        }
        return acc;
      },
      { value: data[0].value, yMin: data[0].y - data[0].value },
    ).value;
    const maxestValue = data.reduce(
      (acc, item) => {
        if (item.value + item.y > acc.yMax) {
          acc.yMax = item.value + item.y;
          acc.value = item.value;
        }
        return acc;
      },
      { value: data[0].value, yMax: data[0].value + data[0].y },
    ).value;

    let yMin = Math.min(...data.map((d) => d.y));
    let yMax = Math.max(...data.map((d) => d.y));
    const domainWidh = Math.abs(yMax - yMin);
    const pixelRactio = domainWidh / Math.abs(range[0] - range[1]);
    const minShift = this.valueScale(miniestValue) * pixelRactio;
    const maxShift = this.valueScale(maxestValue) * pixelRactio;
    yMin -= minShift * 2;
    yMax += maxShift * 2;

    return scaleLinear().domain([yMin, yMax]).range(range);
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
