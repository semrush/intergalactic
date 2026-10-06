import { createComponent, Component, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import animatedSizeEnhance from '@semcore/core/lib/utils/enhances/animatedSizeEnhance';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import Spin from '@semcore/spin';
import React from 'react';

import BaseTrigger from './BaseTrigger';
import style from './style/button-trigger.shadow.css';

class RootButtonTrigger extends Component {
  static displayName = 'ButtonTrigger';
  static style = style;
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-control',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
    animatedSizeEnhance({
      animateProps: ['width'],
      onChangeOf: ['value'],
    }),
  ];

  static defaultProps = {
    chevron: true,
  };

  getTextProps() {
    return {
      tag: 'span',
    };
  }

  getAddonProps() {
    return {
      tag: 'span',
    };
  }

  render() {
    const SButtonAddon = ButtonTrigger.Addon;
    const SButtonTriggerSpin = Spin;
    const { Children, styles, loading, disabled, chevron, empty } = this.asProps;

    return sstyled(styles)(
      <Root render={BaseTrigger} use:disabled={disabled || loading}>
        {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon, empty)}
        {(chevron || loading) && (
          <SButtonAddon>
            {loading ? <SButtonTriggerSpin size='xs' /> : <ChevronDown />}
          </SButtonAddon>
        )}
      </Root>,
    );
  }
}

/**
 * ButtonTrigger
 *
 * {@link https://developer.semrush.com/intergalactic/components/base-trigger/base-trigger-api#buttontrigger|API} | {@link https://developer.semrush.com/intergalactic/components/base-trigger/base-trigger-code#buttontrigger|Examples}
 */
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
