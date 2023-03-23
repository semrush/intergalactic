import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import style from './style/badge.shadow.css';

class RootBadge extends Component {
  static displayName = 'Badge';
  static style = style;
  static defaultProps = {
    color: 'white',
    bg: 'mist',
  };

  render() {
    const SBadge = Root;
    const { styles, color, bg } = this.asProps;

    return sstyled(styles)(
      <SBadge render={Box} tag="span" use:color={resolveColor(color)} use:bg={resolveColor(bg)} />,
    );
  }
}

export default createComponent(RootBadge);
