import React from 'react';
import { createComponent } from '@semcore/core';
import { scaleBand, scaleLinear, ScaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { Bar, minMax, HoverRect, StackBar, BarProps } from '../..';
import { AbstractChart } from './AbstractChart';
import { HistogramChartData, HistogramChartProps, HistogramChartType } from './HistogramChart.type';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class HistogramChartComponent extends AbstractChart<
  HistogramChartData,
  HistogramChartProps,
  typeof HistogramChartComponent.enhance
> {
  static displayName = 'Chart.Histogram';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  get xScale() {
    const {
      xScale,
      marginY = 30,
      marginX = 30,
      plotWidth,
      plotHeight,
      invertAxis,
      data,
      groupKey,
    } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][groupKey];
    const range = invertAxis
      ? [plotHeight - marginX, this.plotPadding]
      : [marginY, plotWidth - this.plotPadding];

    if (testItem instanceof Date && !Number.isNaN(testItem.getMilliseconds())) {
      const domain = minMax(data, groupKey);

      return scaleTime(domain, range);
    }

    const domain = data.map((item) => item[groupKey]);

    return scaleBand(domain, range).paddingInner(0.05).paddingOuter(0.2);
  }

  get yScale(): ScaleLinear<any, any> {
    const {
      yScale,
      marginY = 30,
      marginX = 30,
      plotHeight,
      plotWidth,
      invertAxis,
      data,
    } = this.asProps;

    let max: number;

    if (this.isStack) {
      max = data.reduce((max, item) => {
        const barSum = Object.values(item).reduce<number>((sum, val) => {
          if (val instanceof Date && !Number.isNaN(val.getMilliseconds())) {
            return sum + val.getMilliseconds();
          }

          return sum + (val as number);
        }, 0);

        if (barSum > max) {
          max = barSum;
        }

        return max;
      }, 0);
    } else {
      const flatValues = super.flatValues;

      max = Math.max(...flatValues);
    }

    return (
      yScale ??
      scaleLinear()
        .range(
          invertAxis
            ? [marginY, plotWidth - this.plotPadding]
            : [plotHeight - marginX, this.plotPadding],
        )
        .domain([0, max])
    );
  }

  get isStack(): boolean {
    const { dataDefinitions } = this.state;

    return dataDefinitions.length > 1;
  }

  renderChart() {
    const { groupKey, invertAxis } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    if (this.isStack) {
      return (
        <StackBar x={invertAxis ? undefined : groupKey} y={invertAxis ? groupKey : undefined}>
          {dataDefinitions.map((item, index) => {
            const BarComponent = invertAxis ? StackBar.HorizontalBar : StackBar.Bar;

            const commonBarComponentProps: BarProps = {
              color: item.color,
              transparent: highlightedLine !== -1 && highlightedLine !== index,
            };

            if (invertAxis) {
              commonBarComponentProps.x = item.id;
            } else {
              commonBarComponentProps.y = item.id;
            }

            return item.checked && <BarComponent key={item.id} {...commonBarComponentProps} />;
          })}
        </StackBar>
      );
    }

    const item = dataDefinitions[0];

    return (
      <Bar
        x={invertAxis ? item.id : groupKey}
        y={invertAxis ? groupKey : item.id}
        key={item.id}
        color={item.color}
      />
    );
  }

  renderTooltip(): React.ReactNode {
    const { data, groupKey, showTotalInTooltip, showTooltip, invertAxis } = this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

    return (
      <HoverRect.Tooltip
        x={invertAxis ? undefined : groupKey}
        y={invertAxis ? groupKey : undefined}
        wMin={100}
      >
        {({ xIndex, yIndex }: any) => {
          const index = invertAxis ? yIndex : xIndex;
          const dataItem = data[index];
          const total = this.totalValue(dataItem);

          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{dataItem[groupKey]?.toString()}</HoverRect.Tooltip.Title>

                {dataDefinitions.map((item) => {
                  return (
                    item.checked && (
                      <Flex justifyContent='space-between' key={item.id}>
                        <HoverRect.Tooltip.Dot mr={4} color={item.color}>
                          {item.label}
                        </HoverRect.Tooltip.Dot>
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
      </HoverRect.Tooltip>
    );
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Histogram' });
  }
}

export const HistogramChart: HistogramChartType = createComponent(HistogramChartComponent);
