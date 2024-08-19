import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { BoxProps } from '@semcore/flex-box';
import { NeighborItemProps } from '@semcore/neighbor-location';
import { TooltipHintProps } from '@semcore/tooltip';

export type ButtonSize = 'l' | 'm';

/** @deprecated */
export interface IButtonProps extends ButtonProps, UnknownProperties {}
export type ButtonProps = BoxProps &
  NeighborItemProps &
  KeyboardFocusProps & {
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
    /**
     * Placement for hint
     * @default top
     */
    hintPlacement?: TooltipHintProps['placement'];
  };

/** @deprecated */
export interface IButtonTextProps extends ButtonTextProps, UnknownProperties {}
export type ButtonTextProps = BoxProps & {
  size?: ButtonSize;
};

/** @deprecated */
export interface IButtonAddonProps extends ButtonAddonProps, UnknownProperties {}
export type ButtonAddonProps = BoxProps & {
  size?: ButtonSize;
};

/** @deprecated */
export interface IButtonContext extends ButtonContext, UnknownProperties {}
export type ButtonContext = {
  getTextProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};

declare const Button: Intergalactic.Component<'button', ButtonProps, ButtonContext> & {
  Text: Intergalactic.Component<'span', ButtonTextProps>;
  Addon: Intergalactic.Component<'span', ButtonAddonProps>;
};

export default Button;
