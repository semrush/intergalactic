import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { neighborLocationEnhance } from '@semcore/neighbor-location';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';

import style from './style/input.shadow.css';

class Input extends Component {
  static displayName = 'Input';

  static defaultProps = {
    size: 'm',
    state: 'normal',
  };
  static style = style;
  static enhance = [neighborLocationEnhance()];

  state = {
    focused: false,
  };

  inputRef = React.createRef();

  handleMouseDownAddon = (e) => {
    e.preventDefault();
    this.inputRef.current?.focus();
  };

  bindHandlerValueFocused = (focused) => () => this.setState({ focused });

  getAddonProps() {
    const { size } = this.asProps;
    return {
      size,
      onMouseDown: this.handleMouseDownAddon,
    };
  }

  getValueProps() {
    const { size } = this.asProps;
    return {
      ref: this.inputRef,
      size,
      onFocus: this.bindHandlerValueFocused(true),
      onBlur: this.bindHandlerValueFocused(false),
    };
  }

  render() {
    const { Root: SInput } = this;
    const SOutline = 'div';
    const { Children, styles, size, state, neighborLocation, controlsLength } = this.asProps;
    const { focused } = this.state;

    return styled(styles)(
      <SInput
        render={Box}
        neighborLocation={neighborLocation}
        state={state}
        size={size}
        focused={focused}
      >
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
        <SOutline />
      </SInput>,
    );
  }
}

class Value extends Component {
  static defaultProps = {
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance(), neighborLocationEnhance()];

  uncontrolledProps() {
    return {
      value: (e) => e.target.value,
    };
  }

  render() {
    const SValue = this.Root;
    const { styles, size, neighborLocation } = this.asProps;

    return styled(styles)(
      <SValue
        render={Box}
        tag="input"
        type="text"
        neighborLocation={neighborLocation}
        size={size}
      />,
    );
  }
}

function Addon(props) {
  const { Root: SAddon, interactive, disabled, size, styles } = props;

  return styled(styles)(
    <SAddon render={Box} interactive={interactive} disabled={disabled} size={size} />,
  );
}

Addon.enhance = [neighborLocationEnhance()];

export default createComponent(Input, {
  Addon,
  Value,
});
