import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';

import style from './style/counter.shadow.css';
import { CounterProps } from './index';

const enhance = {
  resolveColor: resolveColorEnhance(),
};

class Counter extends Component<CounterProps, {}, {}, typeof enhance> {
  static displayName = 'Counter';
  static enhance = Object.values(enhance);

  static style = style;

  static defaultProps = {
    size: 'm',
  };

  render() {
    const SCounter = Root;
    const SText = 'span';
    const { styles, theme, resolveColor, Children } = this.asProps;

    const colorBG = resolveColor(theme);

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
