import React, { HTMLAttributes } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';

import style from './style/sticky.shadow.css';

export interface IStickyProps extends IBoxProps {
  /** css property
   * @default 0
   * */
  top?: string | number;
}

class StickyRoot extends Component<IStickyProps> {
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

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
const Sticky = createComponent<Merge<IStickyProps, HTMLAttributes<HTMLDivElement>>>(StickyRoot);
/**
 * @deprecated Please, use package `@semcore/ui/flex-box` instead. Package `@semcore/sticky` will be removed in the next major release
 */
export default Sticky;
