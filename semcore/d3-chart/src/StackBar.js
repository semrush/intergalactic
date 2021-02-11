import React from 'react';
import { stack as d3Stack } from 'd3-shape';
import { Component } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import createXYElement from './XYElement';
import Bar from './Bar';
import HorizontalBar from './HorizontalBar';

import style from './style/bar.shadow.css';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');

class StackBarRoot extends Component {
  static displayName = 'StackBar';

  static style = style;

  static defaultProps = () => {
    const stack = d3Stack();
    stack[DEFAULT_INSTANCE] = true;
    return { stack };
  };

  getSeries() {
    const { Children, stack, data } = this.asProps;

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
    const { x } = this.asProps;

    const series = this.series.find((s) => s.key === y);

    return {
      data: series.map((s) => ({
        ...s.data,
        [y]: s[1],
        $y0: s[0],
      })),
      y0: '$y0',
      x,
    };
  }

  getBackgroundProps({ y }, index) {
    const { x } = this.asProps;
    // const series = this.series.find((s) => s.key === x);
    console.log(this.series, x, 'this.series x');
    console.log(this.series.map((s) => console.log(s.key)), 'map');

    return {
      data: this.series.map((s) => ({
        ...s.data,
        [x]: s[1],
        $x0: s[0],
        y: s.key,
      })),
      x0: '$x0',

      x,
      index,
    };
  }

  getHorizontalBarProps({ x }) {
    const { y } = this.asProps;

    const series = this.series.find((s) => s.key === x);

    return {
      data: series.map((s) => ({
        ...s.data,
        [x]: s[1],
        $x0: s[0],
      })),
      x0: '$x0',
      y,
    };
  }

  render() {
    const Element = this.Element;
    this.series = this.getSeries();
    return <Element render="g" series={this.series} />;
  }
}

const StackBar = createXYElement(StackBarRoot, {
  Bar,
  HorizontalBar,
  Background: Bar.Background,
});

export default StackBar;
