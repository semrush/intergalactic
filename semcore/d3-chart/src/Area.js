import React from 'react';
import { area, curveLinear, line } from 'd3-shape';
import Dots from './Dots';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import { definedData, scaleOfBandwidth, getNullData } from './utils';

import style from './style/area.shadow.css';

class AreaRoot extends Component {
  static displayName = 'Area';
  static style = style;

  static defaultProps = ({ x, y, $rootProps, curve = curveLinear }) => {
    const [xScale, yScale] = $rootProps.scale;
    const yRange = yScale.range();

    return {
      d3: area()
        .defined(definedData(x, y))
        .curve(curve)
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y0((p) => (p.y0 ? scaleOfBandwidth(yScale, p.y0) : yRange[0]))
        .y1((p) => scaleOfBandwidth(yScale, p[y])),
      d3Line: line()
        .defined(definedData(x, y))
        .curve(curve)
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, p[y])),
      color: '#50aef4',
      fill: '#50aef450',
    };
  };

  getDotsProps() {
    const { scale, x, y, color, data } = this.asProps;
    const [xScale, yScale] = scale;

    return {
      x,
      y,
      d3: line()
        .defined(definedData(x, y))
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, data.find((data) => data[x] === p[x])[y])),
      fill: color,
    };
  }

  getNullProps() {
    const { y, color, data, d3Line } = this.asProps;
    return {
      d3Line,
      data: getNullData(data, d3Line.defined(), y),
      fill: color,
    };
  }

  render() {
    const SArea = this.Element;
    const { styles, hide, d3, d3Line, data, fill, curve, color } = this.asProps;
    return styled(styles)(
      <>
        <SArea render="path" hide={hide} curve={curve} fill={fill} d={d3(data)} />
        <path stroke={color} strokeWidth="3" fill="transparent" d={d3Line(data)} />
      </>,
    );
  }
}

function Null(props) {
  const { Element: SNull, styles, d3Line, data, hide } = props;
  return styled(styles)(<SNull render="path" d={d3Line(data)} hide={hide} />);
}

export default createXYElement(AreaRoot, {
  Dots,
  Null,
});
