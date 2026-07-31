import Checkbox from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import style from './checkbox.shadow.css';
import type { NSCheckboxFH } from './Checkbox.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class CheckboxFHRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSCheckboxFH.Component>
> {
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
    const SHighlightedCheckbox = Root;
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

/**
 * Checkbox FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#checkbox|Docs}
 */
export const CheckboxFH = createComponent<
  NSCheckboxFH.Component,
 typeof CheckboxFHRoot
>(CheckboxFHRoot, {
  Text: Checkbox.Text,
  Value: Checkbox.Value,
  AnimatedSparkles,
});
