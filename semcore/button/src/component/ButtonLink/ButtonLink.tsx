import { createComponent, sstyled, Root, Component, type IRootComponentProps } from '@semcore/core';
import Link from '@semcore/link';
import React from 'react';

import style from './buttonLink.shadow.css';
import type { ButtonLinkComponent, ButtonLinkDefaultProps, ButtonLinkProps } from './ButtonLink.type';

class RootButtonLink extends Component<
  ButtonLinkProps,
  [],
  {},
  {},
  {},
  ButtonLinkDefaultProps
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

function Text(props: IRootComponentProps) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Link.Text} />);
}

/**
 * ButtonLink
 *
 * {@link https://developer.semrush.com/intergalactic/components/button/button-api/|API} | {@link https://developer.semrush.com/intergalactic/components/button/button-code/|Examples}
 */
export const ButtonLink = createComponent<ButtonLinkComponent, typeof RootButtonLink>(
  RootButtonLink,
  {
    Text,
    Addon: Link.Addon,
  },
  {
    parent: Link,
  },
);
