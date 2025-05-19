import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { NeighborItemProps, NeighborLocationProps } from '@semcore/neighbor-location';
import { inputProps } from '@semcore/core/lib/utils/inputProps';

export type SwitchTheme = 'info' | 'success' | string;

/** @deprecated */
export interface ISwitchProps extends SwitchProps, UnknownProperties {}
export type SwitchProps = BoxProps &
  NeighborLocationProps & {
    /** Switch size
     * @default m
     */
    size?: 'm' | 'l' | 'xl';
    /** Switch theme
     * @default info
     */
    theme?: SwitchTheme;
  };

/** @deprecated */
export interface ISwitchValueProps extends SwitchValueProps, UnknownProperties {}
export type SwitchValueProps = BoxProps &
  NeighborItemProps & {
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
  };

/** @deprecated */
export interface ISwitchAddonProps extends SwitchAddonProps, UnknownProperties {}
export type SwitchAddonProps = BoxProps &
  NeighborItemProps & {
    /** @deprecated
     * You shouldn't use Switch with two addons if one of them has hidden prop.
     * Just use one Addon with text which could be read as On or Off.
     * */
    hidden?: boolean;
  };

/** @deprecated */
export interface ISwitchContext extends SwitchContext, UnknownProperties {}
export type SwitchContext = {
  getAddonProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

declare const Switch: Intergalactic.Component<'div', SwitchProps, SwitchContext> & {
  Value: Intergalactic.Component<'input', SwitchValueProps, SwitchContext>;
  Addon: Intergalactic.Component<'div', SwitchAddonProps>;
};

export { inputProps };
export default Switch;
