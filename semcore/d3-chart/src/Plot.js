import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import EventEmitter from '@semcore/utils/lib/eventEmitter';

import style from './style/chart.shadow.css';

class XYPlotRoot extends Component {
  static displayName = 'XYPlot';

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
    this.eventEmitter.emit(`onMouseMoveRoot`, e);
  };

  handlerMouseLeave = (e) => {
    this.eventEmitter.emit(`onMouseLeaveRoot`, e);
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
    const SPlot = this.Root;
    const { styles, width, height } = this.asProps;

    if (!width || !height) return null;

    return styled(styles)(
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

export default createComponent(XYPlotRoot);
