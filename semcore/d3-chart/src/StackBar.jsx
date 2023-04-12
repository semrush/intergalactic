import React from 'react';
import { stack as d3Stack } from 'd3-shape';
import { Component } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import createElement from './createElement';
import Bar, { MIN_HEIGHT } from './Bar';
import HorizontalBar from './HorizontalBar';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');
const XY0 = Symbol('XY0');

function calculateHeightBars(inputArray) {
  const outputArray = [];
  for (let i = 0; i < inputArray[0].length; i++) {
    const newItem = [];
    for (let j = 0; j < inputArray.length; j++) {
      newItem.push(inputArray[j][i][1] - inputArray[j][i][0]);
    }
    outputArray.push(newItem);
  }
  return outputArray;
}

function calculateHeightMinBars(inputArray, height, hMin) {
  const outputArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    const newItem = [0];
    let offset = 0;
    for (let j = 0; j < inputArray[0].length; j++) {
      if (inputArray[i][j] !== 0 && inputArray[i][j] < height) {
        offset += -hMin;
      }
      newItem[j + 1] = offset;
    }
    outputArray.push(newItem);
  }
  return outputArray;
}

class StackBarRoot extends Component {
  static displayName = 'StackBar';

  static defaultProps = () => {
    const stack = d3Stack();
    stack[DEFAULT_INSTANCE] = true;
    return { stack, r: 2 };
  };

  hMinBars = [];
  hBars = [];
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

    this.hBars = calculateHeightBars(this.series);
    this.hMinBars = calculateHeightMinBars(this.hBars, 0.1, hMin);

    this.offsetBars[seriesIndex] = this.offsetBars[seriesIndex] ?? [];
    const data = series.map((s) => ({
      ...s.data,
      [y]: s[1],
      [XY0]: s[0],
    }));

    const calcOffset = (i) => {
      const offset = this.offsetBars.reduce((offset, offsetBar) => offset - (offsetBar[i] ?? 0), 0)
      const d = data[i];
      const absHeight = Math.abs(
        yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[XY0] ?? 0)),
      );
      this.offsetBars[seriesIndex][i] = Number(d[y] - (d[XY0] ?? 0)) === 0 ? 0 : absHeight >= hMin ? 0 : hMin;
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
      wMin: 0,
      x0: XY0,
      y,
      r: rBar,
      groupKey: y,
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
