import { createComponent, sstyled, Root, Component } from '@semcore/core';
import contextEnhance from '@semcore/core/lib/utils/enhances/contextEnhance';
import React from 'react';

import { Box } from '../flex-box';
import type { AnimationContext, AnimationProps, Animation as AnimationComponent, AnimationDefaultProps } from './Animation.types';
import style from './style/animate.shadow.css';

type State = {
  animationRunning: boolean;
  render: AnimationProps['visible'] | AnimationProps['preserveNode'];
  wasInvisible: AnimationProps['visible'];
};

function propToArray(prop: any) {
  return Array.isArray(prop) ? prop : [prop, prop];
}

const makeAnimationContextValue = () => {
  const context: AnimationContext = {
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
export const animationContext = React.createContext<AnimationContext | null>(null);

class Animation extends Component<
  AnimationProps,
  typeof Animation.enhance,
  {},
  { parentAnimationContext: AnimationContext },
  State,
  AnimationDefaultProps
> {
  static displayName = 'Animation';
  static style = style;
  static defaultProps: AnimationDefaultProps = {
    visible: false,
    duration: 0,
    delay: 0,
    keyframes: ['', ''],
    initialAnimation: false,
    timingFunction: 'ease-out',
    animationsDisabled: false,
  };

  static enhance = [contextEnhance(animationContext, 'parentAnimationContext')];

  static getDerivedStateFromProps(props: AnimationProps, state: State) {
    const wasInvisible = state.wasInvisible || !props.visible;
    if (props.visible || props.preserveNode || state.wasInvisible !== wasInvisible) {
      return { render: true, wasInvisible };
    }
    return state;
  }

  state: State = {
    animationRunning: false,
    render: this.props.visible || this.props.preserveNode,
    wasInvisible: !this.props.visible,
  };

  animationSupported = false;
  animationContext = makeAnimationContextValue();

  onAnimationStart = () => {
    this.animationSupported = true;
    const { animationsDisabled, parentAnimationContext } = this.asProps;
    const duration = animationsDisabled ? [0, 0] : propToArray(this.asProps.duration);
    const animationContext = parentAnimationContext ?? this.animationContext;
    animationContext.onAnimationStartSubscribers.forEach((callback) => callback(duration[0]));
  };

  onAnimationEnd = () => {
    this.animationSupported = true;
    this.handleAnimationEnd();
  };

  handleAnimationEnd = () => {
    if (!this.asProps.visible && !this.props.preserveNode) {
      this.setState({ render: false });
    }
    const { parentAnimationContext } = this.asProps;
    const animationContext = parentAnimationContext ?? this.animationContext;
    animationContext.onAnimationEndSubscribers.forEach((callback) => callback());
  };

  animationEventFallback = () => {
    if (!this.state.render) return;
    if (this.animationSupported) return;
    let { duration } = this.asProps;
    const { animationsDisabled, visible } = this.asProps;

    duration = Array.isArray(duration) ? duration[1] - duration[0] : duration;
    duration = animationsDisabled ? 0 : duration + 100;

    const delayArr = animationsDisabled ? [0, 0] : propToArray(this.asProps.delay);
    const delay = visible ? delayArr[0] : delayArr[1];

    setTimeout(() => {
      if (this.animationSupported) return;
      this.handleAnimationEnd();
    }, duration + delay);
  };

  componentDidMount() {
    this.animationEventFallback();
  }

  componentDidUpdate(prevProps: AnimationProps, prevState: State) {
    if (prevProps.visible !== this.props.visible || prevState.render !== this.state.render) {
      this.animationEventFallback();
    }
  }

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
              wasInvisible || initialAnimation ? keyframes[0] : 'totally-no-animations'
            }
            keyframesFinalize={keyframes[1]}
          />,
        )}
      </animationContext.Provider>
    );
  }
}

export default createComponent<AnimationComponent, typeof Animation>(Animation);
