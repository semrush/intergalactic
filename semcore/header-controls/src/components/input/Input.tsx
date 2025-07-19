import { Component, createComponent, Root, sstyled } from '@semcore/core';
import Input from '@semcore/input';
import React from 'react';

import style from './input.shadow.css';

class HeaderInputRoot extends Component {
  static displayName = 'HeaderInput';
  static style = style;

  render() {
    const SHeaderInput = Root;
    return sstyled(this.asProps.styles)(
      <SHeaderInput render={Input} />,
    );
  }
}

export const HeaderInput = createComponent(HeaderInputRoot) as typeof Input;
