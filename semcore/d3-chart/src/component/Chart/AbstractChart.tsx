import { Flex, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Component, Root, sstyled } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import cssToIntDefault from '@semcore/core/lib/utils/cssToIntDefault';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import DiffDown from '@semcore/icon/DiffDown/m';
import DiffUp from '@semcore/icon/DiffUp/m';
import { Text } from '@semcore/typography';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import React, { Fragment } from 'react';

import type { BaseChartProps, BaseLegendProps, ListData, ObjectData } from './AbstractChart.type';
// @ts-ignore
import type { HoverLine, HoverRect } from '../..';
// @ts-ignore
import { Plot, XAxis, YAxis } from '../..';
import { makeDataHintsContainer } from '../../a11y/hints';
import style from '../../style/abstract-chart.shadow.css';
import { interpolateValue } from '../../utils';
import ChartLegend, { ChartLegendTable } from '../ChartLegend';
import type { LegendFlexProps } from '../ChartLegend/LegendFlex/LegendFlex.type';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import type { LegendTableProps } from '../ChartLegend/LegendTable/LegendTable.type';

export type ChartState = {
  dataDefinitions: Array<LegendItem & { columns: React.ReactNode[] }>;
  highlightedItem: number;
  withTrend: boolean;

  plotWidth: number;
  plotHeight: number;
};

export const NOT_A_VALUE = 'n/a';

export abstract class AbstractChart<
  Data extends ListData | ObjectData,
  Props extends BaseChartProps<Data>,
  Enhancers extends readonly ((...args: any[]) => any)[] = [],
  InnerProps = {},
  State extends ChartState = ChartState,
  DefaultProps extends Intergalactic.InternalTypings.ValidDefaultProps<DefaultProps, Props & InnerProps> = never,
