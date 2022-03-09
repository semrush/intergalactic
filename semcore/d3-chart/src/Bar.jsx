import React from 'react';
import { transition } from 'd3-transition';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import createElement from './createElement';
import ClipPath from './ClipPath';
import { getBandwidth, roundedPath } from './utils';

import style from './style/bar.shadow.css';

class BarRoot extends Component {
  static displayName = 'Bar';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    r: 2,
  };

  getBackgroundProps(props, index) {
    const { x, data } = this.asProps;
    return {
      value: data[index][x],
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
      x,
      y,
      y0,
      scale,
      hide,
      offset,
      duration,
      uid,
      r,
      width: widthProps,
    } = this.asProps;

    const [xScale, yScale] = scale;
    const barY = yScale(Math.max(d[y0] ?? 0, d[y])) + offset[1];
    const barX = xScale(d[x]) + offset[0];
    const height = Math.abs(
      yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[y0] ?? 0)),
    );
    const width = widthProps || getBandwidth(xScale);
    const dSvg = getRect({
      x: barX,
      y: barY,
      width,
      height,
      radius: Array.isArray(r) ? r[i] : r,
      position: d[y] > 0 ? 'top' : 'bottom',
    });

    return sstyled(styles)(
      <SBar
        key={`bar-${i}`}
        render="path"
        clipPath={`url(#${uid})`}
        __excludeProps={['data', 'scale', 'value']}
        childrenPosition="above"
        value={d}
        index={i}
        hide={hide}
        color={color}
        x={barX}
        y={barY}
        width={width}
        height={height}
        d={dSvg}
        use:duration={`${duration}ms`}
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
            key={`${uid}-animation`}
            id={uid}
            x="0"
            y={size[1]}
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
      render="rect"
      childrenPosition="above"
      width={xScale.bandwidth()}
      height={yRange[0] - yRange[1]}
      x={xScale(value)}
      y={yRange[1]}
    />,
  );
}

function getRect({ x, y, width, height, radius, position }) {
  if (height <= radius) return '';
  if (radius) {
    if (position === 'top')
      return roundedPath(x, y, width, height, radius, true, true, false, false);
    return roundedPath(x, y, width, height, radius, false, false, true, true);
  }
  return roundedPath(x, y, width, height, radius);
}

export default createElement(BarRoot, { Background });
