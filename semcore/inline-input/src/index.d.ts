import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { ITooltipProps } from '@semcore/tooltip';
import { IBoxProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactElement) | React.ReactElement;
};
/* utils type */

export interface IInlineInputProps extends IBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';
  state?: 'normal' | 'valid' | 'invalid' | 'disabled';
  loading?: boolean;
  onConfirm?: (value: string) => void;
  onCancel?: (prevValue: string) => void;
  value?: string;
  defaultValue?: string;
  /**
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * @default "Cancel"
   */
  cancelText?: string;
  tooltipsProps?: ITooltipProps;
  autoFocus?: boolean;
  placeholder?: string;
  inputId?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * @description defines callback (`onCancel` or `onConfirm`) triggered when `blur` event out of container fired.
   * Triggered after all previous macrotasks completed (internally called inside of `setTimeout`).
   */
  onBlurBehavior?: 'cancel' | 'confirm';
}

export interface IInlineInputAddonProps extends IBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';
}
export interface IInlineInputOutlineProps extends IBoxProps {}
export interface IInlineInputValueProps extends IBoxProps {
  id?: string;
  size?: 's' | 'm' | 'l' | 'xl';
  autoFocus?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  state?: 'normal' | 'valid' | 'invalid' | 'disabled';
  loading?: boolean;
  placeholder?: string;
}
export interface IInlineInputConfirmIconProps extends IBoxProps {
  onConfirm?: (value: string) => void;
  /**
   * @default "Confirm"
   */
  confirmText?: string;
  tooltipsProps?: ITooltipProps;
}
export interface IInlineInputCancelIconProps extends IBoxProps {
  onCancel?: (prevValue: string) => void;
  /**
   * @default "Cancel"
   */
  cancelText?: string;
  tooltipsProps?: ITooltipProps;
}
export interface IInlineInputControlIconsProps extends IBoxProps {
  onConfirm?: (value: string) => void;
  onCancel?: (prevValue: string) => void;
  /**
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * @default "Cancel"
   */
  cancelText?: string;
  tooltipsProps?: ITooltipProps;
}
export interface IInlineInputConfirmButtonProps extends IBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';

  onConfirm?: (value: string) => void;
  /**
   * @default "Confirm"
   */
  confirmText?: string;
}
export interface IInlineInputCancelButtonProps extends IBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';

  onCancel?: (prevValue: string) => void;
  /**
   * @default "Confirm"
   */
  cancelText?: string;
}
export interface IInlineInputControlButtonsProps extends IBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';

  onConfirm?: (value: string) => void;
  onCancel?: (prevValue: string) => void;
  /**
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * @default "Cancel"
   */
  cancelText?: string;
}

interface IInlineInputCtx {
  geAddonProps: PropGetterFn;
  getConfirmIconProps: PropGetterFn;
  getCancelIconProps: PropGetterFn;
  getControlIconsProps: PropGetterFn;
  getConfirmButtonProps: PropGetterFn;
  getCancelButtonProps: PropGetterFn;
  getControlButtonsProps: PropGetterFn;
}

declare const InlineInput: (<T>(
  props: CProps<IInlineInputProps & T, IInlineInputCtx>,
) => React.ReactElement) & {
  Addon: <T>(props: CProps<IInlineInputAddonProps & T, IInlineInputProps>) => React.ReactElement;
  Outline: <T>(
    props: CProps<IInlineInputOutlineProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  Value: <T>(props: CProps<IInlineInputValueProps & T, IInlineInputProps>) => React.ReactElement;
  ConfirmIcon: <T>(
    props: CProps<IInlineInputConfirmIconProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  CancelIcon: <T>(
    props: CProps<IInlineInputCancelIconProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  ControlIcons: <T>(
    props: CProps<IInlineInputControlIconsProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  ConfirmButton: <T>(
    props: CProps<IInlineInputConfirmButtonProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  CancelButton: <T>(
    props: CProps<IInlineInputCancelButtonProps & T, IInlineInputProps>,
  ) => React.ReactElement;
  ControlButtons: <T>(
    props: CProps<IInlineInputControlButtonsProps & T, IInlineInputProps>,
  ) => React.ReactElement;
};
export default InlineInput;
