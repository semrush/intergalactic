import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import style from './style/badge.shadow.css';

export interface IBadgeProps extends IBoxProps {
  /** Fill color
   * @default mist
   * */
  bg?: 'mist' | 'cyan' | 'red' | 'orange' | 'green' | 'white' | string;

  /** Text color
   * @default white
   * */
  color?: 'white' | 'gray20' | string;
}

class RootBadge extends Component<IBadgeProps> {
  static displayName = 'Badge';
  static style = style;
  static defaultProps = {
    color: 'white',
    bg: 'mist',
  };

  render() {
    const SBadge = this.Root;
    const { styles, color, bg } = this.asProps;

    return styled(styles)`
      SBadge[bg] {
        background-color: ${resolveColor(bg)};
      }
      SBadge[color] {
        color: ${resolveColor(color)};
      }
    `(<SBadge render={Box} tag="span" color={color} bg={bg} />);
  }
}

export default createComponent<Merge<IBadgeProps, HTMLAttributes<HTMLSpanElement>>>(RootBadge);
