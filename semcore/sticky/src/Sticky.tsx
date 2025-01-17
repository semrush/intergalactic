import React from 'react';
import { createComponent, UnknownProperties, Component, sstyled, Root } from '@semcore/core';
import { Box, BoxProps } from '@semcore/base-components';

import style from './style/sticky.shadow.css';

/** @deprecated */
export interface IStickyProps extends StickyProps, UnknownProperties {}
export type StickyProps = BoxProps & {
  /** css property
   * @default 0
   * */
  top?: string | number;
};

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

const Sticky = createComponent(StickyRoot) as <T>(props: IStickyProps & T) => React.ReactElement;
/**
 * @deprecated Please, use package `intergalactic/flex-box` instead. Package `@semcore/sticky` will be removed in the next major release
 */
export default Sticky;
