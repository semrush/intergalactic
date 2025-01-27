import type React from 'react';
import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';
import type { ButtonLinkComponent } from '@semcore/button';

/** @deprecated */
export interface IInlineInputProps extends InlineInputProps, UnknownProperties {}
export type InlineInputProps = BoxProps & {
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
   * defines callback (`onCancel` or `onConfirm`) triggered when `blur` event out of container fired
   * Triggered after all previous macrotasks completed (internally called inside of `setTimeout`)
   */
  onBlurBehavior?: 'cancel' | 'confirm' | 'none';
  locale?: string;
};

/** @deprecated */
export interface IInlineInputAddonProps extends InlineInputAddonProps, UnknownProperties {}
export type InlineInputAddonProps = BoxProps & {};
/** @deprecated */
export interface IInlineInputValueProps extends InlineInputValueProps, UnknownProperties {}
export type InlineInputValueProps = BoxProps & {
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
};
/** @deprecated */
export interface IInlineInputConfirmControlProps
  extends InlineInputConfirmControlProps,
    UnknownProperties {}
export type InlineInputConfirmControlProps = BoxProps & {
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
};
/** @deprecated */
export interface IInlineInputCancelControlProps
  extends InlineInputCancelControlProps,
    UnknownProperties {}
export type InlineInputCancelControlProps = BoxProps & {
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
};

type InlineInputCtx = {
  getAddonProps: PropGetterFn;
  getConfirmControlProps: PropGetterFn;
  getCancelControlProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

declare const InlineInput: Intergalactic.Component<'div', InlineInputProps, InlineInputCtx> & {
  Addon: Intergalactic.Component<'div', InlineInputAddonProps, InlineInputProps>;
  Value: Intergalactic.Component<'input', InlineInputValueProps, InlineInputProps>;
  ConfirmControl: Intergalactic.Component<
    ButtonLinkComponent,
    InlineInputConfirmControlProps,
    InlineInputProps
  >;
  CancelControl: Intergalactic.Component<
    ButtonLinkComponent,
    InlineInputCancelControlProps,
    InlineInputProps
  >;
  NumberValue: Intergalactic.Component<'div', {}, InlineInputProps>;
  NumberControls: Intergalactic.Component<'div', {}, InlineInputProps>;
};
export default InlineInput;
