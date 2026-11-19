import { Box, Flex } from '@semcore/base-components';
import { createComponent, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import { scaleLinear, type ScaleLinear } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Bubble, calculateBubbleDomain, YAxis, XAxis, HoverLine } from '../..';
import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import type { BubbleChartData, BubbleChartProps, BubbleChartType, BubbleChartDefaultProps } from './BubbleChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

const uniqKey = Symbol('uniqKey');

type BubbleChartInnerData = Array<BubbleChartData[number] & { [uniqKey]: string }>;

class BubbleChartComponent extends AbstractChart<
  BubbleChartData,
  BubbleChartProps,
  typeof BubbleChartComponent.enhance,
  {},
  ChartState,
  BubbleChartDefaultProps
> {
  static displayName = 'Chart.Bubble';

  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = (props: BubbleChartProps) => {
    return {
      direction: 'column',
      showXAxis: true,
      showYAxis: true,
      showTooltip: true,
      locale: 'en',
      xTicksCount: props.data.length,
      yTicksCount: props.data.length,
    } as const;
  };

  protected plotPadding = 8;

  private cachedData: BubbleChartInnerData = [];

  constructor(props: BubbleChartProps) {
    super(props);

    this.cachedData = this.getSortedData(props.data);
  }

  componentDidUpdate(prevProps: BubbleChartProps): void {
    super.componentDidUpdate(prevProps);

    if (prevProps.data !== this.props.data) {
      this.cachedData = this.getSortedData(this.props.data);
    }
  }

  protected get dataKeys(): string[] {
    const { data } = this.props;

    return data.map((_, index) => index.toString());
  }

  protected override getDefaultDataDefinitions(): Array<
    LegendItem & { columns: React.ReactNode[] }
  > {
    const { legendProps, data } = this.props;

    return data.map((item, index) => {
      const key = index.toString();
      const legendData = legendProps?.legendMap?.[key];

      if (item.color === undefined) {
        item.color = this.resolveColor(key, index);
      }

      const dataDefinition: LegendItem & { columns: React.ReactNode[] } = {
        id: key,
        label: legendData?.label ?? item.label ?? key,
        icon: legendData?.icon ?? undefined,
        checked: legendData?.defaultChecked ?? true,
        color: item.color,
        columns: [],
      };

      if (legendData?.additionalInfo || legendData?.count) {
        dataDefinition.additionalInfo = legendData.additionalInfo
          ? { label: legendData.additionalInfo }
          : legendData.count
            ? { count: legendData.count }
            : undefined;
      }

      return dataDefinition;
    });
  }

  override get xScale() {
    const { xScale, marginY = 8, data } = this.asProps;
    const { plotWidth } = this;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding];
    const domain = calculateBubbleDomain(data, 'x', range);

    return scaleLinear().domain(domain).range(range);
  }

  override get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 30, data } = this.asProps;
    const { plotHeight } = this;

    if (yScale) {
      return yScale;
    }

    const range = [plotHeight - marginX, this.plotPadding];
    const domain = calculateBubbleDomain(data, 'y', range);

    return scaleLinear().domain(domain).range(range);
  }

  override defaultLegendProps() {
    return {
      shape: 'Circle' as const,
    };
  }

  override get data(): BubbleChartInnerData {
    return this.cachedData;
  }

  override renderChart() {
    const { onClickBubble, axisXValueFormatter, axisYValueFormatter } = this.asProps;
    const { dataDefinitions, highlightedItem } = this.state;

    return (
      <>
        <Bubble x='x' y='y' value='value' color='color' label='label' formatValue={[axisXValueFormatter, axisYValueFormatter]}>
          {this.data.map((item, index) => {
            const dataDefinition = dataDefinitions.find((dataDef) => dataDef.id === item[uniqKey]);

            if (!dataDefinition) {
              return null;
            }

            return (
              <Bubble.Circle
                visible={dataDefinition.checked}
                transparent={highlightedItem !== -1 && highlightedItem.toString() !== dataDefinition.id}
                key={dataDefinition.id}
                index={index}
                onClick={onClickBubble ? (e: React.SyntheticEvent) => onClickBubble(Number(dataDefinition.id), e) : undefined}
              />
            );
          })}
        </Bubble>
      </>
    );
  }

  override renderTooltip() {
    return (
      <Bubble.Tooltip>
        {({ index, data }: any) => {
          const { styles } = this.asProps;
          const STooltipChildrenWrapper = Box;

          return {
            children: sstyled(styles)(
              <Flex direction='column'>
                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                <STooltipChildrenWrapper
                  // @ts-ignore
                  columnsCount={2}
                >
                  <Text>X axis</Text>
                  <Text textAlign='end'>{data[index].x}</Text>
                  <Text>Y axis</Text>
                  <Text textAlign='end'>{data[index].y}</Text>
                  <Text>Value</Text>
                  <Text textAlign='end'>{data[index].value}</Text>
                </STooltipChildrenWrapper>
              </Flex>,
            ),
          };
        }}
      </Bubble.Tooltip>
    );
  }

  protected override getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Bubble' });
  }

  protected override renderAxis(): React.ReactNode {
    const {
      showXAxis,
      showYAxis,
      data,
      axisXValueFormatter,
      axisYValueFormatter,
      multilineXTicks,
      multilineYTicks,
    } = this.asProps;

    if (!Array.isArray(data)) {
      return null;
    }

    const xTicks = this.xTicks;
    const yTicks = this.yTicks;

    const childrenX = axisXValueFormatter
      ? ({ value }: any) => ({ children: axisXValueFormatter(value) })
      : undefined;
    const childrenY = axisYValueFormatter
      ? ({ value }: any) => ({ children: axisYValueFormatter(value) })
      : undefined;

    return (
      <>
        {showYAxis && (
          <YAxis>
            {yTicks
              ? (
                  <YAxis.Ticks multiline={multilineYTicks} ticks={yTicks}>{childrenY}</YAxis.Ticks>
                )
              : (
                  <YAxis.Ticks multiline={multilineYTicks}>{childrenY}</YAxis.Ticks>
                )}
            <YAxis.Grid ticks={yTicks} />
          </YAxis>
        )}

        {showXAxis && (
          <XAxis>
            {xTicks
              ? (
                  <XAxis.Ticks multiline={multilineXTicks} ticks={xTicks}>{childrenX}</XAxis.Ticks>
                )
              : (
                  <XAxis.Ticks multiline={multilineXTicks}>{childrenX}</XAxis.Ticks>
                )}
            <XAxis.Grid ticks={xTicks} />
          </XAxis>
        )}
      </>
    );
  }

  private getSortedData(data: BubbleChartData) {
    const sortedData = data.toSorted((a, b) => {
      return b.value - a.value;
    });

    const result: BubbleChartInnerData = [];

    sortedData.forEach((dataItem) => {
      const initIndex = data.findIndex((item) => {
        return Object.keys(item).every((key) => {
          // @ts-expect-error
          return item[key] === dataItem[key];
        });
      });

      result.push({
        ...dataItem,
        [uniqKey]: initIndex.toString(),
      });
    });

    return result;
  }
}

/**
 * BubbleChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/bubble-chart/bubble-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/bubble-chart/bubble-chart-code/|Examples}
 */
export const BubbleChart = createComponent<
  BubbleChartType,
  typeof BubbleChartComponent
>(BubbleChartComponent);
