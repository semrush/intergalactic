import React from 'react';
import type { Intergalactic, PropGetterFn, UnknownProperties } from '@semcore/core';
import type { InputAddonProps, InputProps, InputValueProps } from '@semcore/input';

export type InputNumberValue = string;
export type InputNumberSize = 'm' | 'l';

/** @deprecated */
export interface IInputNumberProps extends InputNumberProps, UnknownProperties {}
export type InputNumberProps = InputProps & {
  /** Input size
   * @default m
   * */
  size?: InputNumberSize;
};

/** @deprecated */
export interface IInputNumberValueProps extends InputNumberValueProps, UnknownProperties {}
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
  locale?: string;
};

/** @deprecated */
export interface IInputNumberControlsProps extends InputNumberControlsProps, UnknownProperties {}
export type InputNumberControlsProps = InputAddonProps & {
  /** Always displays controls (steppers)
   * @default false
   */
  showControls?: boolean;
};

/** @deprecated */
export interface IInputNumberCtx extends InputNumberCtx, UnknownProperties {}
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
