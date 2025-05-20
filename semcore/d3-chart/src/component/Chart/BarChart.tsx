import React from 'react';
import { createComponent } from '@semcore/core';
import { BaseLegendProps } from './AbstractChart.type';
import { BarChartData, BarChartProps, BarChartType } from './BarChart.type';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
// @ts-ignore
import { minMax, GroupBar, HoverRect, StackBar, Line } from '../..';
import { AbstractChart } from './AbstractChart';
import { BarProps } from '../../types';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class BarChartComponent extends AbstractChart<
  BarChartData,
  BarChartProps,
  typeof BarChartComponent.enhance
> {
  static displayName = 'Chart.Bar';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  get xScale() {
    const { xScale, invertAxis } = this.asProps;

    if (xScale) {
      return xScale;
    }

    return invertAxis ? this.valueScale : this.categoryScale;
  }

  get yScale() {
    const { yScale, invertAxis } = this.asProps;

    if (yScale) {
      return yScale;
    }

    return invertAxis ? this.categoryScale : this.valueScale;
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    if (this.props.trend !== undefined) {
      return { withTrend: true };
    }

    return {};
  }

  renderTrend(key: LegendItemKey) {
    const { groupKey, type = 'group', invertAxis, trend } = this.asProps;
    const { withTrend } = this.state;
    const trendItem = trend?.[key];

    if (withTrend && trendItem) {
      return (
        <Line
          data={trendItem}
          key={`${key}_${groupKey}`}
          x={invertAxis ? 'y' : 'x'}
          y={invertAxis ? 'x' : 'y'}
          color={'wall'}
          style={{ strokeWidth: 3, strokeDasharray: 5 }}
        >
          <Line.Dots data={trendItem} display />
        </Line>
      );
    }

    return null;
  }

  renderChart() {
    const { groupKey, type = 'group', invertAxis } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    if (dataDefinitions.length === 1) {
      const item = dataDefinitions[0];
      const BarComponent = invertAxis ? GroupBar.HorizontalBar : GroupBar.Bar;

      return (
        <>
          <BarComponent
            x={invertAxis ? item.id : groupKey}
            y={invertAxis ? groupKey : item.id}
            key={item.id}
            color={item.color}
            onClick={this.handleClickBar}
          />
          {this.renderTrend(item.id)}
        </>
      );
    }

    if (type === 'group') {
      return (
        <>
          <GroupBar x={invertAxis ? undefined : groupKey} y={invertAxis ? groupKey : undefined}>
            {dataDefinitions.map((item, index) => {
              const BarComponent = invertAxis ? GroupBar.HorizontalBar : GroupBar.Bar;

              const commonBarComponentProps: BarProps = {
                color: item.color,
                transparent: highlightedLine !== -1 && highlightedLine !== index,
                onClick: this.handleClickBar,
              };

              if (invertAxis) {
                commonBarComponentProps.x = item.id;
              } else {
                commonBarComponentProps.y = item.id;
              }

              return item.checked && <BarComponent key={item.id} {...commonBarComponentProps} />;
            })}
          </GroupBar>
          {dataDefinitions.map((item) => item.checked && this.renderTrend(item.id))}
        </>
      );
    }

    if (type === 'stack') {
      return (
        <>
          <StackBar x={invertAxis ? undefined : groupKey} y={invertAxis ? groupKey : undefined}>
            {dataDefinitions.map((item, index) => {
              const BarComponent = invertAxis ? StackBar.HorizontalBar : StackBar.Bar;

              const commonBarComponentProps: BarProps = {
                color: item.color,
                transparent: highlightedLine !== -1 && highlightedLine !== index,
                onClick: this.handleClickBar,
              };

              if (invertAxis) {
                commonBarComponentProps.x = item.id;
              } else {
                commonBarComponentProps.y = item.id;
              }

              return item.checked && <BarComponent key={item.id} {...commonBarComponentProps} />;
            })}
          </StackBar>
          {dataDefinitions.map((item) => item.checked && this.renderTrend(item.id))}
        </>
      );
    }

    return null;
  }

  renderTooltip(): React.ReactNode {
    const { data, groupKey, showTotalInTooltip, showTooltip, invertAxis, onClickHoverRect } =
      this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

    return (
      <HoverRect.Tooltip
        x={invertAxis ? undefined : groupKey}
        y={invertAxis ? groupKey : undefined}
        wMin={100}
        onClick={onClickHoverRect}
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
    return this.asProps.getI18nText('legendForChart', { chartType: 'Bar' });
  }

  private handleClickBar = (
    _data: BarChartData[0],
    e: React.SyntheticEvent,
    barIndex: number,
    barKey: string,
  ) => {
    const { onClickBar } = this.asProps;

    if (onClickBar) {
      onClickBar(barIndex, barKey, e);
    }
  };

  private get categoryScale() {
    const {
      marginY = 40,
      marginX = 24,
      plotWidth,
      plotHeight,
      invertAxis,
      data,
      groupKey,
    } = this.asProps;

    const testItem = data[0][groupKey];
    const range = invertAxis
      ? [plotHeight - marginX, this.plotPadding]
      : [marginY, plotWidth - this.plotPadding];

    if (testItem instanceof Date && !Number.isNaN(testItem.getMilliseconds())) {
      const domain = minMax(data, groupKey);

      return scaleTime(domain, range);
    }

    const domain = data.map((item) => item[groupKey]);

    return scaleBand(domain, range).paddingInner(0.4).paddingOuter(0.2);
  }

  private get valueScale() {
    const { marginY = 40, marginX = 24, plotWidth, plotHeight, invertAxis, type } = this.asProps;

    const max = type === 'stack' ? super.maxStackedValue : Math.max(...super.flatValues);

    return scaleLinear()
      .range(
        invertAxis
          ? [marginY, plotWidth - this.plotPadding]
          : [plotHeight - marginX, this.plotPadding],
      )
      .domain([0, max]);
  }
}

export const BarChart: BarChartType = createComponent(BarChartComponent);
