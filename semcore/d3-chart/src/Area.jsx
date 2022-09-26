import React from 'react';
import { area, curveLinear, line } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import findComponent from '@semcore/utils/lib/findComponent';
import Dots from './Dots';
import createElement from './createElement';
import { definedData, scaleOfBandwidth, getNullData, definedNullData } from './utils';
import ClipPath from './ClipPath';

import style from './style/area.shadow.css';

class AreaRoot extends Component {
  static displayName = 'Area';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = ({ x, y, y0, $rootProps, curve = curveLinear, scale }) => {
    const [xScale, yScale] = scale || $rootProps.scale;
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
      duration: 500,
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
    const { x, y, color, data, d3Line } = this.asProps;
    return {
      data: getNullData(data, definedNullData(x, y), y),
      d3: d3Line,
      color,
    };
  }

  getLineProps() {
    const { duration, color, data, d3Line, uid } = this.asProps;

    return {
      uid,
      data,
      d3: d3Line,
      color,
      duration,
    };
  }

  render() {
    const SArea = this.Element;
    const SAreaLine = 'path';
    const { styles, hide, d3, d3Line, data, color, uid, size, duration, x, y, Children } =
      this.asProps;
    const advanceMode = !!findComponent(Children, [Area.Line.displayName]);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y);
    this.asProps.dataHintsHandler.establishDataType('time-series');

    return sstyled(styles)(
      <>
        {!advanceMode && (
          <SAreaLine
            aria-hidden
            clipPath={`url(#${uid})`}
            d={d3Line(data)}
            color={color}
            use:duration={`${duration}ms`}
          />
        )}
        <SArea
          aria-hidden
          clipPath={`url(#${uid})`}
          render="path"
          d={d3(data)}
          hide={hide}
          color={color}
          use:duration={`${duration}ms`}
        />
        {duration && (
          <ClipPath
            aria-hidden
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

function Line(props) {
  const { Element: SAreaLine, styles, d3, data, color, duration, uid } = props;
  return sstyled(styles)(
    <SAreaLine
      render="path"
      clipPath={`url(#${uid})`}
      d={d3(data)}
      color={color}
      use:duration={`${duration}ms`}
    />,
  );
}

function Null(props) {
  const { Element: SNull, styles, d3, data, hide, color } = props;
  return sstyled(styles)(<SNull render="path" d={d3(data)} hide={hide} color={color} />);
}

const Area = createElement(AreaRoot, {
  Dots,
  Null,
  Line,
});

export default Area;
