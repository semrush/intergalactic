import { ButtonTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';
import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './buttonTrigger.shadow.css';
import type { HighlightedButtonTriggerComponent } from './ButtonTrigger.type';
import { AnimatedSparkles } from '../sparkle/AnimatedSparkles';

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

function Addon(props: IRootComponentProps) {
  const SAddon = Root;
  const { Children, children: hasChildren } = props;
  return sstyled(props.styles)(
    <SAddon render={ButtonTrigger.Addon}>
      {hasChildren
        ? (<Children />)
        : (
            <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
          )}
    </SAddon>,
  );
}

export const ButtonTriggerFH = createComponent(ButtonTriggerFHRoot, {
  Text: ButtonTrigger.Text,
  Addon,
}) as HighlightedButtonTriggerComponent;
