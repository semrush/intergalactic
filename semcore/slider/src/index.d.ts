import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';

interface ISliderContext {
  getOptionsProps: PropGetterFn;
  getItemProps: PropGetterFn;
}
interface ISliderHandlers {
  value: (index: string | number) => void;
}

export type SliderOption<OptionValue extends string | number> = {
  value: OptionValue;
  label: React.ReactNode;
};

/** @deprecated */
export interface ISliderProps<Value extends string | number = string | number>
  extends SliderProps<Value>,
    UnknownProperties {}
export type SliderProps<Value extends string | number = string | number> = BoxProps & {
  /** Numeric value
   */
  value?: Value;
  /** Numeric default value
   * @default 0
   */
  defaultValue?: Value;
  /** Minimum value
   * @default 0
   */
  min?: number;
  /** Maximum value
   * @default 100
   */
  max?: number;
  /** Value change step
   * @default 1
   */
  step?: number;
  /**
   * Handler for changing the value
   */
  onChange?: (value: Value, event: React.SyntheticEvent) => void;
  /**
   * Disable element
   */
  disabled?: boolean;

  options?: SliderOption<Value>[];
};

type SliderOptionsProps = FlexProps;
type SliderItemProps = BoxProps;

declare const Slider: Intergalactic.Component<'div', SliderProps> & {
  Knob: typeof Box;
  Bar: typeof Box;
  Options: Intergalactic.Component<
    'div',
    SliderOptionsProps,
    SliderContext,
    [handlers: SliderHandlers]
  >;
  Item: Intergalactic.Component<'div', SliderItemProps, SliderContext, [handlers: SliderHandlers]>;
};

export default Slider;
