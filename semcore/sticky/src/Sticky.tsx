import { Box, type BoxProps } from '@semcore/base-components';
import { createComponent, type UnknownProperties, Component, sstyled, Root } from '@semcore/core';
import React from 'react';

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

    return sstyled(styles)(<SSticky render={Box}><Box position='sticky' top='200'></Box></SSticky>);
  }
}

const Sticky = createComponent(StickyRoot) as <T>(props: IStickyProps & T) => React.ReactElement;
/**
 * @deprecated Use Box from `@semcore/base-components` with `position='sticky' top='VALUE'`. Package `@semcore/sticky` will be removed in the next major release
 */
export default Sticky;
