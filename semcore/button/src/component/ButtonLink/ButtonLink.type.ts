import { Intergalactic } from '@semcore/core';

import {
  AbstractButtonAddonProps,
  AbstractButtonContext,
  AbstractButtonTextProps,
  AbstractButtonProps,
} from '../AbstractButton/AbstractButton.type';

/**
 *  Button link size
 * @default m
 */
export type ButtonLinkSize = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
/**
 *  Button link type
 * @default primary
 */
type Use = 'primary' | 'secondary';

export type ButtonLinkProps = AbstractButtonProps<ButtonLinkSize, Use, never>;

export type ButtonLinkTextProps = AbstractButtonTextProps<ButtonLinkSize>;

export type ButtonLinkAddonProps = AbstractButtonAddonProps<ButtonLinkSize>;

export type ButtonLinkContext = AbstractButtonContext;

export type ButtonLinkChildren = {
  Text: Intergalactic.Component<'span', ButtonLinkTextProps>;
  Addon: Intergalactic.Component<'span', ButtonLinkAddonProps>;
};

export type ButtonLinkComponent = Intergalactic.Component<
  'button',
  ButtonLinkProps,
  ButtonLinkContext
> & {
  Text: Intergalactic.Component<'span', ButtonLinkTextProps>;
  Addon: Intergalactic.Component<'span', ButtonLinkAddonProps>;
};
