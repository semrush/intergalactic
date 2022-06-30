import React from 'react';
import { curveLinear, line as d3Line } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import { definedData, definedNullData, scaleOfBandwidth, getNullData } from './utils';
import Dots from './Dots';
import ClipPath from './ClipPath';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

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
    const { x, y, d3, color, duration } = this.asProps;
    return {
      x,
      y,
      d3,
      color,
      duration,
    };
  }

  getNullProps() {
    const { x, y, d3, color, data } = this.asProps;
    return {
      d3,
      // TODO: vertical
      data: getNullData(data, definedNullData(x, y), y),
      color,
    };
  }

  render() {
    const SLine = this.Element;
    const { styles, hide, color, uid, size, d3, data, duration } = this.asProps;
    return sstyled(styles)(
      <>
        <SLine
          clipPath={`url(#${uid})`}
          render="path"
          hide={hide}
          color={color}
          d={d3(data)}
          use:duration={`${duration}ms`}
        />
        {duration && (
          <ClipPath
            setAttributeTag={(rect) => {
              rect.setAttribute('width', size[0]);
            }}
            id={uid}
            x="0"
            y="0"
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
  return sstyled(styles)(<SNull render="path" d={d3(data)} hide={hide} />);
}

export default createElement(LineRoot, {
  Dots,
  Null,
});
