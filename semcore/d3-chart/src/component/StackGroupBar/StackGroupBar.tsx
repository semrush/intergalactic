import React from 'react';
import { Component } from '@semcore/core';
import createElement from '../../createElement';
import { getChartDefaultColorName, scaleToBand } from '../../utils';
// @ts-ignore
import Bar, { MIN_HEIGHT } from '../../Bar';
import { type ScaleBand, scaleBand } from 'd3-scale';

import type { StackGroupProps, StackGroupBarProps, StackGroupType } from './StackGroupBar.type';
import { type Stack, stack as d3Stack } from 'd3-shape';

const XY0 = Symbol('XY0');

class StackGroupBarRoot extends Component<StackGroupProps> {
  static displayName = 'StackGroupBar';

  groupDomain = new Set<string>();
  scaleGroup: ScaleBand<any> = scaleBand();
  stacks: Record<string, Stack<any, any, any>> = {};

  static defaultProps = {
    r: 2,
  };

  offsetBars: number[][] = [];

  constructor(props: StackGroupProps) {
    super(props);
    const { children } = props;

    const groups: Record<string, string[]> = {};

    React.Children.toArray(children).forEach((child) => {
      if (React.isValidElement(child) && child.type === StackGroupBar.Bar && !child.props.hide) {
        // fill the domain for groups
        this.groupDomain.add(child.props.group);

        // fill the groups with stacked values
        if (!groups[child.props.group]) {
          groups[child.props.group] = [];
        }

        groups[child.props.group].push(child.props.y);
      }
    });

    Object.entries(groups).forEach(([group, stackKeys]) => {
      this.stacks[group] = d3Stack();
      this.stacks[group].keys(stackKeys);
    });
  }

  componentDidMount() {
    const { scale } = this.asProps;

    this.scaleGroup = scaleBand()
      .range([0, scaleToBand(scale![0]).bandwidth()]) // scale always will be because of CreateElement wrapper
      .domain(this.groupDomain)
      .paddingInner(0.1)
      .paddingOuter(0.1);

    this.forceUpdate();
  }

  getSeries(group: string) {
    const { data } = this.asProps;

    return this.stacks[group]?.(data!); // data always will be because of CreateElement wrapper
  }

  getBarProps({ y, group, hMin = MIN_HEIGHT }: StackGroupBarProps, index: number) {
    const { x, r, scale, maxBarSize = Number.POSITIVE_INFINITY, patterns } = this.asProps;
    const [, yScale] = scale!; // scale always will be because of CreateElement wrapper

    const allGroupSeries = this.getSeries(group);
    const seriesIndex = allGroupSeries.findIndex((s) => s.key === y);
    // or [] if hide bar
    const series = allGroupSeries[seriesIndex] || [];

    const rBar = series.map((s, i) =>
      allGroupSeries.slice(seriesIndex + 1).some((bar) => bar[i][0] !== bar[i][1]) ? 0 : r,
    );

    this.offsetBars[seriesIndex] = this.offsetBars[seriesIndex] ?? [];
    const data = series.map((s) => ({
      ...s.data,
      [y]: s[1],
      [XY0]: s[0],
    }));

    const bandWidth = this.scaleGroup.bandwidth() ?? 0;
    const width = Math.min(bandWidth, maxBarSize);

    const calcOffset = (i: number) => {
      const offsetX = (this.scaleGroup(group) ?? 0) + bandWidth / 2 - width / 2;

      const offsetY = this.offsetBars.reduce(
        (offset, offsetBar) => offset - (offsetBar[i] ?? 0),
        0,
      );
      const d = data[i];
      const absHeight = Math.abs(
        yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[XY0] ?? 0)),
      );

      const isEmptyValue = Number(d[y] - (d[XY0] ?? 0)) === 0;

      if (isEmptyValue || absHeight >= hMin) {
        this.offsetBars[seriesIndex][i] = 0;
      } else {
        const offsetValue = hMin - absHeight;
        this.offsetBars[seriesIndex][i] = d[y] > 0 ? offsetValue : -offsetValue;
      }

      return [offsetX, offsetY];
    };

    const barProps = {
      offset: calcOffset,
      width,
      color: getChartDefaultColorName(index),
      x,
      groupKey: x,
      patterns,
      data,
      hMin,
      y0: XY0,
      r: rBar,
      maxBarSize,
    };

    return barProps;
  }

  render() {
    // @ts-ignore this.Element will always be defined because of `createElement` factory function
    const Element = this.Element;

    this.asProps.dataHintsHandler.establishDataType('grouped-values');

    this.offsetBars = [];

    return <Element aria-hidden render='g' childrenPosition='inside' />;
  }
}

const StackGroupBar: StackGroupType = createElement(StackGroupBarRoot, {
  Bar,
});

export default StackGroupBar;
