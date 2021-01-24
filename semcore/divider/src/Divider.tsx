import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

import style from './style/divider.shadow.css';

export interface IDividerProps extends IBoxProps {
  /**
   * Type of the divider
   * @default primary
   */
  use?: 'primary' | 'secondary';
  /**
   * Theme of the divider
   */
  theme?: 'invert';
  /**
   * Orientation of the divider
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
}

class Divider extends Component<IDividerProps> {
  static displayName = 'Divider';
  static style = style;
  static defaultProps = {
    use: 'primary',
    orientation: 'horizontal',
  };

  render() {
    const SDivider = this.Root;
    const { styles, theme, use, orientation } = this.asProps;

    return styled(styles)(
      <SDivider render={Box} use={use} theme={theme} orientation={orientation} />,
    );
  }
}

export default createComponent<Merge<IDividerProps, HTMLAttributes<HTMLDivElement>>>(Divider);
