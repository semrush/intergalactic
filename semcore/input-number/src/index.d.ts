import React from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IInputAddonProps, IInputProps, IInputValueProps } from '@semcore/input';
import {
  IButtonAddonProps,
  IButtonContext,
  IButtonProps,
  IButtonTextProps,
} from '../../button/src';

export type InputNumberValue = string;
export type InputNumberSize = 'm' | 'l' | 'xl';

export interface IInputNumberProps extends IInputProps {
  /** Input size
   * @default m
   * */
  size?: InputNumberSize;
}

export interface IInputNumberValueProps extends IInputValueProps {
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
}

export interface IInputNumberControlsProps extends IInputAddonProps {
  /** Always displays controls (steppers)
   * @default false
   */
  showControls?: boolean;
}

export interface IInputNumberCtx {
  getValueProps: PropGetterFn;
  getControlsProps: PropGetterFn;
  getAddonProps: PropGetterFn;
}

declare const InputNumber: (<T>(
  props: CProps<IInputNumberProps & T, IInputNumberCtx>,
) => ReturnEl) & {
  Value: <T>(props: IInputNumberValueProps & T) => ReturnEl;
  Controls: <T>(props: IInputNumberControlsProps & T) => ReturnEl;
  Addon: <T>(props: IInputAddonProps & T) => ReturnEl;
};

export default InputNumber;
