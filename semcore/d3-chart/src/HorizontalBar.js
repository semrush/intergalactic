import React from 'react';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import createElement from './createElement';
import ClipPath from './ClipPath';
import { getBandwidth, roundedPath } from './utils';

import style from './style/bar.shadow.css';

class HorizontalBarRoot extends Component {
  static displayName = 'HorizontalBar';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = {
    color: '#50aef4',
    offset: [0, 0],
    duration: 500,
    r: 2,
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
      offset,
      uid,
      duration,
      r,
      height: heightProps,
      onMouseMove,
      onMouseLeave,
    } = this.asProps;

    const isRounded = r !== 0;
    const [xScale, yScale] = scale;
    const barY = yScale(d[y]) + offset[1];
    const barX = xScale(Math.min(d[x0] ?? 0, d[x])) + offset[0];
    const height = heightProps || getBandwidth(yScale);
    let width = Math.abs(xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)));
    width = isRounded ? width + r : width;
    const xValue = isRounded ? (d[x] > 0 ? barX : barX - r) : barX;
    const dSvg = getHorizontalRect({
      x: xValue,
      y: barY,
      width,
      height,
      radius: r,
      position: d[x] > 0 ? 'right' : 'left',
    });

    return sstyled(styles)(
      <SBar
        key={`horizontal-bar-${i}`}
        render="path"
        clipPath={`url(#${uid})`}
        __excludeProps={['data', 'scale', 'value']}
        childrenPosition="above"
        value={d}
        index={i}
        hide={hide}
        color={color}
        x={xValue}
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
      render="rect"
      childrenPosition="above"
      width={xRange[1] - xRange[0]}
      height={yScale.bandwidth()}
      x={xRange[0]}
      y={yScale(value)}
    />,
  );
}

function getHorizontalRect({ x, y, width, height, radius, position }) {
  if (width <= radius) return '';
  if (radius) {
    if (position === 'right')
      return roundedPath(x, y, width, height, radius, false, true, false, true);
    return roundedPath(x, y, width, height, radius, true, false, true, false);
  }
  return roundedPath(x, y, width, height, radius);
}

export default createElement(HorizontalBarRoot, { Background });
