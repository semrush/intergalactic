import React, { HTMLAttributes } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import createComponent, { Component, Merge, styled } from '@semcore/core';

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
    const SFormatText = this.Root;
    const { styles, size } = this.asProps;

    return styled(styles)(<SFormatText render={Box} size={size} />);
  }
}

export default createComponent<Merge<IFormatTextProps, HTMLAttributes<HTMLDivElement>>>(FormatText);
