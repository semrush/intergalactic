import React from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import ClipPath from './ClipPath';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/bar.shadow.css';

class HorizontalBarRoot extends Component {
  static displayName = 'HorizontalBar';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = {
    color: '#50aef4',
    offset: [0, 0],
    duration: 500,
  };

  getBackgroundProps(props, index) {
    const { data, y } = this.asProps;
    return {
      value: data[index][y],
    };
  }

  renderBar(d, i) {
    const SBar = this.Element;
    const { styles, color, x, x0, y, scale, hide, offset, uid, duration } = this.asProps;
    const [xScale, yScale] = scale;

    return sstyled(styles)(
      <SBar
        key={`horizontal-bar-${i}`}
        render="rect"
        clipPath={`url(#${uid})`}
        __excludeProps={['data', 'scale', 'value']}
        childrenPosition="above"
        value={d}
        index={i}
        hide={hide}
        color={color}
        width={Math.abs(xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)))}
        height={yScale.bandwidth()}
        x={xScale(Math.min(d[x0] ?? 0, d[x])) + offset[0]}
        y={yScale(d[y]) + offset[1]}
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

export default createElement(HorizontalBarRoot, { Background });
