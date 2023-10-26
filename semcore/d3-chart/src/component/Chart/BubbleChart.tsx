import React from 'react';
import createComponent from '@semcore/core';
import { ChartMap } from './AbstractChart.type';
import { scaleLinear, ScaleLinear } from 'd3-scale';
// @ts-ignore
import { Bubble, minMax } from '../..';
import { AbstractChart } from './AbstractChart';
import { BubbleChartData, BubbleChartProps } from './BubbleChart.type';
import { Text } from '@semcore/typography';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

class BubbleChartComponent extends AbstractChart<BubbleChartData, BubbleChartProps> {
  static displayName = 'Chart.Bubble';

  protected get legendKeys(): string[] {
    const { data } = this.props;

    return data.map((_, index) => index.toString());
  }

  get defaultLegendItems(): Array<LegendItem & { columns: React.ReactNode[] }> {
    const { legendProps, data } = this.props;

    return data.map((item, index) => {
      const key = index.toString();
      const legendData = legendProps?.legendMap?.[key];

      const legendItem: LegendItem & { columns: React.ReactNode[] } = {
        id: key,
        label: legendData?.label ?? item.label ?? key,
        icon: legendData?.icon ?? undefined,
        checked: legendData?.defaultChecked ?? true,
        color: item.color ?? this.resolveColor(key),
        columns: [],
      };

      if (legendData?.additionalInfo || legendData?.count) {
        legendItem.additionalInfo = legendData.additionalInfo
          ? { label: legendData.additionalInfo }
          : legendData.count
          ? { count: legendData.count }
          : undefined;
      }

      return legendItem;
    });
  }

  get xScale() {
    const { xScale, marginY = 30, plotWidth, data, groupKey } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding];
    const domain = minMax(data, 'x');

    return scaleLinear([domain[0] * 0.8, domain[1] * 1.2], range);
  }

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, plotHeight, data } = this.asProps;

    if (yScale) {
      return yScale;
    }

    const range = [plotHeight - marginX, this.plotPadding];
    const domain = minMax(data, 'y');

    return scaleLinear([domain[0] * 0.8, domain[1] * 1.2], range);
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

export const BubbleChart: ChartMap['Bubble'] = createComponent(BubbleChartComponent);
