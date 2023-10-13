import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { LineChartProps } from './Chart.type';
import { Flex } from '@semcore/flex-box';
import { scaleLinear } from 'd3-scale';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import { makeDataHintsContainer } from '../../a11y/hints';
import ChartLegend from '../ChartLegend';
import { Plot, YAxis, XAxis, Line, minMax } from '../..';

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
  }

  get defaultLegendItems() {
    const { data, legendMap, xKey } = this.props;

    return Object.keys(data[0])
      .filter((key) => key !== xKey)
      .map((key) => {
        const legendData = legendMap?.[key];

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

    return (
      xScale ??
      scaleLinear()
        .range([margin, width - margin])
        .domain(minMax(data, xKey))
    );
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

  render() {
    const SChart = Root;
    const { styles, margin = 30, width, height, data, xKey } = this.asProps;

    return sstyled(styles)(
      <SChart render={Flex}>
        <ChartLegend.Flex
          dataHints={this.dataHints}
          items={this.state.legendItems}
          onChangeVisibleItem={this.handleChangeVisible}
          onMouseEnterItem={this.handleMouseEnter}
          onMouseLeaveItem={this.handleMouseLeave}
        />
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
                >
                  <Line.Dots display />
                </Line>
              )
            );
          })}
        </Plot>
      </SChart>,
    );
  }
}

export const LineChart = createComponent(LineChartComponent);
