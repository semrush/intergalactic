import type { BoxProps, NeighborItemProps, NeighborLocationProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import { inputProps } from '@semcore/core/lib/utils/inputProps';
import type React from 'react';

export type SwitchTheme = 'info' | 'success' | string;

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
    /** Disabled state  */
    disabled?: boolean;
  };

export type SwitchValueProps = BoxProps &
  NeighborItemProps & {
    /** Handler on change */
    onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
    /** Control state  */
    checked?: boolean;
    /** Initial state for uncontrolled mode
     * @default false */
    defaultChecked?: boolean;
    /** The list of properties that can be placed in the hidden input */
    includeInputProps?: string[];
    /** Switch theme */
    theme?: SwitchTheme;
  };

export type SwitchAddonProps = BoxProps & NeighborItemProps;

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
