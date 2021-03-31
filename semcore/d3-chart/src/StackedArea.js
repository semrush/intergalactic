import React from 'react';
import { stack as d3Stack, stack } from 'd3-shape';
import { Component } from '@semcore/core';
import createXYElement from './XYElement';
import Area from './Area';

import style from './style/area.shadow.css';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');
const Y0 = Symbol('Y0');

class StackedAreaRoot extends Component {
  static displayName = 'StackedArea';

  static style = style;

  static defaultProps = () => {
    const stack = d3Stack();
    stack[DEFAULT_INSTANCE] = true;
    return {
      color: '#50aef4',
      stack,
    };
  };

  getSeries() {
    const { data, stack } = this.asProps;

    if (stack[DEFAULT_INSTANCE]) {
      stack.keys(data.flatMap((d) => Object.keys(d)).filter((k, i, arr) => arr.indexOf(k) === i));
    }

    return stack(data);
  }

  getAreaProps({ y }) {
    const { x } = this.asProps;
    const series = this.series.find((s) => s.key === y);
    return {
      data: series.map((s) => ({
        [x]: s.data[x],
        [y]: s[1] === 0 ? null : s[1],
        [Y0]: s[0],
      })),
      y0: Y0,
      x,
    };
  }

  render() {
    const Element = this.Element;
    this.series = this.getSeries();
    return <Element render="g" series={this.series} />;
  }
}

const StackedArea = createXYElement(StackedAreaRoot, { Area });

export default StackedArea;
