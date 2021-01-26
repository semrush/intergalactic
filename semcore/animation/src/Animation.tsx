import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface IAnimationProps extends IBoxProps {
  /** The property is responsible for the visibility of the element */
  visible?: boolean;
  /** Animation duration in ms
   * @default 0
   */
  duration?: number | [number, number];
  /** Animation delay in ms
   * @default 0
   */
  delay?: number | [number, number];
  /** Animation titles */
  keyframes?: [string, string];
}

class Animation extends Component<IAnimationProps> {
  static displayName = 'Animation';
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

  get duration() {
    return this.propToArray(this.asProps.duration);
  }

  get delay() {
    return this.propToArray(this.asProps.delay);
  }

  propToArray(prop) {
    return Array.isArray(prop) ? prop : [prop, prop];
  }

  onAnimationEnd = (e) => {
    e.stopPropagation();
    if (!this.asProps.visible) this.setState({ render: false });
  };

  render() {
    const SAnimation = this.Root;
    const { render } = this.state;
    const { styles, visible, keyframes } = this.asProps;
    const { duration, delay } = this;

    if (!render) return null;

    const durationInitializeVar = `${duration[0]}ms`;
    const durationFinalizeVar = `${duration[1]}ms`;
    const delayInitializeVar = `${delay[0]}ms`;
    const delayFinalizeVar = `${delay[1]}ms`;

    return styled(styles)`
      SAnimation {
        animation-fill-mode: both;
        animation-timing-function: ease-out;
        animation-duration: ${durationFinalizeVar};
        animation-delay: ${delayFinalizeVar};
        &:global {
          animation-name: ${keyframes[1]};
        }
      }
      SAnimation[visible] {
        animation-duration: ${durationInitializeVar};
        animation-delay: ${delayInitializeVar};
        &:global {
          animation-name: ${keyframes[0]};
        }
      }
    `(<SAnimation render={Box} visible={visible} onAnimationEnd={this.onAnimationEnd} />);
  }
}

export default createComponent<IAnimationProps>(Animation);
