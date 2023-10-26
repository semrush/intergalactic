import { makeDataHintsContainer } from '../../a11y/hints';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { interpolateValue } from '../../utils';
import React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { BaseChartProps, BaseLegendProps } from './AbstractChart.type';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import ChartLegend from '../ChartLegend';
import { Flex } from '@semcore/flex-box';
// @ts-ignore
import { Plot, XAxis, YAxis } from '../..';
import { Text } from '@semcore/typography';
import { LegendFlexProps } from '../ChartLegend/LegendFlex/LegendFlex.type';

type ChartState = {
  legendItems: Array<LegendItem & { columns: React.ReactNode[] }>;
  highlightedLine: number;
  withTrend: boolean;
};

export abstract class AbstractChart<T extends BaseChartProps> extends Component<T, {}, ChartState> {
  public static style = {};
  public static defaultProps: Partial<BaseChartProps> = {
    direction: 'column',
  };

  /**
   * Padding from the end's of chart to the container (except axis sides)
   */
  protected plotPadding = 6;

  protected dataHints = makeDataHintsContainer();

  public state: ChartState = {
    legendItems: this.defaultLegendItems,
    highlightedLine: -1,
    withTrend: false,
  };

  constructor(props: T) {
    super(props);

    this.setHighlightedLine = this.setHighlightedLine.bind(this);
    this.handleChangeVisible = this.handleChangeVisible.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.resolveColor = this.resolveColor.bind(this);
    this.tooltipValueFormatter = this.tooltipValueFormatter.bind(this);
    this.handleWithTrendChange = this.handleWithTrendChange.bind(this);
  }

  public componentDidUpdate(prevProps: T) {
    if (prevProps.data !== this.props.data || prevProps.legendProps !== this.props.legendProps) {
      this.setState({ legendItems: this.defaultLegendItems });
    }
  }

  protected get defaultLegendItems(): Array<LegendItem & { columns: React.ReactNode[] }> {
    const { data, legendProps } = this.props;

    return this.legendKeys.map((key) => {
      const legendData = legendProps?.legendMap?.[key];

      const legendItem: LegendItem & { columns: React.ReactNode[] } = {
        id: key,
        label: legendData?.label ?? key,
        icon: legendData?.icon ?? undefined,
        checked: legendData?.defaultChecked ?? true,
        color: this.resolveColor(key),
        columns: [],
      };

      if (legendData?.additionalInfo || legendData?.count) {
        legendItem.additionalInfo = legendData.additionalInfo
          ? { label: legendData.additionalInfo }
          : legendData.count
          ? { count: legendData.count }
          : undefined;
      }

      if (legendData && 'columns' in legendData) {
        legendItem.columns = legendData.columns || [];
      } else if (!Array.isArray(data)) {
        const value = (data instanceof Map ? data.get(key) : Number(data[key])) ?? 0;
        const total = Object.values(data).reduce<number>((sum, i) => sum + Number(i), 0);
        const percent = ((value / total) * 100).toFixed(2);

        legendItem.columns = [
          <Text key={`${key}_percent`} use={'secondary'}>
            {percent}%
          </Text>,
          <Text key={`${key}_value`} use={'primary'}>
            {value}
          </Text>,
        ];
      }

      return legendItem;
    });
  }

  protected abstract get xScale(): ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>;
  protected abstract get yScale(): ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>;

  protected abstract renderChart(): React.ReactNode;
  protected abstract renderTooltip(): React.ReactNode;

  protected get legendKeys(): string[] {
    const { data, groupKey } = this.props;

    let legendKeys: string[];

    if (Array.isArray(data) && groupKey) {
      legendKeys = Object.keys(data[0]).filter((key) => key !== groupKey);
    } else {
      legendKeys = Object.keys(data);
    }

    return legendKeys;
  }

  protected get xTicks(): number[] | Date[] | undefined {
    const { data, invertAxis, xTicksCount, yTicksCount } = this.asProps;

    const scale = this.xScale;

    if (Array.isArray(data) && 'ticks' in scale) {
      if (invertAxis && yTicksCount) {
        return scale.ticks(yTicksCount);
      } else if (xTicksCount) {
        return scale.ticks(xTicksCount);
      }

      return undefined;
    }

    return undefined;
  }

  protected get yTicks(): number[] | Date[] | undefined {
    const { data, invertAxis, xTicksCount, yTicksCount } = this.asProps;

    const scale = this.yScale;

    if (Array.isArray(data) && 'ticks' in scale) {
      if (invertAxis && xTicksCount) {
        return scale.ticks(xTicksCount);
      } else if (yTicksCount) {
        return scale.ticks(yTicksCount);
      }

      return undefined;
    }

    return undefined;
  }

  protected get flatValues(): Set<number> {
    const { data, groupKey } = this.asProps;
    const values: any[] = Array.isArray(data) ? data : Object.values(data);

    const flatValues = values.reduce<Set<number>>((result, item) => {
      if (!groupKey && typeof item === 'number') {
        result.add(item);
      } else {
        Object.entries(item).forEach(([key, value]) => {
          if (key !== groupKey && typeof value === 'number') {
            result.add(value);
          }
        });
      }

      return result;
    }, new Set());

    return flatValues;
  }

