import { createComponent } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import { scaleLinear, type ScaleLinear } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Bubble, calculateBubbleDomain } from '../..';
import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import type { BubbleChartData, BubbleChartProps, BubbleChartType, BubbleChartDefaultProps } from './BubbleChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

class BubbleChartComponent extends AbstractChart<
  BubbleChartData,
  BubbleChartProps,
  typeof BubbleChartComponent.enhance,
  {},
  ChartState,
  BubbleChartDefaultProps
> {
  static displayName = 'Chart.Bubble';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    direction: 'column',
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
  } as const;

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
    const { xScale, marginY = 30, data } = this.asProps;
    const { plotWidth } = this;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding];
    const domain = calculateBubbleDomain(data, 'x', range);

    return scaleLinear().domain(domain).range(range);
  }

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, data } = this.asProps;
    const { plotHeight } = this;

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
    const { onClickBubble } = this.asProps;
    const { dataDefinitions } = this.state;

    return (
      <Bubble onClick={onClickBubble} x='x' y='y' value='value' color='color' label='label'>
        {dataDefinitions.map(({ checked, id }, index) => (
          <Bubble.Circle visible={checked} key={id} index={index} />
        ))}
      </Bubble>
    );
  }

  renderTooltip() {
    return (
      <Bubble.Tooltip>
        {({ index, data }: any) => {
          return {
            children: (
              <>
                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                <Text tag='div'>
                  X axis
                  {' '}
                  {data[index].x}
                </Text>
                <Text tag='div'>
                  Y axis
                  {' '}
                  {data[index].y}
                </Text>
                <Text tag='div'>
                  Value
                  {' '}
                  {data[index].value}
                </Text>
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

/**
 * BubbleChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/bubble-chart/bubble-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/bubble-chart/bubble-chart-code/|Examples}
 */
export const BubbleChart = createComponent<
  BubbleChartType,
  typeof BubbleChartComponent
>(BubbleChartComponent);
