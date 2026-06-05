import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement, { useUID } from '@semcore/core/lib/utils/uniqueID';
import { bisector } from 'd3-array';
import { curveLinear, line as d3Line, area as d3Area, curveCardinal } from 'd3-shape';
import React from 'react';

import AnimatedClipPath from './AnimatedClipPath';
import createElement from './createElement';
import Dots from './Dots';
import { resolvePatternDasharray } from './Pattern';
import style from './style/line.shadow.css';
import {
  definedData,
  definedNullData,
  scaleOfBandwidth,
  getNullData,
  interpolateValue,
  getChartDefaultColorName,
  eventToPoint,
  invert,
} from './utils';

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
    const { x, y, d3, color, resolveColor, duration, transparent, patterns, onClick } = this.asProps;
    return {
      x,
      y,
      d3,
      color,
      resolveColor,
      duration,
      transparent,
      patterns,
      onClick,
    };
  }

  getNullProps() {
    const { x, y, d3, color, resolveColor } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    return {
      d3,
      // TODO: vertical
      data: getNullData(data, definedNullData(x, y), y),
      color,
      resolveColor,
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

  handlerOnClick(e) {
    e.stopPropagation();

    const { rootRef, scale: [xScale], data, x, onClick } = this.asProps;

    if (!onClick) return;

    const [pX] = eventToPoint(e, rootRef.current);
    const vX = invert(xScale, pX);
    const index = bisector((d) => d[x]).center(data, vX);

    onClick(index, e);
  }

  render() {
    const SLine = this.Element;
    const {
      styles,
      hide,
      color,
      resolveColor,
      uid,
      size,
      d3,
      duration,
      x,
      y,
      transparent,
      patterns,
    } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y);
    this.asProps.dataHintsHandler.establishDataType('time-series');

    const patternKey = color || getChartDefaultColorName(0);

    return sstyled(styles)(
      <>
        <SLine
          aria-hidden
          clipPath={`url(#${uid})`}
          render='path'
          hide={hide}
          color={resolveColor(color)}
          transparent={transparent}
          d={d3(data)}
          use:duration={`${duration}ms`}
          strokeDasharray={patterns ? resolvePatternDasharray(patternKey, patterns) : undefined}
          onClickCapture={this.handlerOnClick.bind(this)}
          pointerEvents='stroke'
        />
        {duration && (
          <AnimatedClipPath
            aria-hidden
            duration={duration}
            id={uid}
            x='0'
            y='0'
            width={0}
            height={size[1]}
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
    Element: SLineArea,
    styles,
    data,
    hide,
    duration,
    color,
    scale,
    x,
    y0,
    y1,
    curve = curveCardinal,
    area,
    patterns,
    autoInterpolate = true,
  } = props;
  const [xScale, yScale] = scale;
  const dataToArea = React.useMemo(() => {
    if (area) return area;
    const chunked = data.reduce(
      (acc, d) => {
        if (d[y0] === interpolateValue || d[y1] === interpolateValue) return acc;
        if (definedData(y0, y1)(d)) {
          acc[acc.length - 1].push(d);
        } else if (acc[acc.length - 1].length > 0) {
          acc.push([]);
        }
        return acc;
      },
      [[]],
    );
    if (autoInterpolate) {
      return [chunked.flat()];
    }

    return chunked;
  }, [data, y0, y1, area, autoInterpolate]);

  return (
    <>
      {dataToArea.map((chunk, index) => {
        const d3 = d3Area()
          .curve(curve)
          .x((data) => xScale(data[x]))
          .y0((data) => yScale(data[y0]))
          .y1((data) => yScale(data[y1]));

        return sstyled(styles)(
          <SLineArea
            key={`${chunk.length}-${index}`}
            aria-hidden
            clipPath={`url(#${uid})`}
            render='path'
            hide={hide}
            color={color}
            d={d3(chunk)}
            use:duration={`${duration}ms`}
            patterns={patterns}
          />,
        );
      })}
    </>
  );
}

/**
 * Line
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart-code/|Examples}
 */
export default createElement(LineRoot, {
  Dots,
  Null,
  Area,
});
