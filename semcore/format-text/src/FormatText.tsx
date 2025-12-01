import { Box, type BoxProps } from '@semcore/base-components';
import {
  type Intergalactic,
  Component,
  sstyled,
  Root,
  createComponent,
} from '@semcore/core';
import React from 'react';

import style from './style/format-text.shadow.css';

export type FormatTextProps = BoxProps & {
  /** Controls the overall text size scale for the formatted content */
  size?: 's' | 'm' | 'l';
};

class FormatText extends Component<FormatTextProps> {
  static displayName = 'FormatText';
  static style = style;
  static defaultProps = {
    size: 'm',
  };

  render() {
    const SFormatText = Root;

    return sstyled(this.asProps.styles)(<SFormatText render={Box} />);
  }
}
export default createComponent(FormatText) as any as Intergalactic.Component<
  'div',
  FormatTextProps
>;
