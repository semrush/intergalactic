import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { LinkProps } from '@semcore/link';
import type { NSText } from '@semcore/typography';

import type { ButtonContext } from '../Button/Button.type';

export type ButtonLinkProps = Intergalactic.InternalTypings.EfficientOmit<LinkProps, 'enableVisited'> & {
  /**
   *  Button link type
   * @default primary
   */
  use?: 'primary' | 'secondary';
};

export type ButtonLinkTextProps = NSText.Props;

export type ButtonLinkAddonProps = BoxProps;

export type ButtonLinkChildren = {
  Text: Intergalactic.Component<'span', ButtonLinkTextProps>;
  Addon: Intergalactic.Component<'span', ButtonLinkAddonProps>;
};

export type ButtonLinkComponent = Intergalactic.Component<
  'button',
  ButtonLinkProps,
  ButtonContext
> & ButtonLinkChildren;
