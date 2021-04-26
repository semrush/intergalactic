import React, { HTMLAttributes } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';

import style from './style/format-text.shadow.css';

export interface IFormatTextProps extends IBoxProps {
  size?: 'm' | 'l' | 'xl';
}

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

export default createComponent<Merge<IFormatTextProps, HTMLAttributes<HTMLDivElement>>>(FormatText);
