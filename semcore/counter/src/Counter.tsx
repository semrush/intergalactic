import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';

import style from './style/counter.shadow.css';

class Counter extends Component<{
  theme: 'warning' | 'danger' | string;
  resolveColor: (color: string) => string;
}> {
  static displayName = 'Counter';
  static enhance = [resolveColorEnhance(['theme'])];

  static style = style;

  static defaultProps = {
    size: 'm',
  };

  render() {
    const SCounter = Root;
    const SText = 'span';
    const { styles, theme, resolveColor, Children } = this.asProps;

    const colorBG = resolveColor(theme);
    // const colorText = '#fff'; // brightness(colorBG)! > 200 ? resolveColor('gray-800') : '#fff';

    return sstyled(styles)(
      <SCounter render={Box} use:theme={colorBG}>
        <SText>
          <Children />
        </SText>
      </SCounter>,
    );
  }
}

export default createComponent(Counter);
export * from './AnimatedNumber';
