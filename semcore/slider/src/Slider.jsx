import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Flex, Box } from '@semcore/flex-box';
import reactToText from '@semcore/core/lib/utils/reactToText';

import style from './style/slider.shadow.css';

const convertValueToPercent = (value, min, max) => {
  if (value > max) return 100;
  if (value < min) return 0;
  return ((value - min) / (max - min)) * 100;
};

class SliderRoot extends Component {
  static displayName = 'Slider';
  static style = style;

  sliderRef = React.createRef(null);

  static defaultProps = () => ({
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    children: (
      <>
        <Slider.Bar />
        <Slider.Knob />
        <Slider.Options>
          <Slider.Item />
        </Slider.Options>
      </>
    ),
  });

  handleRef = (node) => {
    this.sliderRef.current = node;
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  getKnobProps() {
    const { min, max, disabled, options } = this.asProps;

    return {
      value: this.getNumericValue(),
      min,
      max,
      disabled,
      options,
    };
  }

  getBarProps() {
    const { min, max, disabled, options } = this.asProps;

    return {
      value: this.getNumericValue(),
      min,
      max,
      disabled,
      options,
    };
  }

  getOptionsProps() {
    const { options } = this.asProps;

    return { options };
  }

  getItemProps(_, index) {
    const { options } = this.asProps;
    const option = options[index];

    return {
      key: option.value,
      value: option.value,
      children: option.label,
    };
  }

  handleMouseEnd = () => {
    document.removeEventListener('touchmove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseEnd);
    document.removeEventListener('touchend', this.handleMouseEnd);
  };

  handleMouseMove = (event) => {
    event.preventDefault();

    document.addEventListener('touchmove', this.handleMouseMove);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseEnd);
    document.addEventListener('touchend', this.handleMouseEnd);

    const { min, max, step, options } = this.asProps;

    const sliderSize = this.sliderRef.current.offsetWidth;
    const clientX = event.clientX ?? event.touches[0].clientX;
    const newLeft = clientX - this.sliderRef.current.getBoundingClientRect().left;

    if (newLeft <= 0) {
      const resolvedMin = options ? options[0]?.value : min;
      this.handlers.value(resolvedMin, event);
    } else if (newLeft >= sliderSize) {
      const lastOption = options?.[options?.length - 1];
      const resolvedMax = options ? lastOption?.value : max;
      this.handlers.value(resolvedMax, event);
    } else {
      const relativeValue = newLeft / sliderSize;
      const relativeStep = step / (max - min);
      const countSteps = Math.round(relativeValue / relativeStep);
      const numericValue = countSteps * step + min;
      const resolvedValue = options ? options[countSteps * step]?.value : numericValue;

      this.handlers.value(resolvedValue, event);
    }
  };

  handleDragStart = () => false;

  handleKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();

    const { min, max, step, options } = this.asProps;
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 1;
    let value = this.getNumericValue() + step * direction;

    if (value > max) value = max;
    if (value < min) value = min;
    if (options) {
      const option = options[value - (min ?? 0)];
      this.handlers.value(option.value, event);
    } else {
      this.handlers.value(value, event);
    }
  };

  getNumericValue = () => {
    const { value, options, min, max, defaultValue } = this.asProps;
    if (!options) return value;
    const resolvedIndex = options.findIndex((option) => option.value === value);
    if (resolvedIndex === -1) return defaultValue;
    if (resolvedIndex < min) return min;
    if (min !== undefined) {
      if (resolvedIndex + min > max) return max;
    } else {
      if (resolvedIndex > max) return max;
    }

    return resolvedIndex + (min ?? 0);
  };

  resolveLabel = (numericValue) => {
    const { min, options } = this.asProps;
    if (!options) return undefined;
    const option = options[numericValue - (min ?? 0)];

    return reactToText(option?.label);
  };

  render() {
    const SSlider = Root;
    const SInput = Box;
    const { Children, styles, value, min, max, name, options } = this.asProps;

    const defaultMin = options ? 0 : undefined;
    const defaultMax = options ? options.length : undefined;
    const numericValue = this.getNumericValue();
    const label = this.resolveLabel(numericValue);

    return sstyled(styles)(
      <>
        <SSlider
          render={Box}
          tag='button'
          type='button'
          tabIndex={0}
          ref={this.handleRef}
          onMouseDown={this.handleMouseMove}
          onTouchMove={this.handleMouseMove}
          onMouseUp={this.handleMouseEnd}
          onTouchEnd={this.handleMouseEnd}
          onDragStart={this.handleDragStart}
          onKeyDown={this.handleKeyDown}
          role='slider'
          aria-orientation='horizontal'
          aria-valuemin={min ?? defaultMin}
          aria-valuemax={max ?? defaultMax}
          aria-valuetext={label}
          aria-valuenow={numericValue}
        >
          <Children />
          <SInput tag='input' type='hidden' value={value ?? ''} name={name} aria-hidden />
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

function Options({ styles, options, Children }) {
  const SSliderOptions = Root;

  return sstyled(styles)(
    <SSliderOptions render={Flex} mt={1} justifyContent='space-between'>
      {(options ?? []).map((option) => (
        <Children key={option.value}>{option.label}</Children>
      ))}
    </SSliderOptions>,
  );
}

function Item({ styles, Children }) {
  const SSliderOption = Root;

  return sstyled(styles)(
    <SSliderOption render={Box}>
      <Children />
    </SSliderOption>,
  );
}

const Slider = createComponent(SliderRoot, {
  Bar,
  Knob,
  Options,
  Item,
});

export const wrapSlider = (wrapper) => wrapper;

export default Slider;
