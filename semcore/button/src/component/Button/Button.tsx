import { Box } from '@semcore/base-components';
import { createComponent, sstyled, Root } from '@semcore/core';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './button.shadow.css';
import type { ButtonAddonProps, ButtonComponent, ButtonTextProps } from './Button.type';
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

function ButtonText(props: ButtonTextProps) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Text} />);
}

function Addon(props: ButtonAddonProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

const Button = createComponent(RootButton, {
  Text: ButtonText,
  Addon,
}) as ButtonComponent;

export default Button;
