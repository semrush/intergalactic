import React from 'react';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';

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
    const radius = 2;

    return data.map((d, i) => {
      const barY = yScale(d[y]) + offset[1];
      const barX = xScale(Math.min(d[x0] ?? 0, d[x])) + offset[0];
      const height = yScale.bandwidth();
      const width = Math.abs(
        xScale(d[x]) - Math.max(xScale(xScale.domain()[0]), xScale(d[x0] ?? 0)),
      );
      const keys = Object.keys(d);
      const values = Object.values(d);
      const key = keys.length === 2 ? keys[keys.length - 1] : keys[keys.length - 2];

      const isRound = () => {
        // check is it stack or not
        const barValue = keys.length === 2 ? values.slice(1) : values.slice(1, -1);

        return barValue[1] === 0 ? true : key === x;
      };

      return styled(styles)(
        <SBar
          key={i}
          __excludeProps={['data', 'scale', 'value']}
          value={d}
          index={i}
          render="path"
          childrenPosition="above"
          fill={color}
          d={width !== 0 ? getHorizontalRect(barX, barY, width, height, radius, isRound()) : ''}
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

function getHorizontalRect(x, y, width, height, radius, isRound) {
  if (isRound) {
    return (
      `M${x},${y}` +
      `h${width - radius}` +
      `a${radius},${radius} 0 0 1 ${radius},${radius}` +
      `v${height - 2 * radius}` +
      `a${radius},${radius} 0 0 1 -${radius},${radius}` +
      `h${radius - width} z`
    );
  }
  return `M${x},${y}` + `h${width}` + `v${height}` + `h-${width} z`;
}

export default createXYElement(HorizontalBarRoot, { Background });
