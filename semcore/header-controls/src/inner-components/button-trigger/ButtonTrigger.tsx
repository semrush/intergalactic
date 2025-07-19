import { ButtonTrigger } from '@semcore/base-trigger';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import React from 'react';

import style from './buttonTrigger.shadow.css';

class HeaderButtonTriggerRoot extends Component {
  static displayName = 'HeaderButtonTrigger';
  static style = style;

  render() {
    const SHeaderButtonTrigger = Root;
    return sstyled(this.asProps.styles)(
      <SHeaderButtonTrigger render={ButtonTrigger} />,
    );
  }
}

export const HeaderButtonTrigger = createComponent(HeaderButtonTriggerRoot) as typeof ButtonTrigger;