> extends Component<Props, Enhancers, Readonly<{}>, InnerProps, State, DefaultProps> {
  public static style = style;

  /**
   * Padding from the end's of chart to the container (except axis sides)
   */
  protected plotPadding = 6;

  protected dataHints = makeDataHintsContainer();

  protected chartRef = React.createRef<HTMLElement>();
  protected legendRef = React.createRef<HTMLDivElement>();

  private observer: ResizeObserver | undefined;

  constructor(props: Props) {
    super(props);

    this.handleResize = trottle(this.handleResize.bind(this));

    if (canUseDOM() && (!props.plotWidth || !props.plotHeight)) {
      this.observer = new ResizeObserver(this.handleResize);
    }

    this.setHighlightedItem = this.setHighlightedItem.bind(this);
    this.handleChangeVisible = this.handleChangeVisible.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.resolveColor = this.resolveColor.bind(this);
    this.tooltipValueFormatter = this.tooltipValueFormatter.bind(this);
    this.handleWithTrendChange = this.handleWithTrendChange.bind(this);

    this.state = {
      dataDefinitions: this.getDefaultDataDefinitions(),
      highlightedItem: -1,
      withTrend: false,
      plotWidth: 0,
      plotHeight: 0,
    } as State;
  }

  public componentDidMount(): void {
    this.observer?.observe(this.chartRef.current!);
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.data !== this.props.data || prevProps.legendProps !== this.props.legendProps) {
      this.setState({ dataDefinitions: this.getDefaultDataDefinitions() });
    }
  }

  public componentWillUnmount(): void {
    this.observer?.disconnect();
  }

  protected get plotWidth() {
    return this.asProps.plotWidth ?? this.state.plotWidth;
  }

  protected get plotHeight() {
    return this.asProps.plotHeight ?? this.state.plotHeight;
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
          <Text key={`${key}_percent`} use='secondary'>
            {percent !== undefined ? `${percent}%` : ''}
          </Text>,
          <Text key={`${key}_value`} use={value ? 'primary' : 'secondary'}>
            {value ?? NOT_A_VALUE}
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

    let allNotAValue = true;

    const total = dataDefinitions.reduce((sum, legendItem) => {
      const item = data[legendItem.id];

      if (item === null) {
        allNotAValue = false;
        return sum;
      }

      if (typeof item === 'number') {
        allNotAValue = false;
        return sum + item;
      }

      if (item instanceof Date && !Number.isNaN(item.getMilliseconds())) {
        allNotAValue = false;
        return sum + item.getMilliseconds();
      }

      return sum;
    }, 0);

    if (allNotAValue) {
      return Number.NaN;
    }

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

  protected setHighlightedItem(index: number) {
    this.setState({ highlightedItem: index });
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
    this.setHighlightedItem(this.state.dataDefinitions.findIndex((line) => line.id === id));
  }

  protected handleMouseLeave() {
    this.setHighlightedItem(-1);
  }

  protected resolveColor(id: string, index: number) {
    return this.props.colorMap?.[id] ?? `chart-palette-order-${index + 1}`;
  }

  protected defaultTooltipFormatter(value?: unknown): string {
    const { locale } = this.asProps;

    if (value === undefined || value === interpolateValue) {
      return NOT_A_VALUE;
    }

    if (value === null) {
      return '0';
    }

    if (value instanceof Date) {
      return new Intl.DateTimeFormat(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(value);
    }

    if (typeof value === 'number' && !Number.isNaN(value)) {
      return Number.isInteger(value) ? `${value}` : value.toFixed(1);
    }

    return value.toString();
  }

  protected tooltipValueFormatter(value?: unknown): string {
    const { tooltipValueFormatter } = this.asProps;

    if (tooltipValueFormatter) return tooltipValueFormatter(value);

    return this.defaultTooltipFormatter(value);
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    return {
      legendType: 'Flex',
    };
  }

  protected renderLegend() {
    const { legendProps, direction, showLegend, patterns } = this.asProps;

    if (
      // we hide Legend for one item on chart except not manually set to show.
      showLegend === undefined && this.dataKeys.length === 1 ||
      showLegend === false
    ) {
      return null;
    }

    const { dataDefinitions, withTrend, highlightedItem } = this.state;
    const lProps = {
      ...this.defaultLegendProps(),
      ...legendProps,
    };

    const commonLegendProps: (LegendFlexProps | LegendTableProps) & { highlightedItem: State['highlightedItem'] } = {
      highlightedItem,
      'dataHints': this.dataHints,
      'items': dataDefinitions,
      'size': lProps.size,
      'shape': lProps.shape,
      'w': lProps.w,
      'h': lProps.h,
      patterns,
      'direction':
        lProps.direction ?? (direction === 'row' || direction === 'row-reverse' ? 'column' : 'row'),
      'onChangeVisibleItem': lProps.disableSelectItems
        ? undefined
        : callAllEventHandlers(lProps.onChangeVisibleItem, this.handleChangeVisible),
      'onMouseEnterItem': lProps.disableHoverItems
        ? undefined
        : callAllEventHandlers(lProps.onMouseEnterItem, this.handleMouseEnter),
      'onMouseLeaveItem': lProps.disableHoverItems
        ? undefined
        : callAllEventHandlers(lProps.onMouseLeaveItem, this.handleMouseLeave),
      'aria-label': this.getLegendAriaLabel(),
    };

    if (lProps.legendType === 'Table') {
      return <ChartLegendTable {...(commonLegendProps as LegendTableProps)} ref={this.legendRef} />;
    }

    if ('withTrend' in lProps) {
      const flexLegendProps = {
        ...commonLegendProps,
        withTrend: true,
        trendLabel: lProps.trendLabel,
        trendIsVisible: withTrend,
        onTrendIsVisibleChange: this.handleWithTrendChange,
      };

      return <ChartLegend {...(flexLegendProps as LegendFlexProps)} ref={this.legendRef} />;
    }

    return <ChartLegend {...(commonLegendProps as LegendFlexProps)} ref={this.legendRef} />;
  }

  protected renderAxis(): React.ReactNode {
    const {
      invertAxis,
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
            {invertAxis !== true && (yTicks ? <YAxis.Grid ticks={yTicks} /> : <YAxis.Grid />)}
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
            {invertAxis === true && (xTicks ? <XAxis.Grid ticks={xTicks} /> : <XAxis.Grid />)}
          </XAxis>
        )}
      </>
    );
  }

  protected getPercentDelta(key: string, index: number) {
    if (index === 0) return null;

    const { data } = this.asProps;

    if (!Array.isArray(data)) return null;

    const prev = data[index - 1][key];
    const curr = data[index][key];

    if (typeof prev !== 'number' || typeof curr !== 'number') return null;

    if (prev === 0) return curr === 0 ? 0 : null;

    const percent = ((curr - prev) / prev) * 100;

    return Number(percent.toFixed(1));
  }

  protected getTooltipChildren<D extends ObjectData>(options: {
    Tooltip: typeof HoverLine['Tooltip'] | typeof HoverRect['Tooltip'];
    dataItem: D;
    index: number;
  }) {
    const STooltipChildrenWrapper = Box;
    const { Tooltip, dataItem, index } = options;

    const { styles, groupKey, showDeltaPercentInTooltip } = this.asProps;
    const { dataDefinitions } = this.state;
    const title = this.defaultTooltipFormatter(dataItem[groupKey as keyof D]);

    const percentDeltas = showDeltaPercentInTooltip
      ? dataDefinitions.map(({ id }) => this.getPercentDelta(id, index))
      : [];
    const hasNoPercentDeltas = percentDeltas.length === 0 || percentDeltas.every((value) => value === null);

    return sstyled(styles)(
      <Flex direction='column'>
        { title && <Tooltip.Title>{title}</Tooltip.Title> }

        <STooltipChildrenWrapper
          // @ts-ignore
          columnsCount={hasNoPercentDeltas ? 2 : 3}
        >
          {dataDefinitions.map((item, idx) => {
            const delta = percentDeltas[idx] ?? null;

            return (
              item.checked && (
                <Fragment key={item.id}>
                  <Tooltip.Dot mr={2} color={item.color}>
                    {item.label}
                  </Tooltip.Dot>
                  <Text textAlign='end' bold>{this.tooltipValueFormatter(dataItem[item.id] as string)}</Text>
                  {this.renderTooltipPercentDelta(delta)}
                </Fragment>
              )
            );
          })}

          {this.renderTooltipTotalLine(dataItem)}
        </STooltipChildrenWrapper>
      </Flex>,
    );
  }

  protected renderTooltipPercentDelta(delta: number | null) {
    if (delta === null) return null;

    const { styles } = this.asProps;
    const STooltipDeltaWrapper = Flex;
    let STooltipDeltaIcon = DiffDown;

    const trend: 'upward' | 'downward' | 'stable' = delta !== 0
      ? delta > 0
        ? 'upward'
        : 'downward'
      : 'stable';

    if (delta > 0) STooltipDeltaIcon = DiffUp;

    return sstyled(styles)(
      <STooltipDeltaWrapper
        // @ts-ignore
        trend={trend}
      >
        {delta !== 0 && <STooltipDeltaIcon width={8.5} height={8.5} />}
        <Text size={100}>{ delta && `${delta}%`}</Text>
      </STooltipDeltaWrapper>,
    );
  }

  protected renderTooltipTotalLine<D extends ObjectData>(dataItem: D) {
    const { showTotalInTooltip } = this.asProps;

    if (!showTotalInTooltip) {
      return null;
    }

    const total = this.totalValue(dataItem);

    return (
      <>
        <Box mt={2} mr={2}>Total</Box>
        <Text mt={2} textAlign='end' bold>{Number.isNaN(total) ? NOT_A_VALUE : this.tooltipValueFormatter(total)}</Text>
      </>
    );
  }

  public render() {
    const SChart = Root;
    const { styles, data, patterns, a11yAltTextConfig, duration, eventEmitter, showTooltip, locale } =
      this.asProps;
    const { plotWidth, plotHeight } = this;

    const { extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <SChart render={Flex} gap={5} __excludeProps={['data', 'eventEmitter']} role='group' ref={this.chartRef}>
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
          eventEmitter={eventEmitter}
          locale={locale}
          {...extractedAriaProps}
        >
          {this.renderAxis()}
          {!showTooltip ? null : this.renderTooltip()}
          {this.renderChart()}
        </Plot>
      </SChart>,
    );
  }

  private handleResize(entities: ResizeObserverEntry[]) {
    const { aspect, direction, onResize, plotWidth, plotHeight } = this.asProps;
    const chartElement = this.chartRef.current;

    if (!chartElement) return;

    const legendElement = this.legendRef.current;
    const computedStyles = window.getComputedStyle(chartElement);

    let width: number = chartElement.clientWidth;
    let height: number = chartElement.clientHeight;

    if (legendElement) {
      const gap: number = cssToIntDefault(computedStyles.gap, 0);
      if (direction?.includes('column')) {
        height = height - legendElement.clientHeight - gap;
      } else {
        width = width - legendElement.clientWidth - gap;
      }
    }

    if (aspect) {
      const minHeight = cssToIntDefault(computedStyles.getPropertyValue('min-height'), -1);
      const maxHeight = cssToIntDefault(computedStyles.getPropertyValue('max-height'), -1);
      height = width / aspect;

      if (minHeight !== -1 && height < minHeight) {
        height = minHeight;
      }
      if (maxHeight !== -1 && height > maxHeight) {
        height = maxHeight;
      }
    }

    this.setState({
      plotWidth: plotWidth ? 0 : width,
      plotHeight: plotHeight ? 0 : height,
    });

    onResize?.([width, height], entities);
  }
}
