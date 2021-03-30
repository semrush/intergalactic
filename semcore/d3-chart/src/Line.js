import React from 'react';
import { curveLinear, line as d3Line } from 'd3-shape';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import { definedData, scaleOfBandwidth, getNullData } from './utils';
import Dots from './Dots';

import style from './style/line.shadow.css';

class LineRoot extends Component {
  static displayName = 'Line';
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

  static style = style;

  getDotsProps() {
    const { x, y, d3, color } = this.asProps;
    return {
      x,
      y,
      d3,
      fill: color,
    };
  }

  getNullProps() {
    const { y, d3, color, data } = this.asProps;
    return {
      d3,
      // TODO: vertical
      data: getNullData(data, d3.defined(), y),
      fill: color,
    };
  }

  render() {
    const SLine = this.Element;
    const { styles, hide, color, d3, data } = this.asProps;

    return styled(styles)(<SLine render="path" hide={hide} stroke={color} d={d3(data)} />);
  }
}

function Null(props) {
  const { Element: SNull, styles, d3, data, hide } = props;
  return styled(styles)(<SNull render="path" d={d3(data)} hide={hide} />);
}

export default createXYElement(LineRoot, {
  Dots,
  Null,
});
