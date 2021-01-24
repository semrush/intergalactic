import React, { ComponentProps } from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

import style from './style/product-head.shadow.css';

class HeaderRoot extends Component<IBoxProps> {
  static displayName = 'ProductHead';
  static style = style;

  render() {
    const SProductHead = this.Root;
    const { styles } = this.asProps;
    return styled(styles)(<SProductHead render={Box} />);
  }
}

function Buttons(props) {
  const { Root: SButtons, styles } = props;
  return styled(styles)(<SButtons render={Box} />);
}

function Links(props) {
  const { Root: SLinks, styles } = props;
  return styled(styles)(<SLinks render={Box} />);
}

function Row(props) {
  const { Root: SRow, styles } = props;
  return styled(styles)(<SRow render={Box} />);
}

const Header = createComponent<
  ComponentProps<typeof Box>,
  {
    Buttons: ComponentProps<typeof Box>;
    Links: ComponentProps<typeof Box>;
    Row: ComponentProps<typeof Box>;
  }
>(HeaderRoot, {
  Buttons,
  Links,
  Row,
});
export default Header;
