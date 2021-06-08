import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import style from './style/divider.shadow.css';

class Divider extends Component {
  static displayName = 'Divider';
  static style = style;
  static defaultProps = {
    use: 'primary',
    orientation: 'horizontal',
  };

  render() {
    const SDivider = Root;
    return sstyled(this.asProps.styles)(
      <SDivider render={Box} />,
    );
  }
}

export default createComponent(Divider);
