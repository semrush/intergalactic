import { NeighborLocation, Box, InvalidStateBox } from '@semcore/base-components';
import { createComponent, Component, Root, lastInteraction } from '@semcore/core';
import { input } from '@semcore/styled-system/recipes';
import React from 'react';
class Input extends Component {
  static displayName = 'Input';

  static defaultProps = {
    size: 'm',
    state: 'normal',
  };

  inputRef = React.createRef();

  handleMouseDownAddon = (event) => {
    event.preventDefault();
    this.inputRef.current?.focus();
  };

  handleClick = () => {
    if (!lastInteraction.isKeyboard) return;
    setTimeout(() => {
      if (document.activeElement === document.body) {
        this.inputRef.current?.focus();
      }
    }, 0);
  };

  getAddonProps() {
    const { disabled, size } = this.asProps;
    return {
      disabled,
      onMouseDown: this.handleMouseDownAddon,
      onClick: this.handleClick,
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
      'ref': this.inputRef,
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
    const { Children, neighborLocation, controlsLength, state } = this.asProps;
    const [variantProps] = input.splitVariantProps(this.asProps);

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) => (
          <SInput
            render={Box}
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
            className={input({ ...variantProps, neighborLocation }).root}
          >
            <NeighborLocation controlsLength={controlsLength}>
              <Children />
            </NeighborLocation>
            <SOutline className={input({ ...variantProps, neighborLocation }).outline}>{state === 'invalid' && <InvalidStateBox />}</SOutline>
          </SInput>
        )}
      </NeighborLocation.Detect>
    );
  }
}

class Value extends Component {
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
    const { neighborLocation, state } = this.asProps;

    const [variantProps] = input.splitVariantProps(this.asProps);

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) => (
          <SValue
            render={Box}
            inAfterOutline
            neighborLocation={neighborLocation}
            tag='input'
            type='text'
            aria-invalid={state === 'invalid'}
            className={input({ ...variantProps, neighborLocation }).value}
          />
        )}
      </NeighborLocation.Detect>
    );
  }
}

function Addon(props) {
  const SAddon = Root;
  const { Children, neighborLocation } = props;

  const [variantProps] = input.splitVariantProps(props);

  return (
    <NeighborLocation.Detect neighborLocation={neighborLocation}>
      {(neighborLocation) => (
        <SAddon className={input({ ...variantProps, neighborLocation }).addon} render={Box} neighborLocation={neighborLocation}>
          <Children />
        </SAddon>
      )}
    </NeighborLocation.Detect>
  );
}

export default createComponent(Input, {
  Addon,
  Value,
});
