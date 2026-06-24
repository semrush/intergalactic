import Badge, { type BadgeMargins } from '@semcore/badge';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import style from './badge.shadow.css';

type BadgeFHUse = 'accent' | 'neutral';

type BadgeFHProps = BadgeMargins & {
  /**
   * Type of feature badge.
   * @default accent
   */
  use?: BadgeFHUse;
};

type DefaultProps = {
  use: BadgeFHUse;
};

type BadgeFHComponent = Intergalactic.Component<'span', BadgeFHProps>;

class BadgeFHRoot extends Component<
  BadgeFHProps,
  typeof BadgeFHRoot.enhance,
  {},
  {},
  {},
  DefaultProps
> {
  static displayName = 'BadgeFH';
  static style = style;
  static enhance = [resolveColorEnhance()] as const;
  static defaultProps = {
    use: 'accent',
  } as const;

  render() {
    const SHighlightedBadge = Root;
    const { styles, use, resolveColor } = this.asProps;

    const bg = use === 'neutral' ? resolveColor('--violet-400') : undefined;

    return sstyled(styles)(
      <SHighlightedBadge
        render={Badge}
        use:bg={bg}
      />,
    );
  }
}

/**
 * Badge FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#badge|Docs}
 */
export const BadgeFH = createComponent<
  BadgeFHComponent,
  typeof BadgeFHRoot
>(BadgeFHRoot);
