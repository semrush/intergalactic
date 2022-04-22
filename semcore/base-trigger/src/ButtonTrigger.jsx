import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import BaseTrigger from './BaseTrigger';
import Spin from '@semcore/spin';

import style from './style/button-trigger.shadow.css';

class RootButtonTrigger extends Component {
  static displayName = 'ButtonTrigger';
  static style = style;

  render() {
    const SButtonAddon = ButtonTrigger.Addon;
    const SButtonTriggerSpin = Spin;
    const { Children, styles, loading } = this.asProps;

    return sstyled(styles)(
      <Root render={BaseTrigger}>
        {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon)}
        <SButtonAddon>
          {loading ? <SButtonTriggerSpin size="xs" theme={false} /> : <ChevronDown />}
        </SButtonAddon>
      </Root>,
    );
  }
}

const ButtonTrigger = createComponent(
  RootButtonTrigger,
  {
    Text: BaseTrigger.Text,
    Addon: BaseTrigger.Addon,
  },
  {
    parent: BaseTrigger,
  },
);

export default ButtonTrigger;
