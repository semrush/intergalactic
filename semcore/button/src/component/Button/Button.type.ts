import type { UnknownProperties, Intergalactic } from '@semcore/core';

import type {
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

/** Button theme */
type Theme = 'info' | 'success' | 'brand' | 'danger' | 'muted' | 'invert';

export type ButtonProps = AbstractButtonProps<ButtonSize, Use, Theme>;

export type ButtonTextProps = AbstractButtonTextProps<ButtonSize>;

export type ButtonAddonProps = AbstractButtonAddonProps;

export type ButtonContext = AbstractButtonContext;

export type ButtonChildren = {
  Text: Intergalactic.Component<'span', ButtonTextProps>;
  Addon: Intergalactic.Component<'span', ButtonAddonProps>;
};

export type ButtonComponent = Intergalactic.Component<'button', ButtonProps, ButtonContext> & ButtonChildren;
