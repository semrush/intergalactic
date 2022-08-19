import React from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { IBoxProps } from '@semcore/flex-box';
import { INeighborItemProps } from '@semcore/neighbor-location';

export type ButtonSize = 'l' | 'm';

export interface IButtonProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /**
   *  Button type
   * @default secondary
   */
  use?: 'primary' | 'secondary' | 'tertiary';
  /** Button theme */
  theme?: 'info' | 'success' | 'warning' | 'danger' | 'muted' | 'invert';
  /** Button activity state */
  active?: boolean;
  /**
   *  Button size
   * @default m
   */
  size?: ButtonSize;
  /** Disabled button state */
  disabled?: boolean;
  /** Loading button state */
  loading?: boolean;
  /** Tag for the left Addon */
  addonLeft?: React.ElementType;
  /** Tag for the right Addon */
  addonRight?: React.ElementType;
}

export interface IButtonTextProps extends IBoxProps {
  size?: ButtonSize;
}

export interface IButtonAddonProps extends IBoxProps {
  size?: ButtonSize;
}

export interface IButtonContext {
  getTextProps: PropGetterFn;
  getAddonProps: PropGetterFn;
}

declare const Button: (<T>(props: CProps<IButtonProps & T, IButtonContext>) => ReturnEl) & {
  Text: <T>(props: IButtonTextProps & T) => ReturnEl;
  Addon: <T>(props: IButtonAddonProps & T) => ReturnEl;
};

export default Button;
