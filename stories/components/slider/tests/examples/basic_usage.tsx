import Slider from '@semcore/ui/slider';
import type { NSSlider } from '@semcore/ui/slider';
import React from 'react';

export type BasicSliderProps = NSSlider.Props<number> & {
  showKnob?: boolean;
  showBar?: boolean;
};

export const defaultProps: BasicSliderProps = {
  value: undefined,
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showKnob: true,
  showBar: true,
};

const Demo = ({
  value = defaultProps.value,
  defaultValue = defaultProps.defaultValue,
  min = defaultProps.min,
  max = defaultProps.max,
  step = defaultProps.step,
  disabled = defaultProps.disabled,
  showKnob = defaultProps.showKnob,
  showBar = defaultProps.showBar,
}: BasicSliderProps) => {
  return (
    <Slider
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      w={300}
    >
      {showBar && <Slider.Bar />}
      {showKnob && <Slider.Knob />}
    </Slider>
  );
};

export default Demo;
