import React from 'react';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import AnimatedClipPath from './AnimatedClipPath';
import { scaleToBand, roundedPath } from './utils';
import { PatternFill } from './Pattern';

import style from './style/bar.shadow.css';

export const MIN_WIDTH = 2;

const calcPartBarX = (x, minWidth, width) => {
  // need for the correct rendering of negative values
  if (x <= 0) {
    return width <= minWidth ? minWidth : 0;
  }
  // need for the correct rendering of the minimum positive values
  return Object.is(x, 0) ? minWidth : 0;
};

class HorizontalBarRoot extends Component {
  static displayName = 'HorizontalBar';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    r: 2,
    wMin: MIN_WIDTH,
  };

  getBackgroundProps(_props, index) {
    const { data, y } = this.asProps;
    return {
      value: data[index][y],
      index,
    };
  }

  renderBar(d, i) {
    const SBar = this.Element;
    const {
      styles,
      color,
      x,
      x0,
      y,
      scale,
      hide,
      offset: offsetProps,
      uid,
      duration,
      r,
      wMin,
      height: heightProps,
      onMouseMove,
      onMouseLeave,
      groupKey,
      transparent,
      maxBarSize = Infinity,
      resolveColor,
      patterns,
      onClick,
    } = this.asProps;

    const offset = typeof offsetProps === 'function' ? offsetProps(i) : offsetProps;
    const [xScale, yScale] = scale;
    const absWidth = Math.abs(
      xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)),
    );
    const bandHeight = heightProps || scaleToBand(yScale).bandwidth();
    const height = Math.min(bandHeight, maxBarSize);
    const width = Number(d[x] - (d[x0] ?? 0)) === 0 ? 0 : Math.max(absWidth, wMin);
    const barY = yScale(d[y]) + bandHeight / 2 - height / 2 + offset[1];
    const barX =
      xScale(Math.min(d[x0] ?? 0, width <= wMin && d[x] < 0 ? 0 : d[x])) +
      offset[0] -
      calcPartBarX(d[x], wMin, width);
    const handleClick = (event) => onClick?.(d, event, i, x);
    const dSvg = getHorizontalRect({
      x: barX,
      y: barY,
      width,
      height,
      radius: Array.isArray(r) ? r[i] : r,
      position: d[x] > 0 || Object.is(d[x], 0) ? 'right' : 'left',
    });

    if (groupKey) {
      this.asProps.dataHintsHandler.describeGroupedValues(groupKey, x);
    } else {
      this.asProps.dataHintsHandler.describeValueEntity(`${i}.${x}`, groupKey ?? d[y]);
    }

    return (
      <React.Fragment key={`horizontal-bar-${i}`}>
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
            color={resolveColor(color)}
            pattern={patterns ? `url(#${uid}-${i}-pattern)` : undefined}
            transparent={transparent}
            x={barX}
            y={barY}
            width={width}
            height={height}
            d={dSvg}
            onClickCapture={handleClick}
            use:duration={`${duration}ms`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
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
            aria-hidden
            duration={duration}
            id={uid}
            x='0'
            y='0'
            width={0}
            height={size[1]}
          />
        )}
      </>
    );
  }
}

function Background(props) {
  const { Element: SBackground, styles, scale, value } = props;
  const [xScale, yScale] = scale;
  const xRange = xScale.range();

  return sstyled(styles)(
    <SBackground
      aria-hidden
      render='rect'
      childrenPosition='above'
      width={xRange[1] - xRange[0]}
      height={scaleToBand(yScale).bandwidth()}
      x={xRange[0]}
      y={yScale(value)}
    />,
  );
}

function getHorizontalRect({ x, y, width, height, radius, position }) {
  if (width < radius) radius = width;
  if (radius) {
    if (position === 'right')
      return roundedPath(x, y, width, height, radius, false, true, false, true);
    return roundedPath(x, y, width, height, radius, true, false, true, false);
  }
  return roundedPath(x, y, width, height, radius);
}

export default createElement(HorizontalBarRoot, { Background });
