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

  render() {
    const SBar = this.Element;
    const {
      styles,
      color,
      x,
      x0,
      y,
      data,
      scale,
      hide,
      offset,
      size,
      uid,
      duration,
    } = this.asProps;
    const [xScale, yScale] = scale;

    return data.map((d, i) => {
      return sstyled(styles)(
        <>
          <SBar
            key={uid}
            render="rect"
            clipPath={`url(#cut-off-horizontal-bar)`}
            __excludeProps={['data', 'scale', 'value']}
            childrenPosition="above"
            value={d}
            index={i}
            hide={hide}
            color={color}
            width={Math.abs(
              xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)),
            )}
            height={yScale.bandwidth()}
            x={xScale(Math.min(d[x0] ?? 0, d[x])) + offset[0]}
            y={yScale(d[y]) + offset[1]}
            use:duration={`${duration}ms`}
          />
          {duration && (
            <ClipPath
              setAttributeTag={(rect) => {
                rect.setAttribute('width', size[0]);
              }}
              id="cut-off-horizontal-bar"
              x="0"
              y="0"
              width={0}
              height={size[1]}
              transition={`width ${duration}ms ease-in-out`}
            />
          )}
        </>,
      );
    });
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
