import type { IRootComponentProps } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import Switch from '@semcore/switch';
import React from 'react';

import style from './switch.shadow.css';
import type { AnimatedSparklesProps, SwitchComponent } from './Switch.type';
import Sparkle from '../../inner-components/sparkle/Sparkle';

class SwitchAFRoot extends Component {
  static displayName = 'SwitchAF';
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
    const checked = this.inputRef.current?.checked;

    return {
      checked,
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

function AnimatedSparkles(props: AnimatedSparklesProps & { checked: boolean }) {
  return props.checked && [...new Array(props.count)].map((_, index) => {
    return (
      <Sparkle key={index} index={index} num={props.count} curve={9} />
    );
  });
}

export const SwitchAF = createComponent(SwitchAFRoot, {
  Addon: Switch.Addon,
  Value: Value,
  AnimatedSparkles,
}) as SwitchComponent;
