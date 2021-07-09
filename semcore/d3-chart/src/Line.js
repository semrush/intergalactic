import React from 'react';
import { curveLinear, line as d3Line } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import { definedData, scaleOfBandwidth, getNullData } from './utils';
import Dots from './Dots';

import style from './style/line.shadow.css';

class LineRoot extends Component {
  static displayName = 'Line';
  static style = style;

  static defaultProps = ({ x, y, $rootProps, curve = curveLinear }) => {
    const [xScale, yScale] = $rootProps.scale;
    return {
      d3: d3Line()
        .defined(definedData(x, y))
        .curve(curve)
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, p[y])),
      color: '#50aef4',
    };
  };

  getDotsProps() {
    const { x, y, d3, color } = this.asProps;
    return {
      x,
      y,
      d3,
      color,
    };
  }

  getNullProps() {
    const { y, d3, color, data } = this.asProps;
    return {
      d3,
      // TODO: vertical
      data: getNullData(data, d3.defined(), y),
      color,
    };
  }

  render() {
    const SLine = this.Element;
    const { styles, hide, color, d3, data } = this.asProps;

    return sstyled(styles)(<SLine render="path" hide={hide} color={color} d={d3(data)} />);
  }
}

function Null(props) {
  const { Element: SNull, styles, d3, data, hide } = props;
  return sstyled(styles)(<SNull render="path" d={d3(data)} hide={hide} />);
}

export default createElement(LineRoot, {
  Dots,
  Null,
});
