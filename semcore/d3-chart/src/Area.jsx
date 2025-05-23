import React from 'react';
import { area, curveLinear, line } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import findComponent from '@semcore/core/lib/utils/findComponent';
import Dots from './Dots';
import createElement from './createElement';
import {
  definedData,
  scaleOfBandwidth,
  getNullData,
  definedNullData,
  interpolateValue,
} from './utils';
import AnimatedClipPath from './AnimatedClipPath';
import { PatternFill } from './Pattern';

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
    const { x, y, color, d3Line, transparent, resolveColor, patterns } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    return {
      x,
      y,
      data,
      d3: d3Line,
      color,
      resolveColor,
      transparent,
      patterns,
    };
  }

  getNullProps() {
    const { x, y, color, resolveColor, d3Line } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    return {
      data: getNullData(data, definedNullData(x, y), y),
      d3: d3Line,
      color,
      resolveColor,
    };
  }

  getLineProps() {
    const { duration, color, resolveColor, data, d3Line, uid } = this.asProps;

    return {
      uid,
      data,
      d3: d3Line,
      color,
      resolveColor,
      duration,
    };
  }

  render() {
    const SArea = this.Element;
    const SAreaLine = 'path';
    const {
      styles,
      hide,
      d3,
      d3Line,
      color,
      uid,
      size,
      duration,
      x,
      y,
      Children,
      transparent,
      forcedAdvancedMode,
      resolveColor,
      patterns,
    } = this.asProps;
    const advancedMode = forcedAdvancedMode || !!findComponent(Children, [Area.Line.displayName]);
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y);
    this.asProps.dataHintsHandler.establishDataType('time-series');

    return sstyled(styles)(
      <>
        {!advancedMode && (
          <SAreaLine
            aria-hidden
            clipPath={`url(#${uid}-animation)`}
            d={d3Line(data)}
            color={resolveColor(color)}
            use:duration={`${duration}ms`}
            transparent={transparent}
          />
        )}
        <SArea
          aria-hidden
          clipPath={`url(#${uid})`}
          render='path'
          d={d3(data)}
          hide={hide}
          pattern={patterns ? `url(#${uid}-pattern)` : undefined}
          color={resolveColor(color)}
          use:duration={`${duration}ms`}
          transparent={transparent}
        />
        {duration && <AnimatedClipPath duration={duration} id={uid} width={0} height={size[1]} />}
        {patterns && (
          <PatternFill
            id={`${uid}-pattern`}
            patternKey={color}
            color={resolveColor(color)}
            patterns={patterns}
          />
        )}
      </>,
    );
  }
}

function Line(props) {
  const {
    Element: SAreaLine,
    styles,
    d3,
    data,
    color,
    resolveColor,
    duration,
    uid,
    transparent,
  } = props;
  return sstyled(styles)(
    <SAreaLine
      render='path'
      clipPath={`url(#${uid})`}
      d={d3(data)}
      color={resolveColor(color)}
      use:duration={`${duration}ms`}
      transparent={transparent}
    />,
  );
}

function Null(props) {
  const { Element: SNull, styles, d3, data, hide, color, resolveColor } = props;
  return sstyled(styles)(
    <SNull render='path' d={d3(data)} hide={hide} color={resolveColor(color)} />,
  );
}

const Area = createElement(AreaRoot, {
  Dots,
  Null,
  Line,
});

export default Area;
