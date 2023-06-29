import React from 'react';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import createElement from './createElement';
import ClipPath from './ClipPath';
import { getBandwidth, roundedPath } from './utils';

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

  getBackgroundProps(props, index) {
    const { data, y } = this.asProps;
    return {
      value: data[index][y],
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
    } = this.asProps;

    const offset = typeof offsetProps === 'function' ? offsetProps(i) : offsetProps;
    const [xScale, yScale] = scale;
    const absWidth = Math.abs(
      xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)),
    );
    const height = heightProps || getBandwidth(yScale);
    const width = Number(d[x] - (d[x0] ?? 0)) === 0 ? 0 : Math.max(absWidth, wMin);
    const barY = yScale(d[y]) + offset[1];
    const barX =
      xScale(Math.min(d[x0] ?? 0, width <= wMin && d[x] < 0 ? 0 : d[x])) +
      offset[0] -
      calcPartBarX(d[x], wMin, width);
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

    return sstyled(styles)(
      <SBar
        aria-hidden
        key={`horizontal-bar-${i}`}
        render='path'
        clipPath={`url(#${uid})`}
        __excludeProps={['data', 'scale', 'value', 'offset']}
        childrenPosition='above'
        value={d}
        index={i}
        hide={hide}
        color={color}
        transparent={transparent}
        x={barX}
        y={barY}
        width={width}
        height={height}
        d={dSvg}
        use:duration={`${duration}ms`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />,
    );
  }

  render() {
    const { data, uid, size, duration } = this.asProps;

    return (
      <>
        {data.map(this.renderBar.bind(this))}
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
      height={yScale.bandwidth()}
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
