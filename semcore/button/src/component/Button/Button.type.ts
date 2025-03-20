import { UnknownProperties, Intergalactic } from '@semcore/core';

import {
  AbstractButtonAddonProps,
  AbstractButtonContext,
  AbstractButtonTextProps,
  AbstractButtonProps,
} from '../AbstractButton/AbstractButton.type';

/**
 *  Button size
 * @default m
 */
export type ButtonSize = 'l' | 'm';
/**
 *  Button type
 * @default secondary
 */
type Use = 'primary' | 'secondary' | 'tertiary';

/**
 * @deprecated don't use it. use `danger` for incorrect or danger behavior and `brand` for the orange one.
 */
type DeprecatedTheme = 'warning';

/** Button theme */
type Theme = 'info' | 'success' | 'brand' | 'danger' | 'muted' | 'invert';

/** @deprecated */
export interface IButtonProps extends ButtonProps, UnknownProperties {}
export type ButtonProps = AbstractButtonProps<ButtonSize, Use, Theme | DeprecatedTheme>;

/** @deprecated */
export interface IButtonTextProps extends ButtonTextProps, UnknownProperties {}
export type ButtonTextProps = AbstractButtonTextProps<ButtonSize>;

/** @deprecated */
export interface IButtonAddonProps extends ButtonAddonProps, UnknownProperties {}
export type ButtonAddonProps = AbstractButtonAddonProps<ButtonSize>;

/** @deprecated */
export interface IButtonContext extends ButtonContext, UnknownProperties {}
export type ButtonContext = AbstractButtonContext;

export type ButtonChildren = {
  Text: Intergalactic.Component<'span', ButtonTextProps>;
  Addon: Intergalactic.Component<'span', ButtonAddonProps>;
};

export type ButtonComponent = Intergalactic.Component<'button', ButtonProps, ButtonContext> & {
  Text: Intergalactic.Component<'span', ButtonTextProps>;
  Addon: Intergalactic.Component<'span', ButtonAddonProps>;
};
