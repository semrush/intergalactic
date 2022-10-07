import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/input.shadow.css';

class Input extends Component {
  static displayName = 'Input';

  static defaultProps = {
    size: 'm',
    state: 'normal',
  };
  static style = style;

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
    const { Children, styles, neighborLocation, controlsLength } = this.asProps;
    const { focused } = this.state;
    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SInput render={Box} focused={focused} neighborLocation={neighborLocation}>
              <NeighborLocation controlsLength={controlsLength}>
                <Children />
              </NeighborLocation>
              <SOutline />
            </SInput>,
          )
        }
      </NeighborLocation.Detect>
    );
  }
}

class Value extends Component {
  static defaultProps = {
    defaultValue: '',
  };
  static enhance = [keyboardFocusEnhance(), autoFocusEnhance()];

  uncontrolledProps() {
    return {
      value: (e) => e.target.value,
    };
  }

  render() {
    const SValue = Root;
    const { styles, neighborLocation } = this.asProps;

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SValue render={Box} neighborLocation={neighborLocation} tag="input" type="text" />,
          )
        }
      </NeighborLocation.Detect>
    );
  }
}

function Addon(props) {
  const SAddon = Root;
  const { Children, styles, neighborLocation } = props;
  return (
    <NeighborLocation.Detect neighborLocation={neighborLocation}>
      {(neighborLocation) =>
        sstyled(styles)(
          <SAddon render={Box} neighborLocation={neighborLocation}>
            <Children />
          </SAddon>,
        )
      }
    </NeighborLocation.Detect>
  );
}

export default createComponent(Input, {
  Addon,
  Value,
});
