import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { LineChartProps } from './Chart.type';
import { Flex } from '@semcore/flex-box';
import { scaleLinear, scaleTime } from 'd3-scale';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import { makeDataHintsContainer } from '../../a11y/hints';
import ChartLegend from '../ChartLegend';
import { Plot, YAxis, XAxis, Line, minMax, HoverLine } from '../..';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import { Text } from '@semcore/typography';
import { interpolateValue } from '../../utils';

type LineChartState = {
  legendItems: LegendItem[];
  highlightedLine: number;
};

class LineChartComponent extends Component<LineChartProps, {}, LineChartState> {
  static style = {};
  static defaultProps = {
    direction: 'column',
  };

  dataHints = makeDataHintsContainer();

  state = {
    legendItems: this.defaultLegendItems,
    highlightedLine: -1,
  };

  constructor(props: LineChartProps) {
    super(props);

    this.setHighlightedLine = this.setHighlightedLine.bind(this);
    this.handleChangeVisible = this.handleChangeVisible.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.resolveColor = this.resolveColor.bind(this);
    this.tooltipValueFormatter = this.tooltipValueFormatter.bind(this);
  }

  get defaultLegendItems(): LegendItem[] {
    const { data, legendProps, xKey } = this.props;

    return Object.keys(data[0])
      .filter((key) => key !== xKey)
      .map((key) => {
        const legendData = legendProps?.legendMap?.[key];

        const legendItem: LegendItem = {
          id: key,
          label: legendData?.label ?? key,
          icon: legendData?.icon ?? undefined,
          checked: legendData?.defaultChecked ?? true,
          color: this.resolveColor(key),
        };

        if (legendData?.additionalInfo || legendData?.count) {
          legendItem.additionalInfo = legendData.additionalInfo
            ? { label: legendData.additionalInfo }
            : legendData.count
            ? { count: legendData.count }
            : undefined;
        }

        return legendItem;
      });
  }

  get xScale() {
    const { xScale, margin = 30, width, data, xKey } = this.asProps;

    if (xScale) {
      return xScale;
    }

    const testItem = data[0][xKey];
    const range = [margin, width - margin];
    const domain = minMax(data, xKey);

    if (testItem instanceof Date && !isNaN(testItem.getMilliseconds())) {
      return scaleTime(domain, range);
    }

    return scaleLinear(domain, range);
  }

  get yScale() {
    const { yScale, margin = 30, height, data, xKey } = this.asProps;

    const flatValues = data.reduce<Set<number>>((result, item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== xKey && typeof value === 'number') {
          result.add(value);
        }
      });

      return result;
    }, new Set());

    const min = Math.min(...flatValues);
    const max = Math.max(...flatValues);

    return (
      yScale ??
      scaleLinear()
        .range([height - margin, margin])
        .domain([min, max])
    );
  }

  get xTicks() {
    return this.xScale.ticks(this.props.data.length);
  }

  get yTicks() {
    const dataKeys = Object.keys(this.props.data[0]);

    return this.yScale.ticks(dataKeys.length - 1);
  }

  setHighlightedLine(index: number) {
    this.setState({ highlightedLine: index });
  }

  handleChangeVisible(id: string, isVisible: boolean) {
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

  handleMouseEnter(id: string) {
    this.setHighlightedLine(this.state.legendItems.findIndex((line) => line.id === id));
  }

  handleMouseLeave() {
    this.setHighlightedLine(-1);
  }

  resolveColor(id: string) {
    return this.props.colorMap?.[id] ?? '';
  }

  tooltipValueFormatter(value: number | typeof interpolateValue | Date): string {
    const { tooltipValueFormatter } = this.asProps;

    if (tooltipValueFormatter) {
      return tooltipValueFormatter(value);
    }

    return value.toString();
  }

  render() {
    const SChart = Root;
    const {
      styles,
      margin = 30,
      width,
      height,
      data,
      xKey,
      hideLegend,
      legendProps,
      disableDots,
      disableTooltip,
      curve,
    } = this.asProps;

    return sstyled(styles)(
      <SChart render={Flex}>
        {hideLegend !== true && (
          <ChartLegend.Flex
            dataHints={this.dataHints}
            items={this.state.legendItems}
            size={legendProps?.size}
            shape={legendProps?.shape}
            onChangeVisibleItem={
              legendProps?.disableCheckedItems
                ? undefined
                : callAllEventHandlers(legendProps?.onChangeVisibleItem, this.handleChangeVisible)
            }
            onMouseEnterItem={
              legendProps?.disableSelectItems
                ? undefined
                : callAllEventHandlers(legendProps?.onMouseEnterItem, this.handleMouseEnter)
            }
            onMouseLeaveItem={
              legendProps?.disableSelectItems
                ? undefined
                : callAllEventHandlers(legendProps?.onMouseLeaveItem, this.handleMouseLeave)
            }
          />
        )}
        <Plot
          data={data}
          scale={[this.xScale, this.yScale]}
          width={width}
          height={height}
          dataHints={this.dataHints}
        >
          <YAxis>
            <YAxis.Ticks ticks={this.yTicks} />
            <YAxis.Grid ticks={this.yTicks} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={this.xTicks} />
          </XAxis>
          {this.state.legendItems.map((item, index) => {
            return (
              item.checked && (
                <Line
                  x={xKey.toString()}
                  y={item.id}
                  key={item.id}
                  color={this.resolveColor(item.id)}
                  transparent={
                    this.state.highlightedLine !== -1 && this.state.highlightedLine !== index
                  }
                  curve={curve}
                >
                  {disableDots !== true && <Line.Dots display />}
                </Line>
              )
            );
          })}
          {disableTooltip !== true && (
            <HoverLine.Tooltip x={xKey} wMin={100}>
              {({ xIndex }) => {
                return {
                  children: (
                    <>
                      <HoverLine.Tooltip.Title>{data[xIndex][xKey]}</HoverLine.Tooltip.Title>

                      {this.state.legendItems
                        .filter((item) => item.checked)
                        .map((item) => {
                          return (
                            <Flex justifyContent='space-between' key={item.id}>
                              <HoverLine.Tooltip.Dot mr={4} color={item.color}>
                                {item.label}
                              </HoverLine.Tooltip.Dot>
                              <Text bold>{this.tooltipValueFormatter(data[xIndex][item.id])}</Text>
                            </Flex>
                          );
                        })}
                    </>
                  ),
                };
              }}
            </HoverLine.Tooltip>
          )}
        </Plot>
      </SChart>,
    );
  }
}

export const LineChart = createComponent(LineChartComponent);
