import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';

import style from './style/product-head.shadow.css';

class HeaderRoot extends Component<BoxProps> {
  static displayName = 'ProductHead';
  static style = style;

  render() {
    const SProductHead = Root;
    return sstyled(this.asProps.styles)(<SProductHead render={Box} />);
  }
}

function Buttons(props: any) {
  const SButtons = Root;
  return sstyled(props.styles)(<SButtons render={Box} />);
}

function Links(props: any) {
  const SLinks = Root;
  return sstyled(props.styles)(<SLinks render={Box} />);
}

function Row(props: any) {
  const SRow = Root;
  return sstyled(props.styles)(<SRow render={Box} />);
}

const Header = createComponent(HeaderRoot, {
  Buttons,
  Links,
  Row,
}) as typeof Box & {
  Buttons: typeof Box;
  Links: typeof Box;
  Row: typeof Box;
};
export default Header;
