import { CProps } from '@semcore/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IBoxProps } from '@semcore/flex-box';
import React from 'react';

export interface ISliderProps extends IBoxProps {
  /** Numeric value
   * @default 0
   */
  value?: number;
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
  /** Slider color
   * @default #00000010
   */
  background?: string;
  /**
   * Handler for changing the value
   */
  onChange?: (value: string, event: React.SyntheticEvent) => void;
  /**
   * Disable element
   */
  disabled?: boolean;
}

export interface ISliderKnobProps extends IBoxProps {
  /** Knob color
   * @default #2b94e1
   */
  color?: string;
}

export interface ISliderBarProps extends IBoxProps {
  /** Bar color
   * @default #2b94e1
   */
  color?: string;
}

declare const Slider: (<T>(props: CProps<ISliderProps & T>) => ReturnEl) & {
  Knob: <T>(props: ISliderKnobProps & T) => ReturnEl;
  Bar: <T>(props: ISliderBarProps & T) => ReturnEl;
};

export default Slider;
