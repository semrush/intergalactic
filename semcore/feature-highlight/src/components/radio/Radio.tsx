import type { Intergalactic } from '@semcore/core';
import { Component, createComponent, Root, sstyled, CONTEXT_COMPONENT } from '@semcore/core';
import Radio, { RadioGroup } from '@semcore/radio';
import React from 'react';

import style from './radio.shadow.css';
import type { NSRadioFH } from './Radio.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class RadioFHRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSRadioFH.Component>
> {
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

/**
 * Radio FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#radio|Docs}
 */
export const RadioFH = createComponent<
  NSRadioFH.Component,
  typeof RadioFHRoot
>(RadioFHRoot, {
  Text: Radio.Text,
  Value: Radio.Value,
  AnimatedSparkles,
});
