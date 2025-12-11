import { Box } from '@semcore/base-components';
import { createComponent, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './button.shadow.css';
import type { ButtonAddonProps, ButtonTextProps } from './Button.type';
import { AbstractButton } from '../AbstractButton/AbstractButton';

class RootButton extends AbstractButton {
  static displayName = 'Button';
  static style = style;
  static defaultProps = {
    use: 'secondary',
    size: 'm',
  };

  protected getTextColor(): string | undefined {
    return undefined;
  }
}

function Text(props: ButtonTextProps) {
  const SText = Root();
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props: ButtonAddonProps) {
  const SAddon = Root();
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

const Button = createComponent(RootButton, {
  Text,
  Addon,
}, {
  tag: 'button',
});

export default Button;
