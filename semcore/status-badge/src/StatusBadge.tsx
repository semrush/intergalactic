import { Box } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import style from './style/statusBadge.shadow.css';

type StatusBadgeType = 'admin' | 'alpha' | 'beta' | 'new' | 'for you' | 'soon';

type StatusBadgeProps = {
  type: StatusBadgeType;
  inverted?: boolean;
  children?: never;
};

class StatusBadgeRoot extends Component<StatusBadgeProps, typeof StatusBadgeRoot.enhance> {
  static displayName = 'Badge';
  static style = style;
  static enhance = [resolveColorEnhance()] as const;

  render() {
    const SBadge = Root;
    const { styles, type } = this.asProps;

    return sstyled(styles)(
      <SBadge render={Box} tag='span' use:bg={this.resolveBg()}>{type}</SBadge>,
    );
  }

  private resolveBg(): string {
    const { type, inverted, resolveColor } = this.asProps;

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

export const StatusBadge = createComponent<'span', StatusBadgeProps>(StatusBadgeRoot);
