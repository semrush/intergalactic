import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps, IFlexProps } from '@semcore/flex-box';

interface ISliderContext {
  getOptionsProps: PropGetterFn;
  getItemProps: PropGetterFn;
}
interface ISliderHandlers {
  value: (index: string | number) => void;
}

export type SliderOption<OptionValue extends stirng | number> = {
  value: OptionValue;
  label: React.ReactNode;
};
export interface ISliderProps<Value extends string | number> extends IBoxProps {
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

  options?: SliderOption[];
}

interface ISliderOptionsProps extends IFlexProps {}
interface ISliderItemProps extends IBoxProps {}

declare const Slider: (<T>(props: CProps<ISliderProps & T>) => ReturnEl) & {
  Knob: typeof Box;
  Bar: typeof Box;
  Options: <T>(props: CProps<ISliderOptionsProps & T, ISliderContext, ISliderHandlers>) => ReturnEl;
  Item: <T>(props: CProps<ISliderItemProps & T, ISliderContext, ISliderHandlers>) => ReturnEl;
};

export default Slider;
