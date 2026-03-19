import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { Box } from '@semcore/flex-box';
import React from 'react';

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
    // eslint-disable-next-line no-console
    console.log('test 1');

    return sstyled(styles)(
      <SBadge render={Box} tag='span' use:color={resolveColor(color)} use:bg={resolveColor(bg)} />,
    );
  }
}

export default createComponent(RootBadge);
