import React from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import createComponent, { Component, sstyled, Root } from '@semcore/core';

import style from './style/format-text.shadow.css';

export interface IFormatTextProps extends IBoxProps {
  size?: 's' | 'm' | 'l';
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
export default createComponent(FormatText) as <T>(
  props: IFormatTextProps & T,
) => React.ReactElement;
