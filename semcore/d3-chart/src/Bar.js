import React from 'react';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';

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
    const radius = 2;

    return data.map((d, i) => {
      // TODO: https://github.com/airbnb/visx/blob/2fa674e7d7fdc9cffea13e8bf644d46dd6f0db5b/packages/visx-shape/src/util/getBandwidth.ts#L3
      const barY = yScale(Math.max(d[y0] ?? 0, d[y])) + offset[1];
      const barX = xScale(d[x]) + offset[0];
      const height = Math.abs(
        yScale(d[y]) - Math.min(yScale(yScale.domain()[0]), yScale(d[y0] ?? 0)),
      );
      const width = xScale.bandwidth();
      const keys = Object.keys(d);
      const values = Object.values(d);

      const isRound = () => {
        // check is it stack or not
        const barValue = keys.length === 2 ? values.slice(1) : values.slice(1, -1);

        return barValue[0] === 0 ? true : keys[1] === y;
      };

      return styled(styles)(
        <SBar
          key={i}
          __excludeProps={['data', 'scale', 'value']}
          value={d}
          index={i}
          render="path"
          childrenPosition="above"
          hide={hide}
          fill={color}
          d={height !== 0 ? getRect(barX, barY, width, height, radius, isRound()) : ''}
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

function getRect(x, y, width, height, radius, isRound) {
  if (isRound) {
    return (
      `M${x},${y + radius} ` +
      `a ${radius},${radius} 0 0 1 ${radius},-${radius} ` +
      `h${width - 2 * radius} ` +
      `a ${radius},${radius} 0 0 1 ${radius},${radius} ` +
      `v${height - radius} ` +
      `h-${width} z`
    );
  }
  return `M${x},${y} ` + `h${width} ` + `v${height} ` + `h-${width} z`;
}

export default createXYElement(BarRoot, { Background });
