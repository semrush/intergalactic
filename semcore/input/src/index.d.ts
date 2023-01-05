import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { INeighborItemProps, INeighborLocationProps } from '@semcore/neighbor-location';
import { IWithAutoFocusEnhanceProps } from '@semcore/utils/lib/enhances/autoFocusEnhance';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactNode) | React.ReactNode;
};
type ReturnEl = React.ReactElement | null;
/* utils type */

export type InputSize = 'm' | 'l';

export interface IInputProps extends IBoxProps, INeighborItemProps, INeighborLocationProps {
  /**
   * Sets the input and addons to the disabled state
   * */
  disabled?: boolean;
  /**
   * Input size
   * @default m
   */
  size?: InputSize;
  /**
   * Sets the input state
   * @default normal
   */
  state?: 'normal' | 'invalid' | 'valid';
}

export interface IInputValueProps
  extends IBoxProps,
    INeighborItemProps,
    IWithAutoFocusEnhanceProps {
  /**
   * Input value
   */
  value?: string;
  /**
   * Default value if `value` property is not provided
   */
  defaultValue?: string;
  /**
   * Handler for changing the value
   */
  onChange?: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
  /**
   * Sets the input to the disabled state
   * */
  disabled?: boolean;
  /**
   * Sets the input to the read-only state
   * */
  readOnly?: boolean;
  /**
   * Input size
   * @default m
   */
  size?: InputSize;
}

export interface IInputAddonProps extends IBoxProps, INeighborItemProps {
  /**
   * Adds styles for interactive icons
   */
  interactive?: boolean;
  /**
   * Blocks the addon
   * */
  disabled?: boolean;
  /**
   * Input size
   * @default m
   */
  size?: InputSize;
}

export interface IInputCtx {
  getValueProps: PropGetterFn;
  getAddonProps: PropGetterFn;
}

declare const Input: (<T>(props: CProps<IInputProps & T, IInputCtx>) => ReturnEl) & {
  Value: <T>(props: IInputValueProps & T) => ReturnEl;
  Addon: <T>(props: CProps<IInputAddonProps & T, IInputProps>) => ReturnEl;
};
export default Input;
