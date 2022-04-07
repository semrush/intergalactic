import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?:
    | ((props: Props & Ctx, handlers: UCProps) => React.ReactNode)
    | React.ReactNode
    | React.ReactNode[];
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
  onConfirm?: (
    value: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => void;
  /**
   * Fired with value (or defaultValue) that was provided during component mount when user clicks cancel control or hits `Escape`
   */
  onCancel?: (
    prevValue: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => void;
  /**
   * Text value of input. Should be used with `onChange` property together
   */
  value?: string;
  /**
   * Initial text value of input
   */
  defaultValue?: string;
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
   * defines callback (`onCancel` or `onConfirm`) triggered when `blur` event out of container fired
   * Triggered after all previous macrotasks completed (internally called inside of `setTimeout`)
   */
  onBlurBehavior?: 'cancel' | 'confirm';
}

export interface IInlineInputAddonProps extends IBoxProps {}
export interface IInlineInputValueProps extends IBoxProps {
  /**
   * id attribute of input tag
   */
  id?: string;
  /**
   * when `true`, element is focused immediately after mount
   */
  autoFocus?: boolean;
  /**
   * value of input tag
   */
  value?: string;
  /**
   * uncontrolled value of input tag
   */
  defaultValue?: string;
  /**
   * callback invoked on every change of input tag value
   */
  onChange?: (value: string, event: React.ChangeEvent) => void;
  /**
   * visual state of component
   */
  state?: 'normal' | 'valid' | 'invalid';
  /**
   * shows spinner in `InlineInput.ConfirmControl` and disables other interactive elements
   */
  loading?: boolean;
  /**
   * disables interactive elements
   */
  disabled?: boolean;
  /**
   * gray text in empty input tag
   */
  placeholder?: string;
}
export interface IInlineInputConfirmControlProps extends IBoxProps {
  /**
   * Text of tooltip
   * @default Confirm
   */
  title?: string;
  /**
   * Icon component
   * @default CheckM
   */
  icon?: React.FC;
}
export interface IInlineInputCancelControlProps extends IBoxProps {
  /**
   * Text of tooltip
   * @default Cancel
   */
  title?: string;
  /**
   * Icon component
   * @default CloseM
   */
  icon?: React.FC;
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
