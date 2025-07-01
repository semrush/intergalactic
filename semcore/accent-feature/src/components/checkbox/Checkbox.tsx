import type { CheckboxProps } from '@semcore/checkbox';
import Checkbox from '@semcore/checkbox';
import type { IRootComponentProps } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import findComponent from '@semcore/core/lib/utils/findComponent';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './checbox.shadow.css';
import type { CheckboxComponent } from './Checkbox.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';
import Sparkle from '../../inner-components/sparkle/Sparkle';

class CheckboxAFRoot extends Component<CheckboxProps> {
  static displayName = 'CheckboxAF';
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
    const SCheckboxAF = Root;
    const { styles, Children, children: hasChildren } = this.asProps;

    return sstyled(styles)(
      <SCheckboxAF render={Checkbox}>
        {hasChildren
          ? <Children />
          : (
              <>
                <CheckboxAF.Value />
                <CheckboxAF.Text />
              </>
            )}
      </SCheckboxAF>,
    );
  }
}

export const CheckboxAF = createComponent(CheckboxAFRoot, {
  Text: Checkbox.Text,
  Value: Checkbox.Value,
  AnimatedSparkles,
}) as CheckboxComponent;
