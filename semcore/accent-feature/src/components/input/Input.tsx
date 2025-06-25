import { Component, createComponent, Root, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Input from '@semcore/input';
import React from 'react';

import style from './input.shadow.css';

class InputAFRoot extends Component {
  static displayName = 'InputAF';
  static style = style;

  render() {
    const SInput = Root;
    return sstyled(this.asProps.styles)(
      <SInput render={Input} />,
    );
  }
}

function AccentAddon() {
  return (<Root render={Input.Addon}><SummaryAI color='icon-primary-ai' /></Root>);
}
AccentAddon.displayName = 'Addon';

export const InputAF = createComponent(InputAFRoot, {
  AccentAddon,
  Addon: Input.Addon,
  Value: Input.Value,
}) as typeof Input & {
  AccentAddon: typeof Input.Addon;
};
