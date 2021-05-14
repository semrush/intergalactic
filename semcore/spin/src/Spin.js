import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import style from './style/spin.shadow.css';

function getThemeColor(theme) {
  switch (theme) {
    case 'dark':
    case 'invert':
      return 'currentColor';
    default:
      return resolveColor(theme);
  }
}

class RootSpin extends Component {
  static displayName = 'Spin';
  static style = style;
  static defaultProps = {
    size: 'm',
    theme: 'dark',
  };

  render() {
    const SSpin = Root;
    const { styles, theme } = this.asProps;
    return sstyled(styles)(<SSpin render={Box} theme={theme} color={getThemeColor(theme)} />);
  }
}

const Spin = createComponent(RootSpin);
export default Spin;
