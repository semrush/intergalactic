import { Component, createComponent, Root, sstyled, CONTEXT_COMPONENT } from '@semcore/core';
import type { NSRadio } from '@semcore/radio';
import Radio, { RadioGroup } from '@semcore/radio';
import React from 'react';

import style from './radio.shadow.css';
import type { HighlightedRadioComponent } from './Radio.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class RadioFHRoot extends Component<NSRadio.Props> {
  static displayName = 'RadioFH';
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
      onChange: this.setChecked, // for click by label / programmatically changed
      onClick: this.setChecked, // for click by radio
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

  setChecked = () => {
    this.setState({ checked: false });
    setTimeout(() => {
      this.setState({ checked: this.inputRef.current?.checked });
    });
  };

  render() {
    const SHighlightedRadio = Root;
    const { styles, Children, children: hasChildren } = this.asProps;

    return sstyled(styles)(
      <SHighlightedRadio render={Radio}>
        {hasChildren
          ? <Children />
          : (
              <>
                <RadioFH.Value />
                <RadioFH.Text />
              </>
            )}
      </SHighlightedRadio>,
    );
  }
}

export const RadioFH = createComponent<
  HighlightedRadioComponent,
  typeof RadioFHRoot
>(RadioFHRoot, {
  Text: Radio.Text,
  Value: Radio.Value,
  AnimatedSparkles,
});
