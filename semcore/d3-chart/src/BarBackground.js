import React from 'react';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import style from './style/background.shadow.css';

class BarBackgroundRoot extends Component {
  static displayName = 'BarBackground';

  static style = style;

  state = {
    xIndex: [],
    yIndex: [],
  };

  componentDidMount() {
    const { data, x, y } = this.asProps;

    this.setState({
      xIndex:
        x === undefined
          ? null
          : Array(data.length)
              .fill(0)
              .map((el, ind) => ind),
      yIndex:
        y === undefined
          ? null
          : Array(data.length)
              .fill(0)
              .map((el, ind) => ind),
    });
  }

  render() {
    const SBarBackground = this.Element;
    const { styles, x, y, data, scale } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;
    const xRange = xScale.range();
    const yRange = yScale.range();

    return styled(styles)(
      <>
        {xIndex !== null && xIndex[0] !== null
          ? xIndex.map((ind) => (
              <SBarBackground
                render="rect"
                index={ind}
                width={xScale.bandwidth()}
                height={yRange[0] - yRange[1]}
                x={xScale(data[ind][x])}
                y={yRange[1]}
              />
            ))
          : null}
        {yIndex !== null && yIndex[0] !== null
          ? yIndex.map((ind) => (
              <SBarBackground
                render="rect"
                index={ind}
                width={xRange[1] - xRange[0]}
                height={yScale.bandwidth()}
                x={xRange[0]}
                y={yScale(data[ind][y])}
              />
            ))
          : null}
      </>,
    );
  }
}

export default createXYElement(BarBackgroundRoot);
