import type { BoxProps } from '@semcore/base-components';
import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import logger from '@semcore/core/lib/utils/logger';
import React from 'react';

import type { NSBadge } from './Badge.type';
import style from './style/badge.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootBadge extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSBadge.Component>,
  typeof RootBadge.enhance
> {
  static displayName = 'Badge';
  static style = style;
  static enhance = [resolveColorEnhance(), i18nEnhance(localizedMessages)] as const;

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
    const resolvedColor = color ? resolveColor(color) : this.resolveTextColor();

    return sstyled(styles)(
      <SBadge render={Box} tag='span' use:color={resolvedColor} use:bg={resolvedBg}>
        {type !== undefined ? this.typedChildren(type) : children}
      </SBadge>,
    );
  }

  private typedChildren(type: NSBadge.Type): string {
    const { getI18nText } = this.asProps;

    const badgeName = type[0].toUpperCase() + type.slice(1);

    return getI18nText(`Badge.${badgeName}`);
  }

  private resolveTextColor(): string | undefined {
    const { type, inverted, resolveColor } = this.asProps;

    if (type === 'unavailable' && !inverted) {
      return resolveColor('--intergalactic-text-secondary');
    } // TODO: --intergalactic-badge-text-secondary

    return undefined;
  }

  private resolveBg(): string {
    // todo Brauer Ilia - removed default 'soon' type in 18th major
    const { type = 'soon', inverted, resolveColor } = this.asProps;

    if (inverted) {
      return resolveColor('--gray-white');
    } // TODO: --intergalactic-badge-bg-invert

    switch (type) {
      case 'admin': {
        return resolveColor('--blue-400');
      } // TODO: --intergalactic-badge-bg-admin
      case 'alpha': {
        return resolveColor('--red-400');
      } // TODO: --intergalactic-badge-bg-alpha
      case 'beta': {
        return resolveColor('--orange-400');
      } // TODO: --intergalactic-badge-bg-beta
      case 'new': {
        return resolveColor('--green-400');
      } // TODO: --intergalactic-badge-bg-new
      case 'soon': {
        return resolveColor('--gray-400');
      } // TODO: --intergalactic-badge-bg-soon
      case 'unavailable': {
        return resolveColor('--gray-100');
      } // TODO: --intergalactic-badge-bg-unavailable
      default: {
        const t: never = type;
        throw new Error(`Type can't be "${t}"`);
      }
    }
  }
}

/**
 * Badge
 *
 * {@link https://developer.semrush.com/intergalactic/components/badge/badge-api/|API} | {@link https://developer.semrush.com/intergalactic/components/badge/badge-code/|Examples}
 */
export const Badge = createComponent<
  NSBadge.Component,
  typeof RootBadge
>(RootBadge);
