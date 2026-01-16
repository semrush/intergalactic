import type { BoxProps } from '@semcore/base-components';
import { Box } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import logger from '@semcore/core/lib/utils/logger';
import React from 'react';

import style from './style/badge.shadow.css';

export type BadgeType = 'admin' | 'alpha' | 'beta' | 'new' | 'for you' | 'soon';

export type BadgeProps = {
  /**
   * Type of badge.
   */
  type?: BadgeType;
  /**
   * Flag to render inverted badge.
   */
  inverted?: boolean;

  /**
   * @deprecated. Use just type with predefined texts. You should use badge with custom text inside.
   */
  children?: any;

  /** Fill color
   * @deprecated. Use just type property.
   * @default gray-400
   * */
  bg?: 'mist' | 'cyan' | 'red' | 'orange' | 'green' | 'white' | string;

  /** Text color
   * @deprecated. Use just type property.
   * @default white
   * */
  color?: 'white' | 'gray20' | string;

  m?: BoxProps['m'];
  ml?: BoxProps['ml'];
  mt?: BoxProps['mt'];
  mr?: BoxProps['mr'];
  mb?: BoxProps['mb'];
  mx?: BoxProps['mx'];
  my?: BoxProps['my'];
};

class RootBadge extends Component<BadgeProps, typeof RootBadge.enhance> {
  static displayName = 'Badge';
  static style = style;
  static enhance = [resolveColorEnhance()] as const;

  componentDidMount() {
    logger.warn(
      !this.asProps.type,
      `'type' will be required property in the next major release. Set it please.`,
      this.asProps['data-ui-name'] || RootBadge.displayName,
    );
  }

  render() {
    const SBadge = Root;
    const { styles, color, bg, resolveColor, type, children } = this.asProps;
    const resolvedBg = bg ? resolveColor(bg) : this.resolveBg();
    const resolvedColor = color ? resolveColor(color) : undefined;

    return sstyled(styles)(
      <SBadge render={Box} tag='span' use:color={resolvedColor} use:bg={resolvedBg}>
        {type !== undefined ? type : children}
      </SBadge>,
    );
  }

  private resolveBg(): string {
    // todo Brauer Ilia - removed default 'soon' type in 18th major
    const { type = 'soon', inverted, resolveColor } = this.asProps;

    if (inverted) {
      return resolveColor('--gray-white');
    }

    switch (type) {
      case 'admin': {
        return resolveColor('--blue-400');
      }
      case 'alpha': {
        return resolveColor('--red-400');
      }
      case 'beta': {
        return resolveColor('--orange-400');
      }
      case 'new': {
        return resolveColor('--green-400');
      }
      case 'for you': {
        return resolveColor('--violet-400');
      }
      case 'soon': {
        return resolveColor('--gray-400');
      }
      default: {
        const t: never = type;
        throw new Error(`Type can't be "${t}"`);
      }
    }
  }
}

export const Badge = createComponent<'div', BadgeProps>(RootBadge);
