import type { IRootComponentProps } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import findComponent from '@semcore/core/lib/utils/findComponent';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Radio from '@semcore/radio';
import React from 'react';

import style from './radio.shadow.css';
import type { RadioComponent } from './Radio.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';
import Sparkle from '../../inner-components/sparkle/Sparkle';

class RadioAFRoot extends Component {
  static displayName = 'RadioAF';
  static style = style;

  inputRef = React.createRef<HTMLInputElement>();

  state = {
    checked: false,
  };

  getValueProps() {
    return {
      ref: this.inputRef,
      onChange: () => {
        this.setState({ checked: false });
        setTimeout(() => {
          this.setState({ checked: this.inputRef.current?.checked });
        });
      },
    };
  }

  getAnimatedSparklesProps() {
    return {
      show: this.state.checked,
      top: '5px',
      left: '3px',
    };
  }

  render() {
    const SRadioAF = Root;
    const { styles, Children, children: hasChildren } = this.asProps;

    return sstyled(styles)(
      <SRadioAF render={Radio}>
        {hasChildren
          ? <Children />
          : (
              <>
                <RadioAF.Value />
                <RadioAF.Text />
              </>
            )}
      </SRadioAF>,
    );
  }
}

export const RadioAF = createComponent(RadioAFRoot, {
  Text: Radio.Text,
  Value: Radio.Value,
  AnimatedSparkles,
}) as RadioComponent;
