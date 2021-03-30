import React, { HTMLAttributes } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';

import style from './style/sticky.shadow.css';

export interface IStickyProps extends IBoxProps {
  /* css свойство
   * @default 0
   * */
  top?: string | number;
}

class Sticky extends Component<IStickyProps> {
  static displayName = 'Sticky';
  static defaultProps = {
    top: 0,
  };
  static style = style;

  render() {
    const SSticky = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<SSticky render={Box} />);
  }
}

export default createComponent<Merge<IStickyProps, HTMLAttributes<HTMLDivElement>>>(Sticky);
