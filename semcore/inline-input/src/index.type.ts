import type { BoxProps } from '@semcore/base-components';
import type { ButtonLinkComponent } from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { InputNumberControlsProps } from '@semcore/input-number';
import type React from 'react';

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
   * defines callback (`onCancel` or `onConfirm`) triggered when `blur` event out of container fired
   * Triggered after all previous macrotasks completed (internally called inside of `setTimeout`)
   */
  onBlurBehavior?: 'cancel' | 'confirm' | 'none';
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type InlineInputAddonProps = BoxProps & {};

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
   * disables interactive elements
   */
  disabled?: boolean;
  /**
   * gray text in empty input tag
   */
  placeholder?: string;
};

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

export type InlineInputComponent = Intergalactic.Component<'div', InlineInputProps, InlineInputCtx> & {
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
  NumberControls: Intergalactic.Component<'div', InputNumberControlsProps, InlineInputProps>;
};
