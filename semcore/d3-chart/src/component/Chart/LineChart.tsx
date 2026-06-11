import { createComponent } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { type ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import type { LineChartData, LineChartDefaultProps, LineChartProps, LineChartType } from './LineChart.type';
// @ts-ignore
import { Line, minMax, HoverLine } from '../..';
import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class LineChartComponent extends AbstractChart<
  LineChartData,
  LineChartProps,
  typeof LineChartComponent.enhance,
  {},
  ChartState,
  LineChartDefaultProps
> {
  static displayName = 'Chart.Line';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    direction: 'column',
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
  } as const;

  protected get xScale() {
    const { xScale, marginY = 30, data, groupKey } = this.asProps;
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

  protected get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30 } = this.asProps;
    const { plotHeight } = this;

    if (yScale) {
      return yScale;
    }

    const flatValues = super.flatValues;

    const max = Math.max(...flatValues);
    const min = Math.min(...flatValues);

    return scaleLinear()
      .range([plotHeight - marginX, this.plotPadding])
      .domain([min, max]);
  }

  protected renderChart() {
    const { groupKey, curve, showDots, area, areaCurve, onClickLine } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    return dataDefinitions.map((item, index) => {
      return (
        item.checked && (
          <Line
            x={groupKey.toString()}
            y={item.id}
            key={item.id}
            color={item.color}
            transparent={highlightedLine !== -1 && highlightedLine !== index}
            curve={curve}
            onClick={onClickLine}
          >
            {showDots && <Line.Dots display />}
            {area?.[item.id] && (
              <Line.Area area={area[item.id]} y0='y0' y1='y1' curve={areaCurve} />
            )}
          </Line>
        )
      );
    });
  }

  protected renderTooltip() {
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
    return this.asProps.getI18nText('legendForChart', { chartType: 'Line' });
  }
}

/**
 * LineChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart-code/|Examples}
 */
export const LineChart = createComponent<
  LineChartType,
  typeof LineChartComponent
>(LineChartComponent);
