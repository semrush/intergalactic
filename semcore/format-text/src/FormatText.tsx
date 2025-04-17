import React from 'react';
import {
  UnknownProperties,
  Intergalactic,
  Component,
  sstyled,
  Root,
  createComponent,
} from '@semcore/core';
import { Box, BoxProps } from '@semcore/base-components';

import style from './style/format-text.shadow.css';

/** @deprecated */
export interface IFormatTextProps extends FormatTextProps, UnknownProperties {}
export type FormatTextProps = BoxProps & {
  size?: 's' | 'm' | 'l';
};

class FormatText extends Component<IFormatTextProps> {
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
