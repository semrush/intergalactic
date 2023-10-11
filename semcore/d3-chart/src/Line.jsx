import React from 'react';
import { curveLinear, line as d3Line, area as d3Area, curveCardinal } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement, { useUID } from '@semcore/utils/lib/uniqueID';
import createElement from './createElement';
import {
  definedData,
  definedNullData,
  scaleOfBandwidth,
  getNullData,
  interpolateValue,
} from './utils';
import Dots from './Dots';
import ClipPath from './ClipPath';

import style from './style/line.shadow.css';

class LineRoot extends Component {
  static displayName = 'Line';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = ({ x, y, $rootProps, curve = curveLinear, scale }) => {
    const [xScale, yScale] = scale || $rootProps.scale;
    return {
      d3: d3Line()
        .defined(definedData(x, y))
        .curve(curve)
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, p[y])),
      duration: 500,
    };
  };

  getDotsProps() {
    const { x, y, d3, color, duration, transparent } = this.asProps;
    return {
      x,
      y,
      d3,
      color,
      duration,
      transparent,
    };
  }

  getNullProps() {
    const { x, y, d3, color } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    return {
      d3,
      // TODO: vertical
      data: getNullData(data, definedNullData(x, y), y),
      color,
    };
  }

  getAreaProps() {
    const { x, y, color, hide, duration, scale } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    return {
      x,
      y,
      data,
      color,
      hide,
      duration,
      scale,
    };
  }

  render() {
    const SLine = this.Element;
    const { styles, hide, color, uid, size, d3, duration, x, y, transparent } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y);
    this.asProps.dataHintsHandler.establishDataType('time-series');

    return sstyled(styles)(
      <>
        <SLine
          aria-hidden
          clipPath={`url(#${uid})`}
          render='path'
          hide={hide}
          color={color}
          transparent={transparent}
          d={d3(data)}
          use:duration={`${duration}ms`}
        />
        {duration && (
          <ClipPath
            aria-hidden
            setAttributeTag={(rect) => {
              rect.setAttribute('width', size[0]);
            }}
            id={uid}
            x='0'
            y='0'
            width={0}
            height={size[1]}
            transition={`width ${duration}ms ease-in-out`}
          />
        )}
      </>,
    );
  }
}

function Null(props) {
  const { Element: SNull, styles, d3, data, hide } = props;
  return sstyled(styles)(<SNull render='path' d={d3(data)} hide={hide} />);
}

function Area(props) {
  const uid = useUID();
  const {
    Element: SAria,
    styles,
    data,
    hide,
    duration,
    color,
    scale,
    x,
    y,
    y0,
    y1,
    wide = 0.3,
    curve = curveCardinal,
  } = props;
  const [xScale, yScale] = scale;

  /**
   * Method for calculate area width.
   * If the wide is less as 1, then area width is percent from full height of chart.
   * Otherwise, area width will calculate with +- wide value.
   */
  const calculateAreaWidth = (value, i) => {
    if (wide < 1) {
      const range = yScale.range();
      const size = (Math.abs(range[0] - range[1]) * wide) / 2;

      return yScale(value) + size * i;
    }

    return yScale(value + wide * i);
  };

  const d3 = d3Area()
    .curve(curve)
    .x((data) => xScale(data[x]))
    .y0((data) => (data[y0] !== undefined ? yScale(data[y0]) : calculateAreaWidth(data[y], -1)))
    .y1((data) => (data[y1] !== undefined ? yScale(data[y1]) : calculateAreaWidth(data[y], 1)));

  return sstyled(styles)(
    <SAria
      aria-hidden
      clipPath={`url(#${uid})`}
      render='path'
      hide={hide}
      color={color}
      d={d3(data)}
      use:duration={`${duration}ms`}
    />,
  );
}

export default createElement(LineRoot, {
  Dots,
  Null,
  Area,
});
