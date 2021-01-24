import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import resolveColor, { brightness } from '@semcore/utils/lib/color';

import style from './style/counter.shadow.css';

export interface ICounterProps extends IBoxProps {
  /** A counter theme you can add your color to */
  theme?: string;

  /** Counter size
   * @default m */
  size?: 'm' | 'l' | 'xl';
}

class Counter extends Component<ICounterProps> {
  static displayName = 'Counter';

  static style = style;

  static defaultProps = {
    size: 'm',
  };

  render() {
    const SCounter = this.Root;
    const { styles, theme, size } = this.asProps;

    const colorBG = resolveColor(theme);
    const colorText = brightness(colorBG) > 200 ? resolveColor('gray20') : '#fff';

    return styled(styles)`
      SCounter[theme] {
        background: ${colorBG};
        color: ${colorText};
      }
    `(<SCounter render={Box} theme={theme} size={size} />);
  }
}

export default createComponent<Merge<ICounterProps, HTMLAttributes<HTMLDivElement>>>(Counter);
