import type { CheckboxProps, CheckboxTextProps, CheckboxValueProps } from '@semcore/checkbox';
import Checkbox from '@semcore/checkbox';
import { AbstractComponent, createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import style from './checkbox.shadow.css';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class CheckboxFHRoot extends AbstractComponent<CheckboxProps> {
  static displayName = 'CheckboxFH';
  static style = style;

  inputRef = React.createRef<HTMLInputElement>();

  getValueProps() {
    return {
      ref: this.inputRef,
      onChange: () => {
        setTimeout(() => {
          this.forceUpdate();
        });
      },
    };
  }

  getAnimatedSparklesProps() {
    const { size } = this.asProps;
    const checked = this.inputRef.current?.checked;

    return {
      show: checked,
      top: size === 'l' ? '7px' : '5px',
      left: size === 'l' ? '5px' : '3px',
    };
  }

  render() {
    const SHighlightedCheckbox = Root();
    const { styles, Children, children: hasChildren } = this.asProps;

    return sstyled(styles)(
      <SHighlightedCheckbox render={Checkbox}>
        {hasChildren
          ? <Children />
          : (
              <>
                <CheckboxFH.Value />
                <CheckboxFH.Text />
              </>
            )}
      </SHighlightedCheckbox>,
    );
  }
}

function Text(props: CheckboxTextProps) {
  const SRoot = Root();
  return (<SRoot render={Checkbox.Text} />);
}

function Value(props: CheckboxValueProps) {
  const SRoot = Root();
  return (<SRoot render={Checkbox.Value} />);
}

export const CheckboxFH = createComponent(CheckboxFHRoot, {
  Text,
  Value,
  AnimatedSparkles,
});
