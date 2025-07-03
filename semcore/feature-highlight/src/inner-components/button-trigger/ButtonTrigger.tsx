import { ButtonTrigger } from '@semcore/base-trigger';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './buttonTrigger.shadow.css';
import type { HighlightedButtonTriggerComponent } from './ButtonTrigger.type';

class ButtonTriggerFHRoot extends Component {
  static displayName = 'ButtonTriggerFH';
  static style = style;

  render() {
    const { styles } = this.asProps;
    const SHighlightedButtonTrigger = Root;
    return sstyled(styles)(
      <SHighlightedButtonTrigger render={ButtonTrigger} />,
    );
  }
}

function Addon() {
  return <Root render={ButtonTrigger.Addon} tag={SummaryAI} color='--intergalactic-icon-primary-feature-highlight' />;
}

export const ButtonTriggerFH = createComponent(ButtonTriggerFHRoot, {
  Text: ButtonTrigger.Text,
  Addon,
}) as HighlightedButtonTriggerComponent;
