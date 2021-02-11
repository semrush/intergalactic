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

  static getFilledArray = (axis, length) => {
    return axis === 'category'
      ? Array(length)
          .fill(0)
          .map((el, index) => index)
      : null;
  };

  getBackgroundProps(props, index) {
    console.log(index, '>>>>');
    const { x, y } = this.asProps;
    return { x, y, index };
  }

  render() {
    const SBar = this.Element;
    const { styles, color, x, y, y0, data, scale, hide, offset } = this.asProps;
    console.log(x, y, y0, data, 'x, y, y0, data, ');

    const [xScale, yScale] = scale;

    return data.map((d, i) => {
      return styled(styles)(
        <SBar
          key={i}
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
  const { Element: SBackground, styles, scale, x, y, data, index } = props;
  console.log(x, y, data, index, ' x, y, data index');

  const xIndex = BarRoot.getFilledArray(x, data.length);
  const yIndex = BarRoot.getFilledArray(y, data.length);
  const [xScale, yScale] = scale;
  const xRange = xScale.range();
  const yRange = yScale.range();

  return styled(styles)(
    <>
      {xIndex !== null && xIndex[0] !== null ? (
        <SBackground
          key={index}
          render="rect"
          index={index}
          width={xScale.bandwidth()}
          height={yRange[0] - yRange[1]}
          x={xScale(data[index][x])}
          y={yRange[1]}
        />
      ) : null}
      {yIndex !== null && yIndex[0] !== null ? (
        <SBackground
          key={index}
          render="rect"
          childrenPosition="above"
          index={index}
          width={xRange[1] - xRange[0]}
          height={yScale.bandwidth()}
          x={xRange[0]}
          y={yScale(data[index][y])}
        />
      ) : null}
    </>,
  );
}

export default createXYElement(BarRoot, { Background });
