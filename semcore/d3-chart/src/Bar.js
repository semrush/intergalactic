import React from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import ClipPath from './ClipPath';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { transition } from 'd3-transition';

import style from './style/bar.shadow.css';

class BarRoot extends Component {
  static displayName = 'Bar';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = {
    color: '#50aef4',
    offset: [0, 0],
    duration: 500,
  };

  getBackgroundProps(props, index) {
    const { x, data } = this.asProps;
    return {
      value: data[index][x],
    };
  }

  componentDidMount() {
    const { duration, uid } = this.asProps;

    if (duration > 0) {
      transition()
        .selection()
        .selectAll(`#${uid} rect`)
        .transition()
        .duration(duration)
        .attr('y', 0);
    }
  }

  renderBar(d, i) {
    const SBar = this.Element;
    const { styles, color, x, y, y0, scale, hide, offset, duration, uid } = this.asProps;

    const [xScale, yScale] = scale;

    return sstyled(styles)(
      <SBar
        key={`bar-${i}`}
        render="rect"
        clipPath={`url(#${uid})`}
        __excludeProps={['data', 'scale', 'value']}
        childrenPosition="above"
        value={d}
        index={i}
        hide={hide}
        color={color}
        // TODO: https://github.com/airbnb/visx/blob/2fa674e7d7fdc9cffea13e8bf644d46dd6f0db5b/packages/visx-shape/src/util/getBandwidth.ts#L3
        width={xScale.bandwidth()}
        height={Math.abs(yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[y0] ?? 0)))}
        x={xScale(d[x]) + offset[0]}
        y={yScale(Math.max(d[y0] ?? 0, d[y])) + offset[1]}
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

export default createElement(BarRoot, { Background });
