import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/slider.shadow.css';

function convertValueToPercent(value, min, max) {
  if (value > max) return 100;
  if (value < min) return 0;
  return ((value - min) / (max - min)) * 100;
}

class SliderRoot extends Component {
  static displayName = 'Slider';
  static style = style;
  $slider;

  static enhance = [keyboardFocusEnhance()];

  static defaultProps = () => ({
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    children: (
      <>
        <Slider.Bar />
        <Slider.Knob />
      </>
    ),
  });

  refSlider = (node) => (this.$slider = node);

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  getKnobProps() {
    const { value, min, max, disabled } = this.asProps;
    return {
      value,
      min,
      max,
      disabled,
    };
  }

  getBarProps() {
    const { value, min, max, disabled } = this.asProps;
    return {
      value,
      min,
      max,
      disabled,
    };
  }

  handleMouseEnd = () => {
    document.removeEventListener('touchmove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseEnd);
    document.removeEventListener('touchend', this.handleMouseEnd);
  };

  handleMouseMove = (e) => {
    e.preventDefault();

    document.addEventListener('touchmove', this.handleMouseMove);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseEnd);
    document.addEventListener('touchend', this.handleMouseEnd);

    const { min, max, step } = this.asProps;

    const slider = this.$slider;
    const sliderSize = slider.offsetWidth;
    const clientX = e.clientX ?? e.touches[0].clientX;
    const newLeft = clientX - slider.getBoundingClientRect().left;

    if (newLeft <= 0) {
      this.handlers.value(min, e);
    } else if (newLeft >= sliderSize) {
      this.handlers.value(max, e);
    } else {
      const relativeValue = newLeft / sliderSize;
      const relativeStep = step / (max - min);
      const countSteps = Math.round(relativeValue / relativeStep);
      const currentValue = countSteps * step + min;

      this.handlers.value(currentValue, e);
    }
  };

  onKeyPressed = (e) => {
    const { value, min, max, step } = this.asProps;

    switch (e.keyCode) {
      case 39:
      case 38:
        e.preventDefault();
        this.handlers.value(Math.min(value + step, max), e);
        break;
      case 37:
      case 40:
        e.preventDefault();
        this.handlers.value(Math.max(value - step, min), e);
        break;
    }
  };

  render() {
    const SSlider = Root;
    const SInput = Box;
    const { Children, styles, value, min, max, name } = this.asProps;

    return sstyled(styles)(
      <>
        <SSlider
          render={Box}
          ref={this.refSlider}
          onMouseDown={this.handleMouseMove}
          onTouchMove={this.handleMouseMove}
          onMouseUp={this.handleMouseEnd}
          onTouchEnd={this.handleMouseEnd}
          onDragStart={() => false}
          onKeyDown={this.onKeyPressed}
          role="slider"
          aria-orientation="horizontal"
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
        >
          <Children />
          <SInput tag="input" type="hidden" value={value} name={name} />
        </SSlider>
      </>,
    );
  }
}

function Bar(props) {
  const SBar = Root;
  const { styles, value, min, max } = props;

  return sstyled(styles)(<SBar render={Box} w={`${convertValueToPercent(value, min, max)}%`} />);
}

function Knob(props) {
  const SKnob = Root;
  const { styles, value, min, max } = props;
  return sstyled(styles)(
    <SKnob render={Box} left={`${convertValueToPercent(value, min, max)}%`} />,
  );
}

const Slider = createComponent(SliderRoot, { Bar, Knob });
export default Slider;
