import React from 'react';
import { createComponent } from '@semcore/core';
import { scaleLinear } from 'd3-scale';
// @ts-ignore
import { Donut } from '../..';
import { AbstractChart } from './AbstractChart';
import { Text } from '@semcore/typography';
import { DonutChartData, DonutChartProps, DonutChartType } from './DonutChart.type';
import { Flex } from '@semcore/flex-box';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class DonutChartComponent extends AbstractChart<
  DonutChartData,
  DonutChartProps,
  typeof DonutChartComponent.enhance
> {
  static displayName = 'Chart.Donut';
  static defaultProps: Partial<DonutChartProps> = {
    direction: 'row-reverse',
    alignItems: 'flex-start',
    innerRadius: 100,
    marginX: 0,
    marginY: 0,
  };

  static enhance = [i18nEnhance(localizedMessages)] as const;

  get xScale() {
    const { xScale } = this.asProps;

    if (xScale) {
      return xScale;
    }

    return scaleLinear();
  }

  get yScale() {
    const { yScale } = this.asProps;

    if (yScale) {
      return yScale;
    }

    return scaleLinear();
  }

  defaultLegendProps() {
    return {
      legendType: 'Table' as const,
    };
  }

  renderChart() {
    const { innerRadius, halfsize, innerLabel } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    const checkedLegendItems = dataDefinitions.filter((item) => item.checked);

    return (
      <Donut halfsize={halfsize} innerRadius={innerRadius}>
        {checkedLegendItems.length === 0 && <Donut.EmptyData />}
        {checkedLegendItems.map((item, index) => {
          return (
            <Donut.Pie
              key={item.id}
              dataKey={item.id}
              name={item.label}
              color={item.color}
              active={highlightedLine === index}
            />
          );
        })}
        {innerLabel && <Donut.Label>{innerLabel}</Donut.Label>}
      </Donut>
    );
  }

  renderTooltip() {
    const { data, showTooltip } = this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

    return (
      <Donut.Tooltip>
        {({ dataKey }: any) => {
          const title = dataDefinitions.find((item) => item.id === dataKey);

          return {
            children: (
              <>
                <Donut.Tooltip.Title>{title?.label || dataKey}</Donut.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <Text bold>{this.tooltipValueFormatter(data[dataKey])}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Donut.Tooltip>
    );
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Donut' });
  }
}

export const DonutChart: DonutChartType = createComponent(DonutChartComponent);
