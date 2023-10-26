import React from 'react';
import createComponent from '@semcore/core';
import { ChartMap } from './AbstractChart.type';
import { scaleLinear } from 'd3-scale';
// @ts-ignore
import { Donut } from '../..';
import { AbstractChart } from './AbstractChart';
import { Text } from '@semcore/typography';
import { DonutChartData, DonutChartProps } from './DonutChart.type';
import { Flex } from '@semcore/flex-box';

class DonutChartComponent extends AbstractChart<DonutChartData, DonutChartProps> {
  static displayName = 'Chart.Donut';
  static defaultProps: Partial<DonutChartProps> = {
    direction: 'row-reverse',
    alignItems: 'center',
    innerRadius: 100,
    marginX: 0,
    marginY: 0,
  };

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
    const { legendItems, highlightedLine } = this.state;

    const checkedLegendItems = legendItems.filter((item) => item.checked);

    return (
      <Donut halfsize={halfsize} innerRadius={innerRadius}>
        {checkedLegendItems.length === 0 && <Donut.EmptyData />}
        {checkedLegendItems.map((item, index) => {
          return (
            <Donut.Pie
              key={item.id}
              dataKey={item.id}
              name={item.label}
              color={this.resolveColor(item.id)}
              active={highlightedLine === index}
            />
          );
        })}
        {innerLabel && <Donut.Label>{innerLabel}</Donut.Label>}
      </Donut>
    );
  }

  renderTooltip() {
    const { data } = this.asProps;
    const { legendItems } = this.state;

    return (
      <Donut.Tooltip>
        {({ dataKey }: any) => {
          const title = legendItems.find((item) => item.id === dataKey);

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
}

export const DonutChart: ChartMap['Donut'] = createComponent(DonutChartComponent);
