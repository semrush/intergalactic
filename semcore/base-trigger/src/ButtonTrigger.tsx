import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import ChevronDownXS from '@semcore/icon/lib/ChevronDown/xs';
import BaseTrigger, { IBaseTriggerProps } from './BaseTrigger';
import Spin from '@semcore/spin';

import style from './style/button-trigger.shadow.css';

export interface IButtonTriggerProps extends Omit<IBaseTriggerProps, 'theme'> {
  /** Sets the loading state */
  loading?: boolean;
}

class RootButtonTrigger extends Component<IButtonTriggerProps> {
  static displayName = 'ButtonTrigger';
  static style = style;

  render() {
    const { Root } = this;
    const SButtonAddon = ButtonTrigger.Addon;
    const { Children, loading, styles } = this.asProps;

    return styled(styles)(
      <Root render={BaseTrigger}>
        {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon)}
        <SButtonAddon>
          {loading ? <Spin size="xs" theme="#a6b0b3" /> : <ChevronDownXS />}
        </SButtonAddon>
      </Root>,
    );
  }
}

const ButtonTrigger = createComponent<
  Merge<IButtonTriggerProps, HTMLAttributes<HTMLDivElement>>,
  {
    Text: ComponentProps<typeof BaseTrigger.Text>;
    Addon: ComponentProps<typeof BaseTrigger.Addon>;
  }
>(
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
