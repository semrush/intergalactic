import React, { useCallback } from 'react';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import { XYPlot, Bar, YAxis, XAxis } from '@semcore/d3-chart';

import style from './style/bar.shadow.css';

class HorizontalBarRoot extends Component {
  static displayName = 'HorizontalBar';

  static style = style;

  static defaultProps = {
    color: '#50aef4',
    offset: [0, 0],
  };

  getBackgroundProps(props, index) {
    const { x, y, styles } = this.asProps;
    return {
      x,
      y,
      index,
      styles,
    };
  }

  render() {
    const SBar = this.Element;
    const { styles, color, x, x0, y, data, scale, offset } = this.asProps;
    console.log(x, y, 'xy');
    const [xScale, yScale] = scale;

    return data.map((d, i) => {
      return styled(styles)(
        <SBar
          key={i}
          value={d}
          index={i}
          render="rect"
          childrenPosition="above"
          fill={color}
          width={Math.abs(xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)))}
          height={yScale.bandwidth()}
          x={xScale(Math.min(d[x0] ?? 0, d[x])) + offset[0]}
          y={yScale(d[y]) + offset[1]}
        />,
      );
    });
  }
}

export default createXYElement(HorizontalBarRoot, { Background: Bar.Background });
