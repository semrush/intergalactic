import React from 'react';
import createComponent from '@semcore/core';
import { ChartMap } from './AbstractChart.type';
import { LineChartProps } from './LineChart.type';
import { ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { Line, minMax, HoverLine } from '../..';
import { AbstractChart } from './AbstractChart';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

class LineChartComponent extends AbstractChart<LineChartProps> {
  static displayName = 'Chart.Line';

  protected get xScale() {
    const { xScale, marginY = 30, plotWidth, data, groupKey } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][groupKey];
    const range = [marginY, plotWidth - this.plotPadding];
    const domain = minMax(data, groupKey);

    if (testItem instanceof Date && !isNaN(testItem.getMilliseconds())) {
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
    const { groupKey, curve, hideDots, area, areaCurve } = this.asProps;
    const { legendItems, highlightedLine } = this.state;

    return legendItems.map((item, index) => {
      return (
        item.checked && (
          <Line
            x={groupKey.toString()}
            y={item.id}
            key={item.id}
            color={this.resolveColor(item.id)}
            transparent={highlightedLine !== -1 && highlightedLine !== index}
            curve={curve}
          >
            {hideDots !== true && <Line.Dots display />}
            {area?.[item.id] && (
              <Line.Area area={area[item.id]} y0={'y0'} y1={'y1'} curve={areaCurve} />
            )}
          </Line>
        )
      );
    });
  }

  protected renderTooltip() {
    const { data, groupKey, showTotalInTooltip } = this.asProps;
    const { legendItems } = this.state;

    return (
      <HoverLine.Tooltip x={groupKey} wMin={100}>
        {({ xIndex }: any) => {
          const dataItem: any = data[xIndex];

          const total = legendItems.reduce((sum, legendItem) => {
            return sum + dataItem[legendItem.id];
          }, 0);

          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{dataItem[groupKey]?.toString()}</HoverLine.Tooltip.Title>

                {legendItems.map((item) => {
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
}

export const LineChart: ChartMap['Line'] = createComponent(LineChartComponent);
