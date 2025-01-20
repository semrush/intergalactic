import React from 'react';
import { createComponent, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';

import style from './button.shadow.css';
import { AbstractButton } from '../AbstractButton/AbstractButton';
import { ButtonAddonProps, ButtonComponent, ButtonTextProps } from './Button.type';

class RootButton extends AbstractButton {
  static displayName = 'Button';
  static enhance = [keyboardFocusEnhance()];
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
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props: ButtonAddonProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

const Button = createComponent(RootButton, {
  Text,
  Addon,
}) as ButtonComponent;

export default Button;
