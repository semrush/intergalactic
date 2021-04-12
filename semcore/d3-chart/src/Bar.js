import React from 'react';
import { Component, styled } from '@semcore/core';
import createElement from './createElement';

import style from './style/bar.shadow.css';

class BarRoot extends Component {
  static displayName = 'Bar';

  static style = style;

  static defaultProps = {
    color: '#50aef4',
    offset: [0, 0],
  };

  getBackgroundProps(props, index) {
    const { x, data } = this.asProps;
    return {
      value: data[index][x],
    };
  }

  render() {
    const SBar = this.Element;
    const { styles, color, x, y, y0, data, scale, hide, offset } = this.asProps;

    const [xScale, yScale] = scale;

    return data.map((d, i) => {
      return styled(styles)(
        <SBar
          key={i}
          __excludeProps={['data', 'scale', 'value']}
          value={d}
          index={i}
          render="rect"
          childrenPosition="above"
          hide={hide}
          fill={color}
          // TODO: https://github.com/airbnb/visx/blob/2fa674e7d7fdc9cffea13e8bf644d46dd6f0db5b/packages/visx-shape/src/util/getBandwidth.ts#L3
          width={xScale.bandwidth()}
          height={Math.abs(yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[y0] ?? 0)))}
          x={xScale(d[x]) + offset[0]}
          y={yScale(Math.max(d[y0] ?? 0, d[y])) + offset[1]}
        />,
      );
    });
  }
}

function Background(props) {
  const { Element: SBackground, styles, scale, value } = props;

  const [xScale, yScale] = scale;
  const yRange = yScale.range();

  return styled(styles)(
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
