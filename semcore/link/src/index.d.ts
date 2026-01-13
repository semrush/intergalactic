import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { TextProps } from '@semcore/typography';
import type React from 'react';

export type LinkProps = TextProps & {
  /**
   * CSS property of the display link (inline|inline-block)
   * @default false
   */
  inline?: boolean;
  /**
   * Sets the link to the disabled state
   */
  disabled?: boolean;
  /**
   * Sets the link to the active state
   */
  active?: boolean;
  /** This flag enables highlighting of the visited link
   */
  enableVisited?: boolean;
  /** The text will not be moved to a new line
   * @default true
   */
  noWrap?: boolean;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
};

declare const Link: Intergalactic.Component<'a', LinkProps> & {
  Text: Intergalactic.Component<'span', TextProps>;
  Addon: Intergalactic.Component<'span', BoxProps>;
};

export default Link;
