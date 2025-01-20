import React from 'react';
import { createComponent } from '@semcore/core';
import { ScaleLinear, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { Area, minMax, HoverLine, StackedArea } from '../..';
import { AbstractChart } from './AbstractChart';
import { AreaChartData, AreaChartProps, AreaChartType } from './AreaChart.type';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class AreaChartComponent extends AbstractChart<
  AreaChartData,
  AreaChartProps,
  typeof AreaChartComponent.enhance
> {
  static displayName = 'Chart.Area';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  get xScale() {
    const { xScale, marginY = 40, plotWidth, data, groupKey } = this.asProps;

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
    const { groupKey, curve, showDots, stacked } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

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
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                  curve={curve}
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
            transparent={highlightedLine !== -1 && highlightedLine !== index}
            curve={curve}
          >
            {showDots && <Area.Dots display />}
          </Area>
        )
      );
    });
  }

  renderTooltip() {
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
    return this.asProps.getI18nText('legendForChart', { chartType: 'Area' });
  }
}

export const AreaChart: AreaChartType = createComponent(AreaChartComponent);
