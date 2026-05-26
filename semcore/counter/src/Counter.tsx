import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { NSCounter } from './Counter.type';
import style from './style/counter.shadow.css';

const enhance = [resolveColorEnhance()] as const;

class Counter extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSCounter.Component>,
 typeof enhance,
 {},
 {},
 {},
 NSCounter.DefaultProps
> {
  static displayName = 'Counter';
  static enhance = enhance;

  static style = style;

  static defaultProps = {
    size: 's',
  } as const;

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

export default createComponent<
  NSCounter.Component,
  typeof Counter
>(Counter);
