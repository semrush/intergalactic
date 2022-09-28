import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import resolveColor from '@semcore/utils/lib/color';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/switch.shadow.css';

function isCustomTheme(theme) {
  return !['info', 'success'].includes(theme);
}

class Switch extends Component {
  static displayName = 'Switch';
  static style = style;
  static enhance = [uniqueIDEnhancement()];
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
    const { theme, uid } = this.asProps;

    return {
      theme,
      ref: this.inputRef,
      $rootForceUpdate: this.forceUpdate,
      uid,
    };
  }

  getAddonProps() {
    const { uid } = this.asProps;

    return { uid };
  }

  render() {
    const SSwitch = Root;
    const { Children, styles, controlsLength } = this.asProps;
    const checked = this.inputRef.current?.checked;

    return sstyled(styles)(
      <SSwitch render={Box} tag="label" checked={checked}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SSwitch>,
    );
  }
}

class Value extends Component {
  static hoistProps = ['checked', 'disabled'];
  static enhance = [keyboardFocusEnhance()];
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };

  timer = null;

  uncontrolledProps() {
    return {
      checked: [
        (e) => e.target.checked,
        () => {
          // TODO: bad crutch for updating the DOM node
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) this.handlers.checked(!this.asProps.checked, e);
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
      uid,
      ...other
    } = this.asProps;

    const [inputProps, toggleProps] = getInputProps(other, includeInputProps);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;
    const color = resolveColor(theme);

    const labelledBy = inputProps.checked
      ? `igc-${uid}-switch-addon-left`
      : `igc-${uid}-switch-addon-right`;

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SToggle
              keyboardFocused={keyboardFocused}
              neighborLocation={neighborLocation}
              checked={inputProps.checked}
              use:theme={useTheme}
              use:color={color}
              {...toggleProps}
            >
              <SInput
                tag="input"
                type="checkbox"
                ref={forwardRef}
                role="switch"
                aria-labelledby={labelledBy}
                aria-checked={inputProps.checked}
                aria-readonly={inputProps.disabled}
                {...inputProps}
                onKeyDown={callAllEventHandlers(this.handleKeyDown, inputProps.onKeyDown)}
              />
              <SSlider checked={inputProps.checked}>
                <Children />
              </SSlider>
            </SToggle>,
          )
        }
      </NeighborLocation.Detect>
    );
  }
}

function Addon(props) {
  const SAddon = Root;
  const { styles, neighborLocation, uid } = props;

  return (
    <NeighborLocation.Detect neighborLocation={neighborLocation}>
      {(neighborLocation) =>
        sstyled(styles)(
          <SAddon
            render={Box}
            tag="span"
            aria-hidden="true"
            id={`igc-${uid}-switch-addon-${neighborLocation}`}
          />,
        )
      }
    </NeighborLocation.Detect>
  );
}

export { inputProps };
export default createComponent(Switch, {
  Value,
  Addon,
});
