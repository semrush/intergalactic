import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { transition } from 'd3-transition';
import React from 'react';

import AnimatedClipPath from './AnimatedClipPath';
import { DATA_TYPE, FORECAST, POTENTIAL, HIGHLIGHT_DOT, GOOD, BAD, INSIGHTFUL } from './component/Chart';
import createElement from './createElement';
import { PatternFill, PotentialGradient } from './Pattern';
import style from './style/bar.shadow.css';
import { scaleToBand, roundedPath } from './utils';

export const MIN_HEIGHT = 2;

const calcPartBarY = (y, minHeight, height) => {
  // need for the correct rendering of negative values (bar should be under Y-axis)
  if (y <= 0) {
    return Object.is(y, 0) ? minHeight : 0;
  }
  // need for the correct rendering of the minimum positive values
  return height <= minHeight ? minHeight : 0;
};

class BarRoot extends Component {
  static displayName = 'Bar';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    r: 2,
    hMin: MIN_HEIGHT,
  };

  getBackgroundProps(_props, index) {
    const { x, data } = this.asProps;
    return {
      value: data[index][x],
      index,
    };
  }

  animationBar() {
    const { duration, uid } = this.asProps;
    const selectRect = transition().selection().selectAll(`#${uid} rect`);
    const selectRectNode = selectRect.node();

    if (duration > 0 && selectRectNode && selectRectNode.getAttribute('y') !== '0') {
      selectRect.transition().duration(duration).attr('y', 0);
    }
  }

  componentDidUpdate() {
    this.animationBar();
  }

  componentDidMount() {
    this.animationBar();
  }

  renderBar(d, i) {
    const SBar = this.Element;
    const {
      styles,
      color,
      resolveColor,
      x,
      y,
      y0,
      scale,
      hide,
      offset: offsetProps,
      duration,
      uid,
      r,
      hMin,
      width: widthProps,
      groupKey,
      onClick,
      transparent,
      maxBarSize = Number.POSITIVE_INFINITY,
      patterns,
      dataHintsHandler,
    } = this.asProps;
    const offset = typeof offsetProps === 'function' ? offsetProps(i) : offsetProps;
    const [xScale, yScale] = scale;
    const isFirstInStack = d[y0] === 0;
    const absHeight = Math.abs(
      yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[y0] ?? 0) - (isFirstInStack ? 0 : 2)),
    );
    const height = Number(d[y] - (d[y0] ?? 0)) === 0 ? 0 : Math.max(absHeight, hMin);
    const bandWidth = widthProps || scaleToBand(xScale).bandwidth();
    const width = Math.min(bandWidth, maxBarSize);
    const barX = xScale(d[x]) + bandWidth / 2 - width / 2 + offset[0];
    const barY =
      yScale(Math.max(d[y0] ?? 0, height <= hMin && d[y] > 0 ? 0 : d[y])) +
      offset[1] -
      calcPartBarY(d[y], hMin, height);
    const handleClick = (event) => onClick?.(d, event, i, y);
    const dSvg = getRect({
      x: barX,
      y: barY,
      width,
      height,
      radius: Array.isArray(r) ? r[i] : r,
      position: d[y] > 0 || Object.is(d[y], 0) ? 'top' : 'bottom',
    });

    if (groupKey) {
      dataHintsHandler.describeGroupedValues(groupKey, y);
    } else {
      dataHintsHandler.describeValueEntity(`${i}.${y}`, groupKey ?? d[x]);
      dataHintsHandler.specifyDataRowFields(x, y);
    }

    let mask = undefined;
    let resolvedColor = resolveColor(color);

    if (d[DATA_TYPE] === POTENTIAL) {
      resolvedColor = `url(#${this.potentialGradientId})`;
      mask = `url(#${this.potentialPatternId})`;
    }
    if (d[DATA_TYPE] === FORECAST) {
      mask = `url(#${this.forecastPatternId})`;
    }

    return (
      <React.Fragment key={`bar-${i}`}>
        {sstyled(styles)(
          <>
            {Boolean(d[HIGHLIGHT_DOT]) && (
              this.renderHighlight({
                barX,
                barY,
                width,
                height,
                highlight: d[HIGHLIGHT_DOT],
              })
            )}
            <SBar
              aria-hidden
              render='path'
              clipPath={`url(#${uid})`}
              __excludeProps={['data', 'scale', 'value', 'onClick', 'offset']}
              childrenPosition='above'
              value={d}
              index={i}
              hide={hide}
              pattern={patterns ? `url(#${uid}-${i}-pattern)` : undefined}
              color={resolvedColor}
              mask={mask}
              x={barX}
              y={barY}
              width={width}
              height={height}
              d={dSvg}
              onClickCapture={handleClick}
              use:duration={`${duration}ms`}
              transparent={transparent}
            />
          </>,
        )}
        {patterns && (
          <PatternFill
            id={`${uid}-${i}-pattern`}
            patternKey={color}
            color={resolveColor(color)}
            patterns={patterns}
          />
        )}
      </React.Fragment>
    );
  }

  resolveHighlightColor(highlight) {
    const { resolveColor, uid } = this.asProps;
    switch (highlight) {
      case GOOD: {
        return resolveColor('--intergalactic-chart-data-success');
      }
      case BAD: {
        return resolveColor('--intergalactic-chart-data-critical');
      }
      case INSIGHTFUL: {
        return `url(#${this.potentialGradientId})`;
      }
      default:
        return '';
    }
  };

  renderHighlight({
    highlight,
    barX,
    barY,
    width,
    height,
  }) {
    const newHeight = Math.max(height * 0.1, 20);

    const dSvg = getRect({
      x: barX - 2,
      y: barY - 4,
      width: width + 4,
      height: newHeight,
      radius: 4,
      position: 'top',
    });

    return (
      <>
        <path d={dSvg} fill={this.resolveHighlightColor(highlight)} mask={`url(#${this.fadeMaskId})`} />
      </>
    );
  }

  get strokePatternId() {
    const { uid } = this.asProps;

    return `${uid}-stroke-pattern`;
  }

  get forecastPatternId() {
    const { uid } = this.asProps;

    return `${uid}-forecast-mask`;
  }

  renderForecastPattern() {
    return (
      <defs>
        <mask id={this.forecastPatternId}>
          <rect width='100%' height='100%' fill={`url(#${this.strokePatternId})`} />
        </mask>
      </defs>
    );
  }

  get potentialPatternId() {
    const { uid } = this.asProps;

    return `${uid}-potential-mask`;
  }

  get potentialGradientId() {
    const { uid } = this.asProps;

    return `${uid}-potential-gradient`;
  }

  get fadeMaskId() {
    const { uid } = this.asProps;

    return `${uid}-fade-mask`;
  }

  renderPotentialPattern() {
    return (
      <defs>
        <linearGradient id={this.potentialGradientId} x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#2de3a7' />
          <stop offset='60%' stopColor='#9d67f5' />
          <stop offset='100%' stopColor='#18181e' />
        </linearGradient>

        <mask id={this.potentialPatternId}>
          <rect width='100%' height='100%' fill={`url(#${this.strokePatternId})`} />
        </mask>
      </defs>
    );
  }

  renderCommonPattern() {
    const { resolveColor } = this.asProps;
    return (
      <pattern
        id={`${this.strokePatternId}`}
        width='4'
        height='4'
        patternUnits='userSpaceOnUse'
        patternTransform='rotate(40)'
      >
        <rect width='4' height='4' fill='#fff' />
        <line x1='3' y1='0' x2='3' y2='4' stroke={resolveColor('chart-grid-bar-base-bg')} strokeWidth='2' />
      </pattern>
    );
  }

  renderFadeMask() {
    return (
      <defs>
        <linearGradient id={`${this.fadeMaskId}_alphaGrad`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#fff' stopOpacity='0.4' />
          <stop offset='100%' stopColor='#000' />
        </linearGradient>

        <mask id={this.fadeMaskId} maskUnits='objectBoundingBox' maskContentUnits='objectBoundingBox' x='0' y='0' width='1' height='1'>
          <rect x='0' y='0' width='1' height='1' fill={`url(#${this.fadeMaskId}_alphaGrad)`} />
        </mask>
      </defs>
    );
  }

  render() {
    const { data, uid, size, duration } = this.asProps;

    return (
      <>
        {this.renderFadeMask()}
        {this.renderCommonPattern()}
        {this.renderForecastPattern()}
        {this.renderPotentialPattern()}
        {data.map(this.renderBar.bind(this))}
        {duration && (
          <AnimatedClipPath
            duration={duration}
            key={`${uid}-animation`}
            attributeName='y'
            values='100%;0'
            id={uid}
            width={size[0]}
            height={`${size[1]}px`}
          />
        )}
      </>
    );
  }
}

function Background(props) {
  const { Element: SBackground, styles, scale, value } = props;

  const [xScale, yScale] = scale;
  const yRange = yScale.range();

  return sstyled(styles)(
    <SBackground
      aria-hidden
      render='rect'
      childrenPosition='above'
      width={scaleToBand(xScale).bandwidth()}
      height={yRange[0] - yRange[1]}
      x={xScale(value)}
      y={yRange[1]}
    />,
  );
}

function getRect({ x, y, width, height, radius, position }) {
  if (height < radius) radius = height;
  if (radius) {
    if (position === 'top')
      return roundedPath(x, y, width, height, radius, true, true, false, false);
    return roundedPath(x, y, width, height, radius, false, false, true, true);
  }
  return roundedPath(x, y, width, height, radius);
}

/**
 * Bar
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/bar-chart/bar-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/bar-chart/bar-chart-code/|Examples}
 */
export default createElement(BarRoot, { Background });
