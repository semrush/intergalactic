import React from 'react';
import createComponent from '@semcore/core';
import { ChartMap } from './AbstractChart.type';
import { ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { minMax, ScatterPlot } from '../..';
import { AbstractChart } from './AbstractChart';
import { ScatterPlotChartData, ScatterPlotChartProps } from './ScatterPlotChart.type';
import { Text } from '@semcore/typography';

class ScatterPlotChartComponent extends AbstractChart<ScatterPlotChartData, ScatterPlotChartProps> {
  static displayName = 'Chart.ScatterPlot';
  static defaultProps: Partial<ScatterPlotChartProps> = {
    hideLegend: true,
  };

  protected get dataKeys(): string[] {
    const { data, groupKey, valueKey } = this.props;

    return Object.keys(data[0]).filter((key) => key !== groupKey && key !== valueKey);
  }

  protected get xScale() {
    const { xScale, marginY = 30, plotWidth, data, groupKey } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][groupKey];
    const range = [marginY, plotWidth - this.plotPadding];
    const domain = minMax(data, groupKey);

    if (testItem instanceof Date && !isNaN(testItem.getMilliseconds())) {
      return scaleTime([domain[0] * 0.8, domain[1] * 1.2], range);
    }

    return scaleLinear([domain[0] * 0.8, domain[1] * 1.2], range);
  }

  protected get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, plotHeight } = this.asProps;

    if (yScale) {
      return yScale;
    }

    const flatValues = this.flatValues;

    const max = Math.max(...flatValues);
    const min = Math.min(...flatValues);

    return scaleLinear()
      .range([plotHeight - marginX, this.plotPadding])
      .domain([min * 0.8, max * 1.1]);
  }

  protected get flatValues(): Set<number> {
    const { data, groupKey, valueKey } = this.asProps;

    const flatValues = data.reduce<Set<number>>((result, item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== groupKey && key !== valueKey && typeof value === 'number') {
          result.add(value);
        }
      });

      return result;
    }, new Set());

    return flatValues;
  }

  protected renderChart() {
    const { groupKey, valueKey } = this.asProps;
    const { dataDefinitions } = this.state;

    return dataDefinitions.map((item) => {
      return (
        item.checked && (
          <ScatterPlot x={groupKey} y={item.id} key={item.id} color={item.color} value={valueKey} />
        )
      );
    });
  }

  protected renderTooltip() {
    const { data, groupKey } = this.asProps;
    const { dataDefinitions } = this.state;

    return dataDefinitions
      .filter((item) => item.checked)
      .map((item) => {
        return (
          <ScatterPlot.Tooltip key={item.id} x={groupKey} y={item.id} wMin={100}>
            {({ index, x, y }: any) => {
              return {
                children: (
                  <>
                    <ScatterPlot.Tooltip.Dot color={item.color}>Data</ScatterPlot.Tooltip.Dot>
                    <Text tag='div'>X axis {this.tooltipValueFormatter(data[index][x])}</Text>
                    <Text tag='div'>Y axis {this.tooltipValueFormatter(data[index][y])}</Text>
                  </>
                ),
              };
            }}
          </ScatterPlot.Tooltip>
        );
      });
  }
}

export const ScatterPlotChart: ChartMap['ScatterPlot'] = createComponent(ScatterPlotChartComponent);
