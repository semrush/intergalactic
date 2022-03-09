import React from 'react';
import { stack as d3Stack } from 'd3-shape';
import { Component } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import createElement from './createElement';
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
    return { stack };
  };

  getSeries() {
    const { Children, data, stack } = this.asProps;

    if (stack[DEFAULT_INSTANCE]) {
      const keys = React.Children.toArray(getOriginChildren(Children)).reduce((acc, child) => {
        if (React.isValidElement(child) && child.type === StackedArea.Area && !child.props.hide) {
          acc.push(child.props.y);
        }
        return acc;
      }, []);
      stack.keys(keys.reverse());
    }

    return stack(data);
  }

  getAreaProps({ y }) {
    const { x } = this.asProps;
    // or [] if hide area
    const series = this.series.find((s) => s.key === y) || [];
    return {
      data: series.map((s) => ({
        ...s.data,
        // if null is passed in the data, then we pass it, because d3 null leads to 0
        [y]: s.data[y] === null ? null : s[1],
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

const StackedArea = createElement(StackedAreaRoot, { Area });

export default StackedArea;
