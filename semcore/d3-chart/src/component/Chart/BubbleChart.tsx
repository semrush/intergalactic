import { Box, Flex } from '@semcore/base-components';
import { createComponent, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import { scaleLinear, type ScaleLinear } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Bubble, calculateBubbleDomain, YAxis as YAxisOld, XAxis as XAxisOld, Tooltip } from '../..';
import { XAxis } from '../Axis/XAxis';
import { YAxis } from '../Axis/YAxis';
import { Grid } from '../Grid/Grid';
import { HoverLine } from '../Hover/HoverLine';
import { AbstractAxisChart } from './AbstractChart/AbstractAxisChart';
import type { ChartState } from './AbstractChart/AbstractChart';
import { AbstractChart } from './AbstractChart/AbstractChart';
import type { BubbleChartData, BubbleChartProps, BubbleChartType, BubbleChartDefaultProps } from './BubbleChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

const uniqKey = Symbol('uniqKey');

type BubbleChartInnerData = Array<BubbleChartData[number] & { [uniqKey]: string }>;

class BubbleChartComponent extends AbstractAxisChart<
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
    const { xScale, marginY = 0, data } = this.asProps;
    const { plotWidth } = this;

    if (xScale) {
      return xScale;
    }

    const range = [marginY, plotWidth - this.plotPadding];
    const domain = calculateBubbleDomain(data, 'x', range);

    return scaleLinear().domain(domain).range(range);
  }

  override get yScale(): ScaleLinear<any, any> {
    const { yScale, marginX = 0, data } = this.asProps;
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
                hovered={highlightedItem !== -1 && highlightedItem.toString() === dataDefinition.id}
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
      <Tooltip>
        {(props: any) => {
          const { index, data } = props;
          const { styles } = this.asProps;
          const STooltipChildrenWrapper = Box;

          return {
            children: sstyled(styles)(
              <Flex direction='column'>
                <Tooltip.Title>Data</Tooltip.Title>
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
      </Tooltip>
    );
  }

  protected override renderYAxis(): React.ReactNode {
    const { yTicksCount, showYAxis, axisYValueFormatter, yAxisPosition } = this.asProps;

    if (!showYAxis) {
      return null;
    }

    return (
      <YAxis
        ref={this.yAxisRef}
        uid={this.plotId}
        data={this.data}
        plotBoundaryRect={this.plotBoundaryRect}
        dataKey='y'
        scale={this.yScale}
        ticksCount={yTicksCount}
        valueFormatter={axisYValueFormatter ?? this.valueFormatter}
        yAxisPosition={yAxisPosition}
        eventEmitter={this.eventEmitter}
        onMouseMove={() => false}
      />
    );
  }

  protected override renderXAxis(): React.ReactNode {
    const { xTicksCount, showXAxis, axisXValueFormatter } = this.asProps;

    if (!showXAxis) {
      return null;
    }

    return (
      <XAxis
        ref={this.xAxisRef}
        uid={this.plotId}
        plotBoundaryRect={this.plotBoundaryRect}
        data={this.data}
        dataKey='x'
        scale={this.xScale}
        ticksCount={xTicksCount}
        valueFormatter={axisXValueFormatter ?? this.valueFormatter}
        eventEmitter={this.eventEmitter}
        onMouseMove={() => false}
      />
    );
  }

  protected override getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Bubble' });
  }

  protected override renderGrid(): React.ReactNode {
    const {
      showXAxis,
      showYAxis,
      yTicksCount,
      xTicksCount,
    } = this.asProps;

    return (
      <>
        {showYAxis && (
          <>
            <Grid scale={[this.xScale, this.yScale]} orientation='horizontal' dataHintsHandler={this.dataHintsHandlers} ticksCount={yTicksCount} />
            <HoverLine
              uid={this.plotId}
              data={this.data}
              keyX='x'
              scale={[this.xScale, this.yScale]}
              eventEmitter={this.eventEmitter}
            />
          </>
        )}
        {showXAxis && (
          <>
            <Grid scale={[this.xScale, this.yScale]} orientation='vertical' dataHintsHandler={this.dataHintsHandlers} ticksCount={xTicksCount} />
            <HoverLine
              uid={this.plotId}
              data={this.data}
              keyY='y'
              scale={[this.xScale, this.yScale]}
              eventEmitter={this.eventEmitter}
            />
          </>
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

  protected override handleMouseMoveChartContainer() {
    return false;
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
