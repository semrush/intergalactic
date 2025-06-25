import { ButtonTrigger } from '@semcore/base-trigger';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './buttonTrigger.shadow.css';
import type { ButtonTriggerAccentComponent } from './ButtonTrigger.type';

class ButtonTriggerAFRoot extends Component {
  static displayName = 'ButtonTriggerAF';
  static style = style;

  render() {
    const { styles } = this.asProps;
    const SAccentButtonTrigger = Root;
    return sstyled(styles)(
      <SAccentButtonTrigger render={ButtonTrigger} />,
    );
  }
}

function Addon() {
  return <Root render={ButtonTrigger.Addon} tag={SummaryAI} color='icon-primary-ai' />;
}

export const ButtonTriggerAF = createComponent(ButtonTriggerAFRoot, {
  Text: ButtonTrigger.Text,
  Addon,
}) as ButtonTriggerAccentComponent;
