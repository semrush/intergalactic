import Badge from '@semcore/badge';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import React from 'react';

import style from './badge.shadow.css';

class BadgeFHRoot extends Component {
  static displayName = 'BadgeFH';
  static style = style;

  render() {
    const SHighlightedBadge = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(
      <SHighlightedBadge render={Badge} />,
    );
  }
}

export const BadgeFH = createComponent(BadgeFHRoot);
