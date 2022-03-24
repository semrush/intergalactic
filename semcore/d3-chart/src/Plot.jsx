import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import EventEmitter from '@semcore/utils/lib/eventEmitter';
import { eventToPoint } from './utils';
import style from './style/plot.shadow.css';

class PlotRoot extends Component {
  static displayName = 'Plot';
  static style = style;

  constructor(props) {
    super(props);
    this.eventEmitter = props.eventEmitter || new EventEmitter();
  }

  static defaultProps = () => ({
    width: 0,
    height: 0,
  });

  rootRef = React.createRef();

  handlerMouseMove = (e) => {
    const { scale } = this.asProps;
    this.eventEmitter.emit(`onMouseMoveRoot`, e);

    if (scale) {
      const [xScale, yScale] = scale;
      const [pX, pY] = eventToPoint(e, this.rootRef.current);
      const [minX, maxX] = xScale.range();
      const [maxY, minY] = yScale.range();

      if (pX >= minX && pX <= maxX && pY >= minY && pY <= maxY) {
        this.eventEmitter.emit('onMouseMoveChart', e);
      } else {
        this.eventEmitter.emit('onMouseLeaveChart', e);
      }
    }
  };

  handlerMouseLeave = (e) => {
    this.eventEmitter.emit(`onMouseLeaveRoot`, e);
    this.eventEmitter.emit('onMouseLeaveChart', e);
  };

  setContext() {
    const { scale, data, width, height } = this.asProps;
    return {
      $rootProps: {
        size: [width, height],
        data: data,
        scale: scale,
        eventEmitter: this.eventEmitter,
        rootRef: this.rootRef,
      },
    };
  }

  render() {
    const SPlot = Root;
    const { styles, width, height } = this.asProps;

    if (!width || !height) return null;

    return sstyled(styles)(
      <SPlot
        render={Box}
        tag="svg"
        __excludeProps={['data', 'scale']}
        ref={this.rootRef}
        onMouseMove={this.handlerMouseMove}
        onMouseLeave={this.handlerMouseLeave}
      />,
    );
  }
}

export default createComponent(PlotRoot);
