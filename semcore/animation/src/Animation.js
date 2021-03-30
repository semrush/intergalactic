import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

import style from './style/animate.shadow.css';

function propToArray(prop) {
  return Array.isArray(prop) ? prop : [prop, prop];
}

class Animation extends Component {
  static displayName = 'Animation';
  static style = style;
  static defaultProps = {
    visible: false,
    duration: 0,
    delay: 0,
    keyframes: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.visible) return { render: true };
    return state;
  }

  state = {
    render: this.props.visible,
  };

  onAnimationEnd = (e) => {
    e.stopPropagation();
    if (!this.asProps.visible) this.setState({ render: false });
  };

  render() {
    const SAnimation = Root;
    const { styles, keyframes } = this.asProps;
    const duration = propToArray(this.asProps.duration);
    const delay = propToArray(this.asProps.delay);
    const { render } = this.state;

    if (!render) return null;

    return sstyled(styles)(
      <SAnimation
        render={Box}
        onAnimationEnd={this.onAnimationEnd}
        durationInitialize={`${duration[0]}ms`}
        durationFinalize={`${duration[1]}ms`}
        delayInitialize={`${delay[0]}ms`}
        delayFinalize={`${delay[1]}ms`}
        keyframesInitialize={keyframes[0]}
        keyframesFinalize={keyframes[1]}
      />,
    );
  }
}

export default createComponent(Animation);
