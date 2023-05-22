import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import contextEnhance from '@semcore/utils/lib/enhances/contextEnhance';
import style from './style/animate.shadow.css';

function propToArray(prop) {
  return Array.isArray(prop) ? prop : [prop, prop];
}

const makeAnimationContextValue = () => {
  const context = {
    onAnimationStartSubscribers: [],
    onAnimationStart: (callback) => {
      context.onAnimationStartSubscribers.push(callback);
      return () => context.onAnimationStartSubscribers.filter((cb) => cb !== callback);
    },
    onAnimationEndSubscribers: [],
    onAnimationEnd: (callback) => {
      context.onAnimationEndSubscribers.push(callback);
      return () => context.onAnimationEndSubscribers.filter((cb) => cb !== callback);
    },
  };
  return context;
};
export const animationContext = React.createContext(null);

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
    animationsDisabled: false,
  };
  static enhance = [contextEnhance(animationContext, 'parentAnimationContext')];

  static getDerivedStateFromProps(props, state) {
    const wasInvisible = state.wasInvisible || !props.visible;
    if (props.visible || props.preserveNode || state.wasInvisible !== wasInvisible) {
      return { render: true, wasInvisible };
    }
    return state;
  }

  state = {
    animationRunning: false,
    render: this.props.visible || this.props.preserveNode,
    wasInvisible: !this.props.visible,
  };

  animationContext = makeAnimationContextValue();

  onAnimationStart = () => {
    const { animationsDisabled, parentAnimationContext } = this.asProps;
    const duration = animationsDisabled ? [0, 0] : propToArray(this.asProps.duration);
    const animationContext = parentAnimationContext ?? this.animationContext;
    animationContext.onAnimationStartSubscribers.forEach((callback) => callback(duration[0]));
  };

  onAnimationEnd = (event) => {
    event.stopPropagation();
    if (!this.asProps.visible && !this.props.preserveNode) {
      this.setState({ render: false });
    }
    const { parentAnimationContext } = this.asProps;
    const animationContext = parentAnimationContext ?? this.animationContext;
    animationContext.onAnimationEndSubscribers.forEach((callback) => callback());
  };

  render() {
    const SAnimation = Root;
    const {
      styles,
      keyframes,
      initialAnimation,
      timingFunction,
      animationsDisabled,
      parentAnimationContext,
    } = this.asProps;
    const animationContextValue = parentAnimationContext ?? this.animationContext;
    const duration = animationsDisabled ? [0, 0] : propToArray(this.asProps.duration);
    const delay = animationsDisabled ? [0, 0] : propToArray(this.asProps.delay);
    const { render, wasInvisible } = this.state;

    if (!render) return null;

    return (
      <animationContext.Provider value={animationContextValue}>
        {sstyled(styles)(
          <SAnimation
            render={Box}
            onAnimationStart={this.onAnimationStart}
            onAnimationEnd={this.onAnimationEnd}
            durationInitialize={`${duration[0]}ms`}
            durationFinalize={`${duration[1]}ms`}
            delayInitialize={`${delay[0]}ms`}
            delayFinalize={`${delay[1]}ms`}
            timingFunction={timingFunction}
            keyframesInitialize={
              wasInvisible || initialAnimation ? keyframes[0] : `totally-no-animations`
            }
            keyframesFinalize={keyframes[1]}
          />,
        )}
      </animationContext.Provider>
    );
  }
}

export default createComponent(Animation);
