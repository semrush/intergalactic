import React from 'react';
import { createComponent } from '@semcore/core';
import { LineChartData, LineChartProps, LineChartType } from './LineChart.type';
import { ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { Line, minMax, HoverLine } from '../..';
import { AbstractChart } from './AbstractChart';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class LineChartComponent extends AbstractChart<
  LineChartData,
  LineChartProps,
  typeof LineChartComponent.enhance
> {
  static displayName = 'Chart.Line';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  protected get xScale() {
    const { xScale, marginY = 30, plotWidth, data, groupKey } = this.asProps;

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
    const { yScale, marginX = 30, plotHeight } = this.asProps;

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
    const { groupKey, curve, showDots, area, areaCurve } = this.asProps;
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
          >
            {showDots && <Line.Dots display />}
            {area?.[item.id] && (
              <Line.Area area={area[item.id]} y0={'y0'} y1={'y1'} curve={areaCurve} />
            )}
          </Line>
        )
      );
    });
  }

  protected renderTooltip() {
    const { data, groupKey, showTotalInTooltip, showTooltip } = this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

    return (
      <HoverLine.Tooltip x={groupKey} wMin={100}>
        {({ xIndex }: any) => {
          const dataItem = data[xIndex];
          const total = this.totalValue(dataItem);

          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{dataItem[groupKey]?.toString()}</HoverLine.Tooltip.Title>

                {dataDefinitions.map((item) => {
                  return (
                    item.checked && (
                      <Flex justifyContent='space-between' key={item.id}>
                        <HoverLine.Tooltip.Dot mr={4} color={item.color}>
                          {item.label}
                        </HoverLine.Tooltip.Dot>
                        <Text bold>{this.tooltipValueFormatter(dataItem[item.id])}</Text>
                      </Flex>
                    )
                  );
                })}

                {showTotalInTooltip === true && (
                  <Flex mt={2} justifyContent='space-between'>
                    <Box mr={4}>Total</Box>
                    <Text bold>{total}</Text>
                  </Flex>
                )}
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
    );
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Line' });
  }
}

export const LineChart: LineChartType = createComponent(LineChartComponent);
