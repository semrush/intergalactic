import React from 'react';
import { PropGetterFn, CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { INeighborItemProps, INeighborLocationProps } from '@semcore/neighbor-location';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { inputProps } from '@semcore/utils/lib/inputProps';

export type SwitchTheme = 'info' | 'success' | string;

export interface ISwitchProps extends IBoxProps, INeighborLocationProps {
  /** Switch size
   * @default m
   */
  size?: 'm' | 'l' | 'xl';
  /** Switch theme
   * @default info
   */
  theme?: SwitchTheme;
}

export interface ISwitchValueProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /** Handler on change */
  onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Control state  */
  checked?: boolean;
  /** Initial state for uncontrolled mode
   * @default false */
  defaultChecked?: boolean;
  /** Disabled state  */
  disabled?: boolean;
  /** The list of properties that can be placed in the hidden input */
  includeInputProps?: string[];
  /** Switch theme */
  theme?: SwitchTheme;
}

export interface ISwitchAddonProps extends IBoxProps, INeighborItemProps {}

export interface ISwitchContext {
  getAddonProps: PropGetterFn;
  getValueProps: PropGetterFn;
}

declare const Switch: (<T>(props: CProps<ISwitchProps & T, ISwitchContext>) => ReturnEl) & {
  Value: <T>(props: CProps<ISwitchValueProps & T, ISwitchContext>) => ReturnEl;
  Addon: <T>(props: ISwitchAddonProps & T) => ReturnEl;
};

export { inputProps };
export default Switch;
