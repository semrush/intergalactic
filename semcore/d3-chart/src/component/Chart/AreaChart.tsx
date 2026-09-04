import { createComponent } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { type ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Area, minMax, HoverLine, StackedArea } from '../..';
import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import type { AreaChartData, AreaChartProps, AreaChartType, AreaChartDefaultProps } from './AreaChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class AreaChartComponent extends AbstractChart<
  AreaChartData,
  AreaChartProps,
  typeof AreaChartComponent.enhance,
  {},
  ChartState,
  AreaChartDefaultProps
> {
  static displayName = 'Chart.Area';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    direction: 'column',
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
  } as const;

  get xScale() {
    const { xScale, marginY = 40, data, groupKey } = this.asProps;
    const { plotWidth } = this;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][groupKey];
    const range = [marginY, plotWidth - this.plotPadding];
    const domain = minMax(data, groupKey);

    if (testItem instanceof Date && !Number.isNaN(testItem.getMilliseconds())) {
      return scaleTime(domain, range);
    }

    return scaleLinear(domain, range);
  }

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 24, stacked } = this.asProps;
    const { plotHeight } = this;

    if (yScale) {
      return yScale;
    }

    const flatValues = super.flatValues;
    const min = Math.min(...flatValues);
    const max = stacked ? super.maxStackedValue : Math.max(...flatValues);

    return scaleLinear()
      .range([plotHeight - marginX, this.plotPadding])
      .domain([min, max]);
  }

  renderChart() {
    const { groupKey, curve, showDots, stacked, onClickArea } = this.asProps;
    const { dataDefinitions, highlightedItem } = this.state;

    if (stacked) {
      return (
        <StackedArea x={groupKey}>
          {dataDefinitions.map((item, index) => {
            return (
              item.checked && (
                <StackedArea.Area
                  x={groupKey}
                  y={item.id}
                  key={item.id}
                  color={item.color}
                  transparent={highlightedItem !== -1 && highlightedItem !== index}
                  curve={curve}
                  onClick={onClickArea}
                >
                  {showDots && <StackedArea.Area.Dots display />}
                </StackedArea.Area>
              )
            );
          })}
        </StackedArea>
      );
    }

    return dataDefinitions.map((item, index) => {
      return (
        item.checked && (
          <Area
            x={groupKey}
            y={item.id}
            key={item.id}
            color={item.color}
            transparent={highlightedItem !== -1 && highlightedItem !== index}
            curve={curve}
            onClick={onClickArea}
          >
            {showDots && <Area.Dots display />}
          </Area>
        )
      );
    });
  }

  renderTooltip() {
    const { data, groupKey } = this.asProps;

    return (
      <HoverLine.Tooltip x={groupKey} wMin={100}>
        {({ xIndex }: any) => {
          const dataItem = data[xIndex];

          return {
            children: this.getTooltipChildren({
              Tooltip: HoverLine.Tooltip,
              dataItem,
            }),
          };
        }}
      </HoverLine.Tooltip>
    );
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Area' });
  }
}

/**
 * AreaChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/area-chart/area-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/area-chart/area-chart-code/|Examples}
 */
export const AreaChart = createComponent<
  AreaChartType,
  typeof AreaChartComponent
>(AreaChartComponent);