  protected get maxStackedValue(): number {
    const { data, groupKey } = this.asProps;

    if (!Array.isArray(data)) {
      const max = Object.values(data).reduce<number>((sum, val) => {
        if (typeof val === 'number') {
          sum = sum + val;
        }

        return sum;
      }, 0);

      return max;
    }

    const max = data.reduce((max, item) => {
      const barSum = Object.entries(item).reduce<number>((sum, [key, val]) => {
        if (key === groupKey) {
          return sum;
        }

        if (typeof val === 'number') {
          return sum + val;
        }

        if (val instanceof Date && !isNaN(val.getMilliseconds())) {
          return sum + val.getMilliseconds();
        }

        return sum;
      }, 0);

      if (barSum > max) {
        max = barSum;
      }

      return max;
    }, 0);

    return max;
  }

  protected setHighlightedLine(index: number) {
    this.setState({ highlightedLine: index });
  }

  protected handleChangeVisible(id: string, isVisible: boolean) {
    this.setState((prevState) => {
      const legendItems = prevState.legendItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });

      return { legendItems };
    });
  }

  protected handleWithTrendChange(isVisible: boolean) {
    this.setState({ withTrend: isVisible });
  }

  protected handleMouseEnter(id: string) {
    this.setHighlightedLine(this.state.legendItems.findIndex((line) => line.id === id));
  }

  protected handleMouseLeave() {
    this.setHighlightedLine(-1);
  }

  protected resolveColor(id: string) {
    return this.props.colorMap?.[id] ?? '';
  }

  protected tooltipValueFormatter(
    value?: string | number | typeof interpolateValue | Date,
  ): string {
    const { tooltipValueFormatter } = this.asProps;

    if (tooltipValueFormatter) {
      return tooltipValueFormatter(value);
    }

    return value !== undefined ? value.toString() : 'n/a';
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    return {
      legendType: 'Flex',
    };
  }

  protected renderLegend() {
    const { legendProps, direction, hideLegend } = this.asProps;

    if (hideLegend) {
      return null;
    }

    const { legendItems, withTrend } = this.state;
    const lProps = {
      ...this.defaultLegendProps(),
      ...legendProps,
    };

    const commonLegendProps = {
      dataHints: this.dataHints,
      items: legendItems,
      size: lProps.size,
      shape: lProps.shape,
      direction:
        lProps.direction ?? (direction === 'row' || direction === 'row-reverse' ? 'column' : 'row'),
      onChangeVisibleItem: lProps.disableSelectItems
        ? undefined
        : callAllEventHandlers(lProps.onChangeVisibleItem, this.handleChangeVisible),
      onMouseEnterItem: lProps.disableHoverItems
        ? undefined
        : callAllEventHandlers(lProps.onMouseEnterItem, this.handleMouseEnter),
      onMouseLeaveItem: lProps.disableHoverItems
        ? undefined
        : callAllEventHandlers(lProps.onMouseLeaveItem, this.handleMouseLeave),
    };

    if (lProps.legendType === 'Table') {
      return <ChartLegend.Table {...commonLegendProps} />;
    }

    if ('withTrend' in lProps) {
      const flexLegendProps: LegendFlexProps = {
        ...commonLegendProps,
        withTrend: true,
        trendLabel: lProps.trendLabel ?? 'Trend',
        trendIsVisible: withTrend,
        onTrendIsVisibleChange: this.handleWithTrendChange,
      };

      return <ChartLegend.Flex {...flexLegendProps} />;
    }

    return <ChartLegend.Flex {...commonLegendProps} />;
  }

  protected renderAxis(): React.ReactNode {
    const { invertAxis, hideXAxis, hideYAxis, data, axisXValueFormatter, axisYValueFormatter } =
      this.asProps;

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
        {hideYAxis !== true && (
          <YAxis>
            {yTicks ? (
              <YAxis.Ticks ticks={yTicks}>{childrenY}</YAxis.Ticks>
            ) : (
              <YAxis.Ticks>{childrenY}</YAxis.Ticks>
            )}
            {invertAxis !== true && (yTicks ? <YAxis.Grid ticks={yTicks} /> : <YAxis.Grid />)}
          </YAxis>
        )}

        {hideXAxis !== true && (
          <XAxis>
            {xTicks ? (
              <XAxis.Ticks ticks={xTicks}>{childrenX}</XAxis.Ticks>
            ) : (
              <XAxis.Ticks>{childrenX}</XAxis.Ticks>
            )}
            {invertAxis === true && (xTicks ? <XAxis.Grid ticks={xTicks} /> : <XAxis.Grid />)}
          </XAxis>
        )}
      </>
    );
  }

  public render() {
    const SChart = Root;
    const { styles, plotWidth, plotHeight, data } = this.asProps;

    return sstyled(styles)(
      <SChart render={Flex} gap={5}>
        {this.renderLegend()}
        <Plot
          data={data}
          scale={[this.xScale, this.yScale]}
          width={plotWidth}
          height={plotHeight}
          dataHints={this.dataHints}
        >
          {this.renderAxis()}
          {this.renderChart()}
          {this.renderTooltip()}
        </Plot>
      </SChart>,
    );
  }
}
