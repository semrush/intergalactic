import React, { ComponentProps } from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

import style from './style/product-head.shadow.css';

class HeaderRoot extends Component<IBoxProps> {
  static displayName = 'ProductHead';
  static style = style;

  render() {
    const SProductHead = Root;
    return sstyled(this.asProps.styles)(<SProductHead render={Box} />);
  }
}

function Buttons(props) {
  const SButtons = Root;
  return sstyled(props.styles)(<SButtons render={Box} />);
}

function Links(props) {
  const SLinks = Root;
  return sstyled(props.styles)(<SLinks render={Box} />);
}

function Row(props) {
  const SRow = Root;
  return sstyled(props.styles)(<SRow render={Box} />);
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
