import React from 'react';
import { createComponent } from '@semcore/core';
import { ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { minMax, ScatterPlot, getScatterPlotRadius } from '../..';
import { AbstractChart } from './AbstractChart';
import {
  ScatterPlotChartData,
  ScatterPlotChartProps,
  ScatterPlotChartType,
} from './ScatterPlotChart.type';
import { Text } from '@semcore/typography';
import { BaseChartProps, ListData } from './AbstractChart.type';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class ScatterPlotChartComponent extends AbstractChart<
  ScatterPlotChartData,
  ScatterPlotChartProps,
  typeof ScatterPlotChartComponent.enhance
> {
  static displayName = 'Chart.ScatterPlot';
  public static defaultProps: Partial<BaseChartProps<ListData>> = {
    direction: 'column',
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    showLegend: false,
  };

  static enhance = [i18nEnhance(localizedMessages)] as const;

  protected get dataKeys(): string[] {
    const { data, groupKey, valueKey } = this.props;

    return Object.keys(data[0]).filter((key) => key !== groupKey && key !== valueKey);
  }

  protected get xScale() {
    const { xScale, marginY = 30, plotWidth, data, groupKey, valueKey } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const radius = getScatterPlotRadius(valueKey) / this.getValueScale([...this.flatValues]);
    const testItem = data[0][groupKey];
    const range = [marginY, plotWidth - this.plotPadding];
    const domain = minMax(data, groupKey);

    if (testItem instanceof Date && !Number.isNaN(testItem.getMilliseconds())) {
      return scaleTime([domain[0] - radius, domain[1] + radius], range);
    }

    return scaleLinear([domain[0] - radius, domain[1] + radius], range);
  }

  protected get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, plotHeight, valueKey } = this.asProps;

    if (yScale) {
      return yScale;
    }

    const flatValues = this.flatValues;
    const radius = getScatterPlotRadius(valueKey) / this.getValueScale([...flatValues]);

    const max = Math.max(...flatValues) + radius;
    const min = Math.min(...flatValues) - radius;

    return scaleLinear()
      .range([plotHeight - marginX, this.plotPadding])
      .domain([min, max]);
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
    const { data, groupKey, showTooltip } = this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

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

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'ScatterPlot' });
  }
}

export const ScatterPlotChart: ScatterPlotChartType = createComponent(ScatterPlotChartComponent);
