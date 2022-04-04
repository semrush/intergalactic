import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactElement) | React.ReactElement;
};
/* utils type */

export interface IInlineInputProps extends IBoxProps {
  /**
   * Visual state of inline input
   * @default normal
   */
  state?: 'normal' | 'valid' | 'invalid';
  /**
   * Disabled input and shows spinner instead of confirm control
   * @default false
   */
  loading?: boolean;
  /**
   * Disabled input and controls
   * @default false
   */
  disabled?: boolean;
  /**
   * Fired with entered value when user clicks confirm control or hits `Enter` or `Space`
   */
  onConfirm?: (value: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Fired with value (or defaultValue) that was provided during component mount when user clicks cancel control or hits `Escape`
   */
  onCancel?: (prevValue: string) => void;
  /**
   * Text value of input. Should be used with `onChange` property together
   */
  value?: string;
  /**
   * Initial text value of input
   */
  defaultValue?: string;
  /**
   * Tooltip and aria-label text of the confirm control
   * @default Confirm
   */
  confirmText?: string;
  /**
   * Tooltip and aria-label text of the cancel control
   * @default Cancel
   */
  cancelText?: string;
  /**
   * Makes component to catch browser focus on component mount
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Gray text displayed in empty input
   */
  placeholder?: string;
  /**
   * `id` attribute of `<input />` dom tag. Use it to attach `<label />` via `htmlFor` attribute to `<input />` tag
   */
  inputId?: string;
  /**
   * Fired on every input value change. Should be used with `value` property together
   */
  onChange?: (value: string, event: React.ChangeEvent) => void;
  /**
   * Fired when browser focus leaves component.
   */
  onBlur?: (event: React.FocusEvent) => void;
  /**
   * Fired when browser focus enters component.
   */
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * @description defines callback (`onCancel` or `onConfirm`) triggered when `blur` event out of container fired
   * Triggered after all previous macrotasks completed (internally called inside of `setTimeout`)
   */
  onBlurBehavior?: 'cancel' | 'confirm';
}

export interface IInlineInputAddonProps extends IBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';
}
export interface IInlineInputValueProps extends IBoxProps {
  id?: string;
  size?: 's' | 'm' | 'l' | 'xl';
  autoFocus?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  state?: 'normal' | 'valid' | 'invalid';
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}
export interface IInlineInputConfirmControlProps extends IBoxProps {
  onConfirm?: (value: string) => void;
  /**
   * @default "Confirm"
   */
  confirmText?: string;
}
export interface IInlineInputCancelControlProps extends IBoxProps {
  onCancel?: (prevValue: string) => void;
  /**
   * @default "Cancel"
   */
  cancelText?: string;
}

interface IInlineInputCtx {
  geAddonProps: PropGetterFn;
  getConfirmControlProps: PropGetterFn;
  getCancelControlProps: PropGetterFn;
  getValueProps: PropGetterFn;
}

declare const InlineInput: (<T>(
  props: CProps<IInlineInputProps & T, IInlineInputCtx>,
) => React.ReactElement) & {
  Addon: <T>(props: CProps<IInlineInputAddonProps & T, IInlineInputProps>) => React.ReactElement;
  Value: <T>(props: CProps<IInlineInputValueProps & T, IInlineInputProps>) => React.ReactElement;
  ConfirmControl: <T>(
    props: CProps<IInlineInputConfirmControlProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  CancelControl: <T>(
    props: CProps<IInlineInputCancelControlProps & T, IInlineInputProps>,
  ) => React.ReactElement;
};
export default InlineInput;
