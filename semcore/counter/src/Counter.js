import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor, { brightness } from '@semcore/utils/lib/color';

import style from './style/counter.shadow.css';

class Counter extends Component {
  static displayName = 'Counter';

  static style = style;

  static defaultProps = {
    size: 'm',
  };

  render() {
    const SCounter = Root;
    const { styles, theme } = this.asProps;

    const colorBG = resolveColor(theme);
    const colorText = brightness(colorBG) > 200 ? resolveColor('gray20') : '#fff';

    return sstyled(styles)(<SCounter render={Box} use:theme={colorBG} colorText={colorText} />);
  }
}

export default createComponent(Counter);
