import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface ISliderProps extends IBoxProps {
  /** Numeric value
   */
  value?: number;
  /** Numeric default value
   * @default 0
   */
  defaultValue?: number;
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
  onChange?: (value: number, event: React.SyntheticEvent) => void;
  /**
   * Disable element
   */
  disabled?: boolean;
}

declare const Slider: (<T>(props: CProps<ISliderProps & T>) => ReturnEl) & {
  Knob: typeof Box;
  Bar: typeof Box;
};

export default Slider;
