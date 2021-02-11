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
    const { data, y } = this.asProps;
    return {
      value: data[index][y],
    };
  }

  render() {
    const SBar = this.Element;
    const { styles, color, x, x0, y, data, scale, offset } = this.asProps;
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

function Background(props) {
  const { Element: SBackground, styles, scale, value } = props;
  const [xScale, yScale] = scale;
  const xRange = xScale.range();

  return styled(styles)(
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

export default createXYElement(HorizontalBarRoot, { Background });
