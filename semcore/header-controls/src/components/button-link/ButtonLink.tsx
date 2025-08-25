import { ButtonLink } from '@semcore/button';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import React from 'react';

import style from './buttonLink.shadow.css';

class HeaderButtonLinkRoot extends Component {
  static displayName = 'HeaderButtonLink';
  static style = style;

  render() {
    const SHeaderButtonLink = Root;
    return sstyled(this.asProps.styles)(
      <SHeaderButtonLink render={ButtonLink} />,
    );
  }
}

export const HeaderButtonLink = createComponent(HeaderButtonLinkRoot) as typeof ButtonLink;
