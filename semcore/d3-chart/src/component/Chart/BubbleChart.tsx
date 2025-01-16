import React from 'react';
import { createComponent } from '@semcore/core';
import { scaleLinear, ScaleLinear } from 'd3-scale';
// @ts-ignore
import { Bubble, calculateBubbleDomain } from '../..';
import { AbstractChart } from './AbstractChart';
import { BubbleChartData, BubbleChartProps, BubbleChartType } from './BubbleChart.type';
import { Text } from '@semcore/typography';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class BubbleChartComponent extends AbstractChart<
  BubbleChartData,
  BubbleChartProps,
  typeof BubbleChartComponent.enhance
> {
  static displayName = 'Chart.Bubble';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  protected get dataKeys(): string[] {
    const { data } = this.props;

    return data.map((_, index) => index.toString());
  }

  protected override getDefaultDataDefinitions(): Array<
    LegendItem & { columns: React.ReactNode[] }
  > {
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

  get xScale() {
    const { xScale, marginY = 30, plotWidth, data } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding];
    const domain = calculateBubbleDomain(data, 'x', range);

    return scaleLinear().domain(domain).range(range);
  }

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, plotHeight, data } = this.asProps;

    if (yScale) {
      return yScale;
    }

    const range = [plotHeight - marginX, this.plotPadding];
    const domain = calculateBubbleDomain(data, 'y', range);

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

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Bubble' });
  }
}

export const BubbleChart: BubbleChartType = createComponent(BubbleChartComponent);
