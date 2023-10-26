import React from 'react';
import createComponent from '@semcore/core';
import { ChartMap } from './AbstractChart.type';
import { ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { Area, minMax, HoverLine, StackedArea } from '../..';
import { AbstractChart } from './AbstractChart';
import { AreaChartProps } from './AreaChart.type';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

class AreaChartComponent extends AbstractChart<AreaChartProps> {
  static displayName = 'Chart.Area';

  get xScale() {
    const { xScale, marginY = 40, plotWidth, data, groupKey } = this.asProps;

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

  get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 24, plotHeight, stacked, data, groupKey } = this.asProps;

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
    const { groupKey, curve, hideDots, stacked } = this.asProps;
    const { legendItems, highlightedLine } = this.state;

    if (stacked) {
      return (
        <StackedArea x={groupKey}>
          {legendItems.map((item, index) => {
            return (
              item.checked && (
                <StackedArea.Area
                  x={groupKey}
                  y={item.id}
                  key={item.id}
                  color={this.resolveColor(item.id)}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                  curve={curve}
                >
                  {hideDots !== true && <StackedArea.Area.Dots display />}
                </StackedArea.Area>
              )
            );
          })}
        </StackedArea>
      );
    }

    return legendItems.map((item, index) => {
      return (
        item.checked && (
          <Area
            x={groupKey}
            y={item.id}
            key={item.id}
            color={this.resolveColor(item.id)}
            transparent={highlightedLine !== -1 && highlightedLine !== index}
            curve={curve}
          >
            {hideDots !== true && <Area.Dots display />}
          </Area>
        )
      );
    });
  }

  renderTooltip() {
    const { data, groupKey, showTotalInTooltip } = this.asProps;
    const { legendItems } = this.state;

    return (
      <HoverLine.Tooltip x={groupKey} wMin={100}>
        {
          // @ts-ignore
          ({ xIndex }) => {
            const dataItem: any = data[xIndex];

            const total = legendItems.reduce((sum, legendItem) => {
              return sum + dataItem[legendItem.id];
            }, 0);

            return {
              children: (
                <>
                  <HoverLine.Tooltip.Title>
                    {dataItem[groupKey]?.toString()}
                  </HoverLine.Tooltip.Title>

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
          }
        }
      </HoverLine.Tooltip>
    );
  }
}

export const AreaChart: ChartMap['Area'] = createComponent(AreaChartComponent);
