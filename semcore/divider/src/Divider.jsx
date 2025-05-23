import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';

import style from './style/divider.shadow.css';

class Divider extends Component {
  static displayName = 'Divider';
  static style = style;
  static enhance = [resolveColorEnhance()];
  static defaultProps = {
    use: 'primary',
    orientation: 'horizontal',
  };

  render() {
    const SDivider = Root;
    const { orientation, resolveColor, theme } = this.asProps;

    return sstyled(this.asProps.styles)(
      <SDivider
        render={Box}
        role='separator'
        aria-orientation={orientation}
        use:theme={resolveColor(theme)}
      />,
    );
  }
}

export default createComponent(Divider);
