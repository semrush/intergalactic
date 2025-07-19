import Button from '@semcore/button';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import React from 'react';

import style from './button.shadow.css';

class HeaderButtonRoot extends Component {
  static displayName = 'HeaderButton';
  static style = style;

  static defaultProps = {
    theme: 'invert',
  };

  render() {
    const SHeaderButton = Root;
    return sstyled(this.asProps.styles)(
      <SHeaderButton render={Button} />,
    );
  }
}

export const HeaderButton = createComponent(HeaderButtonRoot) as typeof Button;
