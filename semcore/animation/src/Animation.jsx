import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { WithAnimationControl } from '@semcore/utils/lib/AnimationControlProvider';

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
    initialAnimation: false,
    timingFunction: 'ease-out',
  };

  static getDerivedStateFromProps(props, state) {
    const wasInvisible = state.wasInvisible || !props.visible;
    if (props.visible || props.preserveNode || state.wasInvisible !== wasInvisible) {
      return { render: true, wasInvisible };
    }
    return state;
  }

  state = {
    render: this.props.visible || this.props.preserveNode,
    wasInvisible: !this.props.visible,
  };

  onAnimationEnd = (e) => {
    e.stopPropagation();
    if (!this.asProps.visible && !this.props.preserveNode) {
      this.setState({ render: false });
    }
  };

  render() {
    const SAnimation = Root;
    const { styles, keyframes, initialAnimation, timingFunction, animationControl } = this.asProps;
    const duration =
      animationControl === 'animations-disabled' ? [0, 0] : propToArray(this.asProps.duration);
    const delay =
      animationControl === 'animations-disabled' ? [0, 0] : propToArray(this.asProps.delay);
    const { render, wasInvisible } = this.state;

    if (!render) return null;

    return sstyled(styles)(
      <SAnimation
        render={Box}
        onAnimationEnd={this.onAnimationEnd}
        durationInitialize={`${duration[0]}ms`}
        durationFinalize={`${duration[1]}ms`}
        delayInitialize={`${delay[0]}ms`}
        delayFinalize={`${delay[1]}ms`}
        timingFunction={timingFunction}
        keyframesInitialize={wasInvisible || initialAnimation ? keyframes[0] : undefined}
        keyframesFinalize={keyframes[1]}
      />,
    );
  }
}

export default WithAnimationControl(createComponent(Animation));
