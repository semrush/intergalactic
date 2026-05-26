import { Flex, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { sstyled, Root, Component, createComponent } from '@semcore/core';
import reactToText from '@semcore/core/lib/utils/reactToText';
import React from 'react';

import type { NSSlider } from './Slider.type';
import style from './style/slider.shadow.css';

const FALLBACK_VALUE = 0;

const convertValueToPercent = (value: number, min: number, max: number) => {
  if (value > max) return 100;
  if (value < min) return 0;
  return ((value - min) / (max - min)) * 100;
};
class SliderRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSSlider.Component>,
  [],
  NSSlider.Handlers,
  {},
  {},
  NSSlider.DefaultProps
> {
  static displayName = 'Slider';
  static style = style;

  sliderRef = React.createRef<HTMLButtonElement>();

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

  getItemProps(_: NSSlider.Item.Props, index: number) {
    const { options } = this.asProps;
    const option = options?.[index];

    return {
      key: option?.value,
      value: option?.value,
      children: option?.label,
    };
  }

  handleMouseEnd = () => {
    document.removeEventListener('touchmove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseEnd);
    document.removeEventListener('touchend', this.handleMouseEnd);
  };

  handleMouseMove = (event: MouseEvent | TouchEvent | React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!this.sliderRef.current) return;

    document.addEventListener('touchmove', this.handleMouseMove);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseEnd);
    document.addEventListener('touchend', this.handleMouseEnd);

    const { min, max, step, options } = this.asProps;

    const sliderSize = this.sliderRef.current.offsetWidth;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
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

  handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
      this.handleSlideStep(event);
    }

    if (event.key === 'Home') {
      this.slideToMinValue(event);
    }

    if (event.key === 'End') {
      this.slideToMaxValue(event);
    }
  };

  handleSlideStep(event: React.KeyboardEvent<HTMLButtonElement>) {
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
  }

  slideToMinValue(event: React.KeyboardEvent<HTMLButtonElement>) {
    event.preventDefault();

    const { min, options } = this.asProps;
    let value: NSSlider.Value = min;

    if (options) {
      value = options[0].value;
    }

    this.handlers.value(value, event);
  }

  slideToMaxValue(event: React.KeyboardEvent<HTMLButtonElement>) {
    event.preventDefault();

    const { max, options } = this.asProps;
    let value: NSSlider.Value = max;

    if (options) {
      value = options[options.length - 1].value;
    }

    this.handlers.value(value, event);
  }

  getNumericValue = (): number => {
    const { value, options, min, max, defaultValue } = this.asProps;

    if (!options) {
      const numeric = Number(value);
      if (!isNaN(numeric)) return numeric;

      const numericDefault = Number(defaultValue);
      if (!isNaN(numericDefault)) return numericDefault;

      return FALLBACK_VALUE;
    }

    const index = options.findIndex((option) => option.value === value);

    if (index === -1) {
      const numericDefault = Number(defaultValue);
      return isNaN(numericDefault) ? FALLBACK_VALUE : numericDefault;
    }

    const result = index + min;

    if (index < min) return min;
    if (result > max) return max;

    return result;
  };

  resolveLabel = (numericValue: number) => {
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
          ref={this.sliderRef}
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

function Bar(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSSlider.Bar.Component, typeof SliderRoot, 'Bar'>,
) {
  const SBar = Root;
  const { styles, value, min, max } = props;

  return sstyled(styles)(<SBar render={Box} w={`${convertValueToPercent(value, min, max)}%`} />);
}

function Knob(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSSlider.Knob.Component, typeof SliderRoot, 'Knob'>,
) {
  const SKnob = Root;
  const { styles, value, min, max } = props;

  return sstyled(styles)(
    <SKnob render={Box} left={`${convertValueToPercent(value, min, max)}%`} />,
  );
}

function Options(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSSlider.Options.Component, typeof SliderRoot, 'Options'>,
) {
  const { styles, options, Children } = props;
  const SSliderOptions = Root;

  return sstyled(styles)(
    <SSliderOptions render={Flex} mt={1} justifyContent='space-between'>
      {(options ?? []).map((option) => (
        <Children key={option.value}>{option.label}</Children>
      ))}
    </SSliderOptions>,
  );
}

function Item(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSSlider.Item.Component, typeof SliderRoot, 'Item'>,
) {
  const { styles, Children } = props;
  const SSliderOption = Root;

  return sstyled(styles)(
    <SSliderOption render={Box}>
      <Children />
    </SSliderOption>,
  );
}

const Slider = createComponent<
  NSSlider.Component,
  typeof SliderRoot
>(SliderRoot, {
  Bar,
  Knob,
  Options,
  Item,
});

export const wrapSlider = <PropsExtending extends {}>(wrapper: (
  props: Intergalactic.InternalTypings.UntypeRefAndTag<
    Intergalactic.InternalTypings.ComponentPropsNesting<NSSlider.WrapperComponent>
  > &
  PropsExtending,
) => React.ReactNode) => wrapper as NSSlider.WrapperComponent<PropsExtending>;

export default Slider;
