import React from 'react';
import { transition } from 'd3-transition';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import AnimatedClipPath from './AnimatedClipPath';
import { scaleToBand, roundedPath } from './utils';
import { PatternFill } from './Pattern';

import style from './style/bar.shadow.css';

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
      maxBarSize = Infinity,
      patterns,
      dataHintsHandler,
    } = this.asProps;
    const offset = typeof offsetProps === 'function' ? offsetProps(i) : offsetProps;
    const [xScale, yScale] = scale;
    const absHeight = Math.abs(
      yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[y0] ?? 0)),
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

    return (
      <React.Fragment key={`bar-${i}`}>
        {sstyled(styles)(
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
            color={resolveColor(color)}
            x={barX}
            y={barY}
            width={width}
            height={height}
            d={dSvg}
            onClickCapture={handleClick}
            use:duration={`${duration}ms`}
            transparent={transparent}
          />,
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
  render() {
    const { data, uid, size, duration } = this.asProps;
    return (
      <>
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

export default createElement(BarRoot, { Background });
