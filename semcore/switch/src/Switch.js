import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { neighborLocationEnhance } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import resolveColor from '@semcore/utils/lib/color';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

import style from './style/switch.shadow.css';

function getColor(theme) {
  switch (theme) {
    case 'info':
      return 'light-blue';
    case 'success':
      return 'green';
    default:
      return theme;
  }
}

class Switch extends Component {
  static displayName = 'Switch';
  static style = style;
  static defaultProps = {
    theme: 'info',
    size: 'm',
  };

  inputRef = React.createRef();

  constructor(props) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  getValueProps() {
    const { theme } = this.asProps;
    return {
      theme,
      ref: this.inputRef,
      $rootForceUpdate: this.forceUpdate,
    };
  }

  render() {
    const SSwitch = Root;
    const { Children, styles, controlsLength } = this.asProps;

    return sstyled(styles)(
      <SSwitch render={Box} tag="label" checked={this.inputRef.current?.checked}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SSwitch>,
    );
  }
}

class Value extends Component {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };
  static hoistProps = ['disabled'];
  static enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

  uncontrolledProps() {
    return {
      checked: [
        (e) => e.target.checked,
        () => {
          // TODO: bad crutch for updating the DOM node
          setTimeout(() => {
            this.asProps.$rootForceUpdate();
          }, 0);
        },
      ],
    };
  }

  componentDidMount() {
    this.asProps.$rootForceUpdate();
  }

  componentDidUpdate(prevProps) {
    const { checked } = prevProps;
    // TODO: bad crutch for updating the DOM node
    if (checked !== undefined && checked !== this.asProps.checked) {
      this.asProps.$rootForceUpdate();
    }
  }

  handleKeyDown = (e) => {
    const { currentTarget } = e;
    if (e.keyCode === 13) this.handlers.checked(!this.asProps.checked);
  };

  render() {
    const SToggle = Box;
    const SInput = Box;
    const SSlider = Box;
    const {
      Children,
      forwardRef,
      styles,
      includeInputProps,
      keyboardFocused,
      neighborLocation,
      theme,
      ...other
    } = this.asProps;

    const [inputProps, toggleProps] = getInputProps(other, includeInputProps);

    return sstyled(styles)(
      <SToggle
        keyboardFocused={keyboardFocused}
        neighborLocation={neighborLocation}
        checked={inputProps.checked}
        color={resolveColor(getColor(theme))}
        {...toggleProps}
      >
        <SInput
          tag="input"
          type="checkbox"
          ref={forwardRef}
          role="switch"
          aria-checked={inputProps.checked}
          {...inputProps}
          onKeyDown={callAllEventHandlers(this.handleKeyDown, inputProps.onKeyDown)}
        />
        <SSlider>
          <Children />
        </SSlider>
      </SToggle>,
    );
  }
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag="span" />);
}
Addon.enhance = [neighborLocationEnhance()];

export { inputProps };
export default createComponent(Switch, {
  Value,
  Addon,
});
