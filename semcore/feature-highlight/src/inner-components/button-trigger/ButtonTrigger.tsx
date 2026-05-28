import { ButtonTrigger } from '@semcore/base-trigger';
import type { IRootComponentProps } from '@semcore/core';
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

export const ButtonTriggerFH = createComponent<
  HighlightedButtonTriggerComponent,
  typeof ButtonTriggerFHRoot
>(ButtonTriggerFHRoot, {
  Text: ButtonTrigger.Text,
  Addon,
});
