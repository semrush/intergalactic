import type { IRootComponentProps } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import type { SwitchProps } from '@semcore/switch';
import Switch from '@semcore/switch';
import React from 'react';

import style from './switch.shadow.css';
import type { HighlightedSwitchComponent } from './Switch.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class SwitchFHRoot extends Component<SwitchProps> {
  static displayName = 'SwitchFH';
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
    let left = '4px';
    if (size === 'l') left = '12px';
    if (size === 'xl') left = '14px';

    return {
      show: checked,
      curve: size === 'l' || size === 'xl' ? 9 : undefined,
      left,
    };
  }

  render() {
    const SInput = Root;
    return sstyled(this.asProps.styles)(
      <SInput render={Switch} />,
    );
  }
}

function Value(props: IRootComponentProps & { onChange: () => void }) {
  const SToggle = Root;

  return sstyled(props.styles)(<SToggle render={Switch.Value} onChange={props.onChange} />);
}

export const SwitchFH = createComponent<
  HighlightedSwitchComponent,
  typeof SwitchFHRoot
>(SwitchFHRoot, {
  Addon: Switch.Addon,
  Value: Value,
  AnimatedSparkles,
});
