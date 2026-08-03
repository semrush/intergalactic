import type { Intergalactic } from '@semcore/core';
import { createComponent, sstyled, Root, Component } from '@semcore/core';
import Link from '@semcore/link';
import React from 'react';

import style from './buttonLink.shadow.css';
import type { NSButtonLink } from './ButtonLink.type';

class RootButtonLink extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSButtonLink.Component>,
  [],
  {},
  {},
  {},
  NSButtonLink.DefaultProps
> {
  static displayName = 'ButtonLink';
  static style = style;
  static defaultProps = {
    use: 'primary',
    size: 200,
  } as const;

  render(): React.ReactNode {
    const SButtonLink = Root;
    const { disabled } = this.asProps;

    return sstyled(style)(
      <SButtonLink
        render={Link}
        tag='button'
        type='button'
        use:disabled={disabled}
        use:tabIndex={0}
      />,
    );
  }
}

/**
 * ButtonLink
 *
 * {@link https://developer.semrush.com/intergalactic/components/button/button-api/|API} | {@link https://developer.semrush.com/intergalactic/components/button/button-code/|Examples}
 */
export const ButtonLink = createComponent<NSButtonLink.Component, typeof RootButtonLink>(
  RootButtonLink,
  {
    Text: Link.Text,
    Addon: Link.Addon,
  },
  {
    parent: Link,
  },
);
