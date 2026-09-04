import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { NSBadge } from './Badge.type';
import style from './style/badge.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootBadge extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSBadge.Component>,
  typeof RootBadge.enhance,
  never,
  {},
  {},
  NSBadge.DefaultProps
> {
  static displayName = 'Badge';
  static style = style;
  static enhance = [resolveColorEnhance(), i18nEnhance(localizedMessages)] as const;
  static defaultProps: NSBadge.DefaultProps = {
    theme: 'default',
  };

  render() {
    const SBadge = Root;
    const { styles, type } = this.asProps;

    return sstyled(styles)(
      <SBadge render={Box} tag='span'>
        {this.typedChildren(type)}
      </SBadge>,
    );
  }

  private typedChildren(type: NSBadge.Type): string {
    const { getI18nText } = this.asProps;

    const badgeName = type[0].toUpperCase() + type.slice(1);

    return getI18nText(`Badge.${badgeName}`);
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
