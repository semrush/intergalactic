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
    // todo Brauer Ilia - removed default 'soon' type in 19th major
    const { type = 'soon', resolveColor, light, invert, inverted } = this.asProps;

    if (light) {
      switch (type) {
        case 'admin': {
          return resolveColor('--intergalactic-badge-light-admin-text');
        }
        case 'alpha': {
          return resolveColor('--intergalactic-badge-light-alpha-text');
        }
        case 'beta': {
          return resolveColor('--intergalactic-badge-light-beta-text');
        }
        case 'new': {
          return resolveColor('--intergalactic-badge-light-new-text');
        }
        case 'soon':
        case 'unavailable': {
          return resolveColor('--intergalactic-badge-light-soon-text');
        }
        default: {
          const t: never = type;
          throw new Error(`Type can't be "${t}"`);
        }
      }
    }

    if (type === 'unavailable' && !(invert ?? inverted)) {
      return resolveColor('--intergalactic-badge-light-soon-text');
    }

    return undefined;
  }

  private resolveBg(): string {
    // todo Brauer Ilia - removed default 'soon' type in 19th major
    const { type = 'soon', inverted, invert, resolveColor, light } = this.asProps;

    if (inverted ?? invert) {
      return resolveColor('--intergalactic-badge-bg-invert');
    }

    switch (type) {
      case 'admin': {
        return !light ? resolveColor('--intergalactic-badge-accent-admin') : resolveColor('--intergalactic-badge-light-admin');
      }
      case 'alpha': {
        return !light ? resolveColor('--intergalactic-badge-accent-alpha') : resolveColor('--intergalactic-badge-light-alpha');
      }
      case 'beta': {
        return !light ? resolveColor('--intergalactic-badge-accent-beta') : resolveColor('--intergalactic-badge-light-beta');
      }
      case 'new': {
        return !light ? resolveColor('--intergalactic-badge-accent-new') : resolveColor('--intergalactic-badge-light-new');
      }
      case 'soon': {
        return !light ? resolveColor('--intergalactic-badge-accent-soon') : resolveColor('--intergalactic-badge-light-soon');
      }
      case 'unavailable': {
        return resolveColor('--intergalactic-badge-bg-unavailable');
      }
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
