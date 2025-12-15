import { AbstractComponent, createComponent, Root, sstyled, CONTEXT_COMPONENT } from '@semcore/core';
import type { RadioProps, RadioValueProps } from '@semcore/radio';
import Radio, { RadioGroup } from '@semcore/radio';
import type { TextProps } from '@semcore/typography';
import React from 'react';

import style from './radio.shadow.css';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class RadioFHRoot extends AbstractComponent<RadioProps> {
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
    const SHighlightedRadio = Root();
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

function Text(props: TextProps) {
  const SRoot = Root();
  return (<SRoot render={Radio.Text} />);
}

function Value(props: RadioValueProps) {
  const SRoot = Root();
  return (<SRoot render={Radio.Value} />);
}

export const RadioFH = createComponent(RadioFHRoot, {
  Text,
  Value,
  AnimatedSparkles,
});
