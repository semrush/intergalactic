import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box, InvalidStateBox } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import autoFocusEnhance from '@semcore/core/lib/utils/enhances/autoFocusEnhance';

import style from './style/input.shadow.css';

class Input extends Component {
  static displayName = 'Input';

  static defaultProps = {
    size: 'm',
    state: 'normal',
  };
  static style = style;

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
    const { Children, styles, neighborLocation, controlsLength, state } = this.asProps;
    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SInput
              render={Box}
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
                'tabIndex',
              ]}
            >
              <NeighborLocation controlsLength={controlsLength}>
                <Children />
              </NeighborLocation>
              <SOutline>{state === 'invalid' && <InvalidStateBox />}</SOutline>
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
  static enhance = [autoFocusEnhance()];

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
