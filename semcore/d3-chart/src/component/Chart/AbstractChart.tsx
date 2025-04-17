import { makeDataHintsContainer } from '../../a11y/hints';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { interpolateValue } from '../../utils';
import React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { BaseChartProps, BaseLegendProps, ListData, ObjectData } from './AbstractChart.type';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import ChartLegend, { ChartLegendTable } from '../ChartLegend';
import { Flex } from '@semcore/flex-box';
// @ts-ignore
import { Plot, XAxis, YAxis } from '../..';
import { Text } from '@semcore/typography';
import { LegendFlexProps } from '../ChartLegend/LegendFlex/LegendFlex.type';
import { LegendTableProps } from '../ChartLegend/LegendTable/LegendTable.type';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';

type ChartState = {
  dataDefinitions: Array<LegendItem & { columns: React.ReactNode[] }>;
  highlightedLine: number;
  withTrend: boolean;
};

export abstract class AbstractChart<
  D extends ListData | ObjectData,
  T extends BaseChartProps<D>,
  E extends readonly ((...args: any[]) => any)[] = [],
> extends Component<T, {}, ChartState, E> {
  public static style = {};
  public static defaultProps: Partial<BaseChartProps<any>> = {
    direction: 'column',
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    showLegend: true,
  };

  /**
   * Padding from the end's of chart to the container (except axis sides)
   */
  protected plotPadding = 6;

  protected dataHints = makeDataHintsContainer();

  public state: ChartState = {
    dataDefinitions: this.getDefaultDataDefinitions(),
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
      this.setState({ dataDefinitions: this.getDefaultDataDefinitions() });
    }
  }

  protected getDefaultDataDefinitions(): Array<LegendItem & { columns: React.ReactNode[] }> {
    const { data, legendProps } = this.props;

    return this.dataKeys.map((key, index) => {
      const legendData = legendProps?.legendMap?.[key];

      const dataDefinition: LegendItem & { columns: React.ReactNode[] } = {
        id: key,
        label: legendData?.label ?? key,
        icon: legendData?.icon ?? undefined,
        checked: legendData?.defaultChecked ?? true,
        color: this.resolveColor(key, index),
        columns: [],
      };

      if (legendData?.additionalInfo || legendData?.count) {
        dataDefinition.additionalInfo = legendData.additionalInfo
          ? { label: legendData.additionalInfo }
          : legendData.count
          ? { count: legendData.count }
          : undefined;
      }

      if (legendData && 'columns' in legendData) {
        dataDefinition.columns = legendData.columns || [];
      } else if (!Array.isArray(data)) {
        let value: number | undefined = undefined;
        let dataValue = data[key];

        if (data instanceof Map) {
          dataValue = data.get(key);
        }

        if (dataValue !== interpolateValue) {
          value = Number(dataValue);
        }

        const total = Object.values(data).reduce<number>((sum, i) => {
          if (i !== interpolateValue) {
            return sum + Number(i);
          }

          return sum;
        }, 0);
        const percent = value !== undefined ? ((value / total) * 100).toFixed(2) : undefined;

        dataDefinition.columns = [
          <Text key={`${key}_percent`} use={'secondary'}>
            {percent !== undefined ? `${percent}%` : ''}
          </Text>,
          <Text key={`${key}_value`} use={value ? 'primary' : 'secondary'}>
            {value ?? 'n/a'}
          </Text>,
        ];
      }

      return dataDefinition;
    });
  }

  protected abstract get xScale(): ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>;
  protected abstract get yScale(): ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>;

  protected abstract getLegendAriaLabel(): string;
  protected abstract renderChart(): React.ReactNode;
  protected abstract renderTooltip(): React.ReactNode;

  protected get dataKeys(): string[] {
    const { data, groupKey } = this.props;

    let dataKeys: string[];

    if (Array.isArray(data) && groupKey) {
      dataKeys = Object.keys(data[0]).filter((key) => key !== groupKey);
    } else {
      dataKeys = Object.keys(data);
    }

    return dataKeys;
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

        if (val instanceof Date && !Number.isNaN(val.getMilliseconds())) {
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

  protected totalValue(data: ObjectData): number {
    const { dataDefinitions } = this.state;

    const total = dataDefinitions.reduce((sum, legendItem) => {
      const item = data[legendItem.id];

      if (typeof item === 'number') {
        return sum + item;
      }

      if (item instanceof Date && !Number.isNaN(item.getMilliseconds())) {
        return sum + item.getMilliseconds();
      }

      return sum;
    }, 0);

    return total;
  }

  protected getValueScale(values: number[]): number {
    const max = Math.max(...values);
    const min = Math.min(...values);

    const avg = (max + min) / 2;
    const count = Math.round(Math.log10(avg));

    const valueScale = 100 / 10 ** count;

    return valueScale;
  }

  protected setHighlightedLine(index: number) {
    this.setState({ highlightedLine: index });
  }

  protected handleChangeVisible(id: string, isVisible: boolean) {
    this.setState((prevState) => {
      const dataDefinitions = prevState.dataDefinitions.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });

      return { dataDefinitions };
    });
  }

  protected handleWithTrendChange(isVisible: boolean) {
    this.setState({ withTrend: isVisible });
  }

  protected handleMouseEnter(id: string) {
    this.setHighlightedLine(this.state.dataDefinitions.findIndex((line) => line.id === id));
  }

  protected handleMouseLeave() {
    this.setHighlightedLine(-1);
  }

  protected resolveColor(id: string, index: number) {
    return this.props.colorMap?.[id] ?? `chart-palette-order-${index + 1}`;
  }

  protected tooltipValueFormatter(
    value?: string | number | typeof interpolateValue | Date,
  ): string {
    const { tooltipValueFormatter } = this.asProps;

    if (tooltipValueFormatter) {
      return tooltipValueFormatter(value);
    }

    if (value === undefined || value === interpolateValue) {
      return 'n/a';
    }

    if (value === null) {
      return '0';
    }

    if (value instanceof Date) {
      return value.toDateString();
    }

    return value.toString();
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    return {
      legendType: 'Flex',
    };
  }

  protected renderLegend() {
    const { legendProps, direction, showLegend, patterns } = this.asProps;

    if (
      !showLegend ||
      // we hide Legend for one item on chart except not manually set to show.
      (this.dataKeys.length === 1 && showLegend === true)
    ) {
      return null;
    }

    const { dataDefinitions, withTrend } = this.state;
    const lProps = {
      ...this.defaultLegendProps(),
      ...legendProps,
    };

    const commonLegendProps: LegendFlexProps | LegendTableProps = {
      dataHints: this.dataHints,
      items: dataDefinitions,
      size: lProps.size,
      shape: lProps.shape,
      w: lProps.w,
      h: lProps.h,
      patterns,
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
      'aria-label': this.getLegendAriaLabel(),
    };

    if (lProps.legendType === 'Table') {
      return <ChartLegendTable {...(commonLegendProps as LegendTableProps)} />;
    }

    if ('withTrend' in lProps) {
      const flexLegendProps = {
        ...commonLegendProps,
        withTrend: true,
        trendLabel: lProps.trendLabel,
        trendIsVisible: withTrend,
        onTrendIsVisibleChange: this.handleWithTrendChange,
      };

      return <ChartLegend {...(flexLegendProps as LegendFlexProps)} />;
    }

    return <ChartLegend {...(commonLegendProps as LegendFlexProps)} />;
  }

  protected renderAxis(): React.ReactNode {
    const { invertAxis, showXAxis, showYAxis, data, axisXValueFormatter, axisYValueFormatter } =
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
        {showYAxis && (
          <YAxis>
            {yTicks ? (
              <YAxis.Ticks ticks={yTicks}>{childrenY}</YAxis.Ticks>
            ) : (
              <YAxis.Ticks>{childrenY}</YAxis.Ticks>
            )}
            {invertAxis !== true && (yTicks ? <YAxis.Grid ticks={yTicks} /> : <YAxis.Grid />)}
          </YAxis>
        )}

        {showXAxis && (
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
    const { styles, plotWidth, plotHeight, data, patterns, a11yAltTextConfig, duration } =
      this.asProps;

    const { extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <SChart render={Flex} gap={5} __excludeProps={['data']} role={'group'}>
        {this.renderLegend()}
        <Plot
          data={data}
          scale={[this.xScale, this.yScale]}
          width={plotWidth}
          height={plotHeight}
          dataHints={this.dataHints}
          a11yAltTextConfig={a11yAltTextConfig}
          patterns={patterns}
          duration={duration}
          {...extractedAriaProps}
        >
          {this.renderAxis()}
          {this.renderTooltip()}
          {this.renderChart()}
        </Plot>
      </SChart>,
    );
  }
}
