import React from 'react';
import { stack as d3Stack } from 'd3-shape';
import { Component } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import createElement from './createElement';
import Bar, { MIN_HEIGHT } from './Bar';
import HorizontalBar, { MIN_WIDTH } from './HorizontalBar';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');
const XY0 = Symbol('XY0');

class StackBarRoot extends Component {
  static displayName = 'StackBar';

  static defaultProps = () => {
    const stack = d3Stack();
    stack[DEFAULT_INSTANCE] = true;
    return { stack, r: 2 };
  };

  offsetBars = [];

  getSeries() {
    const { Children, data, stack } = this.asProps;

    if (stack[DEFAULT_INSTANCE]) {
      const keys = React.Children.toArray(getOriginChildren(Children)).reduce((acc, child) => {
        if (React.isValidElement(child) && child.type === StackBar.Bar && !child.props.hide) {
          acc.push(child.props.y);
        }
        if (
          React.isValidElement(child) &&
          child.type === StackBar.HorizontalBar &&
          !child.props.hide
        ) {
          acc.push(child.props.x);
        }
        return acc;
      }, []);
      stack.keys(keys);
    }

    return stack(data);
  }

  getBarProps({ y, hMin = MIN_HEIGHT }) {
    const { x, r, scale } = this.asProps;
    const [, yScale] = scale;

    const seriesIndex = this.series.findIndex((s) => s.key === y);
    // or [] if hide bar
    const series = this.series[seriesIndex] || [];

    const rBar = series.map((s, i) =>
      this.series.slice(seriesIndex + 1).some((bar) => bar[i][0] !== bar[i][1]) ? 0 : r,
    );

    this.offsetBars[seriesIndex] = this.offsetBars[seriesIndex] ?? [];
    const data = series.map((s) => ({
      ...s.data,
      [y]: s[1],
      [XY0]: s[0],
    }));

    const calcOffset = (i) => {
      const offset = this.offsetBars.reduce((offset, offsetBar) => offset - (offsetBar[i] ?? 0), 0);
      const d = data[i];
      const absHeight = Math.abs(
        yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[XY0] ?? 0)),
      );
      this.offsetBars[seriesIndex][i] =
        Number(d[y] - (d[XY0] ?? 0)) === 0 ? 0 : absHeight >= hMin ? 0 : d[y] > 0 ? hMin : -hMin;
      return [0, offset];
    };

    return {
      data,
      hMin,
      y0: XY0,
      x,
      r: rBar,
      groupKey: x,
      offset: calcOffset,
    };
  }

  getHorizontalBarProps({ x, wMin = MIN_WIDTH }) {
    const { y, r, scale } = this.asProps;
    const [xScale] = scale;

    const seriesIndex = this.series.findIndex((s) => s.key === x);
    const series = this.series[seriesIndex];

    const rBar = series.map((s, i) =>
      this.series.slice(seriesIndex + 1).some((bar) => bar[i][0] !== bar[i][1]) ? 0 : r,
    );

    this.offsetBars[seriesIndex] = this.offsetBars[seriesIndex] ?? [];
    const data = series.map((s) => ({
      ...s.data,
      [x]: s[1],
      [XY0]: s[0],
    }));

    const calcOffset = (i) => {
      const offset = this.offsetBars.reduce((offset, offsetBar) => offset - (offsetBar[i] ?? 0), 0);
      const d = data[i];
      const absWidth = Math.abs(
        xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[XY0] ?? 0)),
      );
      this.offsetBars[seriesIndex][i] =
        Number(d[x] - (d[XY0] ?? 0)) === 0 ? 0 : absWidth >= wMin ? 0 : d[x] > 0 ? -wMin : wMin;
      return [offset, 0];
    };

    return {
      data,
      wMin,
      x0: XY0,
      y,
      r: rBar,
      groupKey: y,
      offset: calcOffset,
    };
  }

  render() {
    const Element = this.Element;
    this.series = this.getSeries();

    this.asProps.dataHintsHandler.establishDataType('grouped-values');

    this.offsetBars = [];

    return <Element aria-hidden render='g' series={this.series} />;
  }
}

const StackBar = createElement(StackBarRoot, {
  Bar,
  HorizontalBar,
});

export default StackBar;
