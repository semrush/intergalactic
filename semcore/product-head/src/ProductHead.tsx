import type { NSBox } from '@semcore/base-components';
import { Box } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './style/product-head.shadow.css';

type HeaderComponent = NSBox.Component & {
  Buttons: NSBox.Component;
  Links: NSBox.Component;
  Row: NSBox.Component;
};

class HeaderRoot extends Component<NSBox.Props> {
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

/**
 * Product Head
 *
 * {@link https://developer.semrush.com/intergalactic/components/product-head/product-head-api/|API} | {@link https://developer.semrush.com/intergalactic/components/product-head/product-head-code/|Examples}
 */
const Header = createComponent<
  HeaderComponent,
  typeof HeaderRoot
>(HeaderRoot, {
  Buttons,
  Links,
  Row,
});

export default Header;
