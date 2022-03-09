import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
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
    const SInput = Root;
    const SOutline = 'div';
    const { Children, styles, controlsLength } = this.asProps;
    const { focused } = this.state;

    return sstyled(styles)(
      <SInput render={Box} focused={focused}>
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
    const SValue = Root;

    return sstyled(this.asProps.styles)(<SValue render={Box} tag="input" type="text" />);
  }
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />);
}

Addon.enhance = [neighborLocationEnhance()];

export default createComponent(Input, {
  Addon,
  Value,
});
