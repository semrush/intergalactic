import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { NEIGHBOR_LOCATION_AUTO_DETECT } from '@semcore/neighbor-location';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/input.shadow.css';

class Input extends Component {
  static displayName = 'Input';
  static [NEIGHBOR_LOCATION_AUTO_DETECT] = true;
  static style = style;
  static defaultProps = {
    size: 'm',
    state: 'normal',
  };

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
    const { disabled } = this.asProps;
    return {
      disabled,
      onMouseDown: this.handleMouseDownAddon,
    };
  }

  getValueProps() {
    const { size, disabled } = this.asProps;
    return {
      ref: this.inputRef,
      size,
      disabled,
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
  static enhance = [keyboardFocusEnhance(), autoFocusEnhance()];
  static [NEIGHBOR_LOCATION_AUTO_DETECT] = true;
  static defaultProps = {
    defaultValue: '',
  };

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
  const { Children } = props;
  return sstyled(props.styles)(
    <SAddon render={Box}>
      <Children />
    </SAddon>,
  );
}

Addon[NEIGHBOR_LOCATION_AUTO_DETECT] = true;

export default createComponent(Input, {
  Addon,
  Value,
});
