import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';

import style from './style/badge.shadow.css';

class RootBadge extends Component {
  static displayName = 'Badge';
  static style = style;
  static enhance = [resolveColorEnhance()];
  static defaultProps = {
    color: 'white',
    bg: 'gray-400',
  };

  render() {
    const SBadge = Root;
    const { styles, color, bg, resolveColor } = this.asProps;

    return sstyled(styles)(
      <SBadge render={Box} tag='span' use:color={resolveColor(color)} use:bg={resolveColor(bg)} />,
    );
  }
}

export default createComponent(RootBadge);
