import React from 'react';
import { area, curveLinear, line } from 'd3-shape';
import Dots from './Dots';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import { definedData, scaleOfBandwidth, getNullData } from './utils';

import style from './style/area.shadow.css';

class AreaRoot extends Component {
  static displayName = 'Area';
  static style = style;

  static defaultProps = ({ x, y, y0, $rootProps, curve = curveLinear }) => {
    const [xScale, yScale] = $rootProps.scale;
    const yRange = yScale.range();

    return {
      d3: area()
        .defined(definedData(x, y))
        .curve(curve)
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y0((p) => (p[y0] ? scaleOfBandwidth(yScale, p[y0]) : yRange[0]))
        .y1((p) => scaleOfBandwidth(yScale, p[y])),
      d3Line: line()
        .defined(definedData(x, y))
        .curve(curve)
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, p[y])),
      color: '#50aef4',
    };
  };

  getDotsProps() {
    const { x, y, color, data, d3Line } = this.asProps;

    return {
      x,
      y,
      data,
      d3: d3Line,
      color,
    };
  }

  getNullProps() {
    const { y, color, data, d3Line } = this.asProps;
    return {
      data: getNullData(data, d3Line.defined(), y),
      d3: d3Line,
      color,
    };
  }

  render() {
    const SArea = this.Element;
    const SAreaLine = 'path';
    const { styles, hide, d3, d3Line, data, color } = this.asProps;
    return sstyled(styles)(
      <>
        <SAreaLine d={d3Line(data)} color={color} />
        <SArea render="path" d={d3(data)} hide={hide} color={color} />
      </>,
    );
  }
}

function Null(props) {
  const { Element: SNull, styles, d3, data, hide, color } = props;
  return sstyled(styles)(<SNull render="path" d={d3(data)} hide={hide} color={color} />);
}

export default createElement(AreaRoot, {
  Dots,
  Null,
});
