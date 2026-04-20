import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { InputAddonProps, InputProps, InputValueProps } from '@semcore/input';
import type React from 'react';

export type InputNumberValue = string;
export type InputNumberSize = 'm' | 'l';

export type InputNumberProps = InputProps & {
  /** Input size
   * @default m
   * */
  size?: InputNumberSize;
  /**
   * Locale value
   */
  locale?: string;
};

export type InputNumberValueProps = InputValueProps & {
  /** Minimum value
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number;
  /** Maximum value
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
  /** Value change step
   * @default 1
   */
  step?: number;
  /** Numeric value */
  value?: InputNumberValue;
  /** Called when the input value changes, it returns its current value in numeric format */
  onChange?: (value: InputNumberValue, event?: React.SyntheticEvent<HTMLInputElement>) => void;
};

export type InputNumberControlsProps = InputAddonProps & {
  /** Always displays controls (steppers)
   * @default false
   */
  showControls?: boolean;
};

export type InputNumberCtx = {
  getValueProps: PropGetterFn;
  getControlsProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};

declare const InputNumber: Intergalactic.Component<'div', InputNumberProps, InputNumberCtx> & {
  Value: Intergalactic.Component<'input', InputNumberValueProps>;
  Controls: Intergalactic.Component<'div', InputNumberControlsProps>;
  Addon: Intergalactic.Component<'div', InputAddonProps>;
};

export default InputNumber;

declare const IncrementIcon: React.FC;
declare const DecrementIcon: React.FC;
declare const parseValueWithMinMax: (value: number, min?: number, max?: number) => number;

export { IncrementIcon, DecrementIcon, parseValueWithMinMax };
