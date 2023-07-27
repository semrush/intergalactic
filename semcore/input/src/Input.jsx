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

  handleMouseDownAddon = (event) => {
    event.preventDefault();
    this.inputRef.current?.focus();
  };
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setTimeout(() => {
        if (document.activeElement === document.body) {
          this.inputRef.current?.focus();
        }
      }, 10);
    }
  };

  bindHandlerValueFocused = (focused) => () => this.setState({ focused });

  getAddonProps() {
    const { disabled, size } = this.asProps;
    return {
      disabled,
      onMouseDown: this.handleMouseDownAddon,
      size,
    };
  }

  getValueProps() {
    const {
      size,
      disabled,
      state,
      role,
      placeholder,
      // these props might be passed from the <Select /> component
      'aria-haspopup': ariaHaspopup,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-autocomplete': ariaAutocomplete,
      'aria-owns': ariaOwns,
      'aria-activedescendant': ariaActivedescendant,
    } = this.asProps;

    return {
      ref: this.inputRef,
      size,
      disabled,
      state,
      onFocus: this.bindHandlerValueFocused(true),
      onBlur: this.bindHandlerValueFocused(false),
      role,
      placeholder,
      'aria-haspopup': ariaHaspopup,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-autocomplete': ariaAutocomplete,
      'aria-owns': ariaOwns,
      'aria-activedescendant': ariaActivedescendant,
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
            <SInput
              render={Box}
              focused={focused}
              onKeyDown={this.handleKeyDown}
              neighborLocation={neighborLocation}
              __excludeProps={[
                'role',
                'aria-haspopup',
                'aria-controls',
                'aria-expanded',
                'placeholder',
                'aria-autocomplete',
                'aria-owns',
                'aria-activedescendant',
              ]}
            >
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
    const { styles, neighborLocation, state } = this.asProps;

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SValue
              render={Box}
              neighborLocation={neighborLocation}
              tag='input'
              type='text'
              aria-invalid={state === 'invalid'}
            />,
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
