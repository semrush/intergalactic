import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import React from 'react';

import type { NSProductHead } from './ProductHead.type';
import style from './style/product-head.shadow.css';
class HeaderRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSProductHead.Component>
> {
  static displayName = 'ProductHead';
  static style = style;

  render() {
    const SProductHead = Root;
    return sstyled(this.asProps.styles)(<SProductHead render={Box} />);
  }
}

function Buttons(
  props: Intergalactic.InternalTypings.InferComponentProps<NSProductHead.Buttons.Component>,
) {
  const SButtons = Root;
  return sstyled(props.styles)(<SButtons render={Box} />);
}

function Links(
  props: Intergalactic.InternalTypings.InferComponentProps<NSProductHead.Links.Component>,
) {
  const SLinks = Root;
  return sstyled(props.styles)(<SLinks render={Box} />);
}

function Row(
  props: Intergalactic.InternalTypings.InferComponentProps<NSProductHead.Row.Component>,
) {
  const SRow = Root;
  return sstyled(props.styles)(<SRow render={Box} />);
}

/**
 * Product Head
 *
 * {@link https://developer.semrush.com/intergalactic/components/product-head/product-head-api/|API} | {@link https://developer.semrush.com/intergalactic/components/product-head/product-head-code/|Examples}
 */
const Header = createComponent<
  NSProductHead.Component,
  typeof HeaderRoot
>(HeaderRoot, {
  Buttons,
  Links,
  Row,
});

export default Header;
