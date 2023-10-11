import React from 'react';
import { curveLinear, line as d3Line, area as d3AreaDefine, curveCardinal } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
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
      d3Area: d3AreaDefine()
        .defined(definedData(x, y))
        .curve(curveCardinal)
        .x((d) => xScale(d[x]))
        .y0((d) => yScale(d[y] - 2))
        .y1((d) => yScale(d[y] + 2)),
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

  render() {
    const SLine = this.Element;
    const SAria = this.Element;
    const { styles, hide, color, uid, size, d3, d3Area, duration, x, y, transparent } =
      this.asProps;
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
        <SAria
          aria-hidden
          clipPath={`url(#${uid})`}
          render='path'
          hide={hide}
          color={color}
          d={d3Area(data)}
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

export default createElement(LineRoot, {
  Dots,
  Null,
});
