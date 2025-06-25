import Badge from '@semcore/badge';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import React from 'react';

import style from './badge.shadow.css';

class BadgeAFRoot extends Component {
  static displayName = 'BadgeAF';
  static style = style;

  render() {
    const SBadgeAccent = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(
      <SBadgeAccent render={Badge} />,
    );
  }
}

export const BadgeAF = createComponent(BadgeAFRoot);
