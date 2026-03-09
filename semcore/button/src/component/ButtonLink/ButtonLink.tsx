import { createComponent, sstyled, Root, Component } from '@semcore/core';
import Link from '@semcore/link';
import React from 'react';

import style from './buttonLink.shadow.css';
import type { ButtonLinkComponent, ButtonLinkProps } from './ButtonLink.type';

class RootButtonLink extends Component<ButtonLinkProps> {
  static displayName = 'ButtonLink';
  static style = style;
  static defaultProps = {
    use: 'primary',
    size: 200,
  };

  render(): React.ReactNode {
    const SButtonLink = Root;

    return sstyled(style)(
      <SButtonLink
        render={Link}
        tag='button'
        role='button'
        type='button'
      />,
    );
  }
}

export const ButtonLink = createComponent(RootButtonLink, {
  Text: Link.Text,
  Addon: Link.Addon,
}, {
  parent: Link,
}) as ButtonLinkComponent;
