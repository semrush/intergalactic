import { Component, sstyled } from '@semcore/core';
import findComponent from '@semcore/core/lib/utils/findComponent';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { bisector } from 'd3-array';
import { area, curveLinear, line } from 'd3-shape';
import React from 'react';

import AnimatedClipPath from './AnimatedClipPath';
import { DATA_TYPE, FORECAST, POTENTIAL } from './component/Chart/AbstractChart.type';
import { SvgElement } from './component/SvgElement';
import createElement from './createElement';
import Dots from './Dots';
import {
  PatternFill,
  ForecastGradient,
  PotentialGradient,
  StrokeMask,
} from './Pattern';
import style from './style/area.shadow.css';
import {
  definedData,
  scaleOfBandwidth,
  getNullData,
  definedNullData,
  interpolateValue,
  eventToPoint,
  invert,
} from './utils';

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
    const { x, y, color, d3Line, transparent, resolveColor, patterns, onClick } = this.asProps;
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
      onClick,
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

  handlerOnClick(e) {
    e.stopPropagation();

    const { rootRef, scale: [xScale], data, x, onClick } = this.asProps;

    if (!onClick) return;

    const [pX] = eventToPoint(e, rootRef.current);
    const vX = invert(xScale, pX);
    const index = bisector((d) => d[x]).center(data, vX);

    onClick(index, e);
  }

  renderForecast() {
    const SArea = this.Element;
    const SAreaLine = SvgElement;
    const {
      styles,
      hide,
      d3,
      d3Line,
      color,
      uid,
      size,
      duration,
      y,
      transparent,
      resolveColor,
    } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue && item[DATA_TYPE] === FORECAST);

    return sstyled(styles)(
      <>
        <SAreaLine
          tag='path'
          aria-hidden
          clipPath={`url(#${uid}-animation)`}
          d={d3Line(data)}
          color={resolveColor(color)}
          use:duration={`${duration}ms`}
          transparent={transparent}
          strokeDasharray='4 4'
        />
        <SArea
          aria-hidden
          clipPath={`url(#${uid})`}
          render='path'
          d={d3(data)}
          hide={hide}
          pattern={`url(#${uid}-forecast-gradient)`}
          mask={`url(#${uid}-forecast-mask)`}
          use:duration={`${duration}ms`}
          transparent={transparent}
          onClickCapture={this.handlerOnClick.bind(this)}
        />
        {duration && <AnimatedClipPath duration={duration} id={uid} width={0} height={size[1]} />}
        <ForecastGradient id={`${uid}-forecast-gradient`} />
        <StrokeMask id={`${uid}-forecast-mask`} />
      </>,
    );
  }

  renderPotential() {
    const SArea = this.Element;
    const SAreaLine = SvgElement;
    const {
      styles,
      hide,
      d3,
      d3Line,
      uid,
      size,
      duration,
      y,
      transparent,
    } = this.asProps;
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue && item[DATA_TYPE] === POTENTIAL);

    return sstyled(styles)(
      <>
        <SAreaLine
          tag='path'
          aria-hidden
          clipPath={`url(#${uid}-animation)`}
          d={d3Line(data)}
          color={`url(#${uid}-potential-gradient-line)`}
          use:duration={`${duration}ms`}
          transparent={transparent}
          strokeDasharray='4 4'
        />
        <SArea
          aria-hidden
          clipPath={`url(#${uid})`}
          render='path'
          d={d3(data)}
          hide={hide}
          pattern={`url(#${uid}-potential-gradient)`}
          mask={`url(#${uid}-potential-mask)`}
          use:duration={`${duration}ms`}
          transparent={transparent}
          onClickCapture={this.handlerOnClick.bind(this)}
        />

        {duration && <AnimatedClipPath duration={duration} id={uid} width={0} height={size[1]} />}
        <PotentialGradient id={`${uid}-potential-gradient`} />
        <PotentialGradient id={`${uid}-potential-gradient-line`} type='line' />
        <StrokeMask id={`${uid}-potential-mask`} />
      </>,
    );
  }

  render() {
    const SArea = this.Element;
    const SAreaLine = SvgElement;
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
      withGradient,
    } = this.asProps;
    const advancedMode = forcedAdvancedMode || !!findComponent(Children, [Area.Line.displayName]);
    const data = this.asProps.data.filter((item) => item[y] !== interpolateValue && item[DATA_TYPE] !== FORECAST && item[DATA_TYPE] !== POTENTIAL);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y);
    this.asProps.dataHintsHandler.establishDataType('time-series');

    return sstyled(styles)(
      <>
        {!advancedMode && (
          <SAreaLine
            tag='path'
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
          onClickCapture={this.handlerOnClick.bind(this)}
          withGradient={patterns ? undefined : withGradient}
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
        {this.renderForecast()}
        {this.renderPotential()}
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

/**
 * Area
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/area-chart/area-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/area-chart/area-chart-code/|Examples}
 */
const Area = createElement(AreaRoot, {
  Dots,
  Null,
  Line,
});

export default Area;
