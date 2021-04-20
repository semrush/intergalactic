import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { findDOMNode } from 'react-dom';

import style from './style/slider.shadow.css';

class SliderRoot extends Component {
  static displayName = 'Slider';
  static style = style;
  $slider;
  $knob;
  $bar;

  static defaultProps = () => ({
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    children: (
      <>
        <Slider.Bar />
        <Slider.Knob />
      </>
    ),
    color: '#2B94E1',
    background: '#00000010',
  });

  refKnob = (node) => (this.$knob = findDOMNode(node));
  refSlider = (node) => (this.$slider = findDOMNode(node));
  refBar = (node) => (this.$bar = findDOMNode(node));

  getKnobProps() {
    const { value, color, min, max, step, disabled } = this.asProps;
    return {
      value,
      color,
      min,
      max,
      step,
      disabled,
      ref: this.refKnob,
    };
  }

  getBarProps() {
    const { value, color, min, max, step, disabled } = this.asProps;
    return {
      value,
      color,
      min,
      max,
      step,
      disabled,
      ref: this.refBar,
    };
  }

  uncontrolledProps() {
    return {
      value: (value) => value,
    };
  }

  updateValue = (value, e, width, min, max, step) => {
    const relativeValue = (value * max) / width;
    const countSteps = Math.round(relativeValue / step);
    this.handlers.value(countSteps * step, e);
  };

  handleMove = (e) => {
    const { min, max, step } = this.asProps;
    e.preventDefault();
    const slider = this.$slider;
    const knob = this.$knob;
    const bar = this.$bar;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
      let newLeft = e.clientX - slider.getBoundingClientRect().left - knob.offsetWidth / 2;

      if (newLeft < 0) {
        newLeft = 0;
      }
      const rightEdge = slider.offsetWidth - knob.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      knob.style.left = newLeft + 'px';
      bar.style.width = newLeft + 'px';

      return newLeft;
    }

    this.updateValue(onMouseMove(e), e, slider.offsetWidth, min, max, step);

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('click', onMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  render() {
    const { Root: SSlider } = this;
    const { Children, styles, disabled, background } = this.asProps;
    const SInput = Box;

    return styled(styles)`
      SSlider {
        background-color: ${background};
      }
    `(
      <>
        <SSlider
          render={Box}
          disabled={disabled}
          ref={this.refSlider}
          onMouseDown={this.handleMove}
          onMouseUp={this.handleMove}
          onDragStart={() => false}
        >
          <Children />
        </SSlider>
        <SInput tag="input" value={this.value} onChange={this.handleMove} />
      </>,
    );
  }
}

function convertValueToPercent(value, min, max) {
  if (value > max) return 100;
  else return ((value - min) / (max - min)) * 100;
}

function Bar(props) {
  const { Root: SBar, styles, value, refBar, min, max, step, color, disabled } = props;
  const width = `calc(${convertValueToPercent(value, min, max, step)}% - 10px)`;
  return styled(styles)`
    SBar {
      width: ${width};
      background-color: ${color};
    }
  `(<SBar render={Box} disabled={disabled} ref={refBar} />);
}

function Knob(props) {
  const { Root: SKnob, styles, value, refKnob, min, max, step, color, disabled } = props;
  const left = `calc(${convertValueToPercent(value, min, max, step)}% - 10px)`;

  return styled(styles)`
    SKnob {
      left: ${left};
      border-color: ${color};
    }
  `(<SKnob render={Box} disabled={disabled} ref={refKnob} />);
}

const Slider = createComponent(SliderRoot, { Bar, Knob });
export default Slider;
