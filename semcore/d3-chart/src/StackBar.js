import React from 'react';
import { stack as d3Stack } from 'd3-shape';
import { Component } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import createElement from './createElement';
import Bar from './Bar';
import HorizontalBar from './HorizontalBar';

import style from './style/bar.shadow.css';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');
const XY0 = Symbol('XY0');

class StackBarRoot extends Component {
  static displayName = 'StackBar';

  static style = style;

  static defaultProps = () => {
    const stack = d3Stack();
    stack[DEFAULT_INSTANCE] = true;
    return { stack, r: 2 };
  };

  getSeries() {
    const { Children, data, stack } = this.asProps;

    if (stack[DEFAULT_INSTANCE]) {
      const keys = React.Children.toArray(getOriginChildren(Children)).reduce((acc, child) => {
        if (React.isValidElement(child) && child.type === StackBar.Bar) {
          acc.push(child.props.y);
        }
        if (React.isValidElement(child) && child.type === StackBar.HorizontalBar) {
          acc.push(child.props.x);
        }
        return acc;
      }, []);
      stack.keys(keys);
    }

    return stack(data);
  }

  getBarProps({ y }) {
    const { x, r } = this.asProps;

    const seriesIndex = this.series.findIndex((s) => s.key === y);
    const series = this.series[seriesIndex];

    const rBar = series.map((s, i) =>
      this.series.slice(seriesIndex + 1).some((bar) => bar[i][0] !== bar[i][1]) ? 0 : r,
    );

    return {
      data: series.map((s) => ({
        ...s.data,
        [y]: s[1],
        [XY0]: s[0],
      })),
      y0: XY0,
      x,
      r: rBar,
    };
  }

  getHorizontalBarProps({ x }) {
    const { y, r } = this.asProps;

    const seriesIndex = this.series.findIndex((s) => s.key === x);
    const series = this.series[seriesIndex];

    const rBar = series.map((s, i) =>
      this.series.slice(seriesIndex + 1).some((bar) => bar[i][0] !== bar[i][1]) ? 0 : r,
    );

    return {
      data: series.map((s) => ({
        ...s.data,
        [x]: s[1],
        [XY0]: s[0],
      })),
      x0: XY0,
      y,
      r: rBar,
    };
  }

  render() {
    const Element = this.Element;
    this.series = this.getSeries();
    return <Element render="g" series={this.series} />;
  }
}

const StackBar = createElement(StackBarRoot, {
  Bar,
  HorizontalBar,
});

export default StackBar;
