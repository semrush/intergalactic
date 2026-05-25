import { Box } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { CounterProps } from './index';
import style from './style/counter.shadow.css';

const enhance = [resolveColorEnhance()] as const;

class Counter extends Component<CounterProps, typeof enhance> {
  static displayName = 'Counter';
  static enhance = enhance;

  static style = style;

  static defaultProps = {
    size: 's',
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

/**
 * Counter
 *
 * {@link https://developer.semrush.com/intergalactic/components/counter/counter-api/|API} | {@link https://developer.semrush.com/intergalactic/components/counter/counter-code/|Examples}
 */
export default createComponent(Counter);
export * from './AnimatedNumber';
