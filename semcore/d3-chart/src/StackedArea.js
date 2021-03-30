import React from 'react';
import { stack } from 'd3-shape';
import { Component } from '@semcore/core';
import createXYElement from './XYElement';
import Area from './Area';
import style from './style/area.shadow.css';

class StackedAreaRoot extends Component {
  static displayName = 'StackedArea';

  static style = style;

  static defaultProps = () => {
    return {
      color: '#50aef4',
    };
  };

  getSeries() {
    const { data, x } = this.asProps;
    const keys = data
      .flatMap((d) => Object.keys(d))
      .reduce((keys, key) => keys.add(key), new Set());
    keys.delete(x);
    return stack().keys([...keys])(data);
  }

  getAreaProps({ y }) {
    const { x } = this.asProps;
    const Y0 = Symbol('Y0');
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
