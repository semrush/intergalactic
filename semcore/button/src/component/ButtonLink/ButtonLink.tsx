import React from 'react';
import { createComponent, sstyled, Root } from '@semcore/core';
import style from './buttonLink.shadow.css';
import { Box } from '@semcore/flex-box';
import { AbstractButton } from '../AbstractButton/AbstractButton';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { ButtonLinkAddonProps, ButtonLinkComponent, ButtonLinkTextProps } from './ButtonLink.type';

const enhance = {
  resolveColor: resolveColorEnhance(),
};

class RootButtonLink extends AbstractButton {
  static displayName = 'ButtonLink';
  static enhance = Object.values(enhance);
  static style = style;
  static defaultProps = {
    use: 'primary',
  };

  protected getTextColor(): string | undefined {
    const { color, resolveColor } = this.asProps as any;
    return resolveColor(color);
  }
}

function Text(props: ButtonLinkTextProps) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props: ButtonLinkAddonProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

export const ButtonLink = createComponent(RootButtonLink, {
  Text,
  Addon,
}) as ButtonLinkComponent;
