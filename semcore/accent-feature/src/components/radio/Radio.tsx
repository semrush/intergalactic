import { Component, createComponent, Root, sstyled, CONTEXT_COMPONENT } from '@semcore/core';
import type { RadioProps } from '@semcore/radio';
import Radio, { RadioGroup } from '@semcore/radio';
import React from 'react';

import style from './radio.shadow.css';
import type { RadioComponent } from './Radio.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class RadioAFRoot extends Component<RadioProps> {
  static displayName = 'RadioAF';
  static style = style;
  // @ts-ignore
  static contextType = RadioGroup[CONTEXT_COMPONENT];

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
    // @ts-ignore
    const { size } = this.context;
    const checked = this.state.checked;

    return {
      show: checked,
      top: size === 'l' ? '7px' : '5px',
      left: size === 'l' ? '5px' : '3px',
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
