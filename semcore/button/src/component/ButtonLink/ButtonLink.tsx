import { Box } from '@semcore/base-components';
import { createComponent, sstyled, Root } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './buttonLink.shadow.css';
import type { ButtonLinkAddonProps, ButtonLinkComponent, ButtonLinkTextProps } from './ButtonLink.type';
import { AbstractButton } from '../AbstractButton/AbstractButton';

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

function LinkText(props: ButtonLinkTextProps) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Text} />);
}

function Addon(props: ButtonLinkAddonProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

export const ButtonLink = createComponent(RootButtonLink, {
  Text: LinkText,
  Addon,
}) as ButtonLinkComponent;
