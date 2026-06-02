import { NeighborLocation, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React from 'react';

import style from './style/switch.shadow.css';
import type { NSSwitch } from './Switch.type';

function isCustomTheme(theme?: NSSwitch.Theme) {
  if (!theme) return true;

  return !['info', 'success'].includes(theme);
}

class SwitchRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSSwitch.Component>,
  typeof SwitchRoot.enhance,
  {},
  {},
  {},
  NSSwitch.DefaultProps
> {
  static displayName = 'Switch';
  static style = style;
  static enhance = [uniqueIDEnhancement()] as const;
  static defaultProps = {
    theme: 'info',
    size: 'm',
  } as const;

  inputRef = React.createRef<HTMLInputElement>();
  state = { active: false };

  constructor(props: NSSwitch.Props) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  handleMouseUp = () => {
    this.setState({ active: false });
  };

  handleMouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (event?.button !== 0) return;
    this.setState({ active: true });
  };

  getValueProps() {
    const { theme, uid, disabled } = this.asProps;
    const { active } = this.state;

    return {
      theme,
      ref: this.inputRef,
      $rootForceUpdate: this.forceUpdate,
      uid,
      active,
      disabled,
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
      <SSwitch
        render={Box}
        tag='label'
        checked={checked}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SSwitch>,
    );
  }
}

class Value extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSSwitch.Value.Component, typeof SwitchRoot, 'Value'>,
  typeof Value.enhance,
  NSSwitch.Value.Handlers
> {
  static enhance = [resolveColorEnhance()] as const;
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };

  timer: ReturnType<typeof setTimeout> | undefined = undefined;

  uncontrolledProps(): NSSwitch.Value.Handlers {
    return {
      checked: [
        (e: React.ChangeEvent<HTMLInputElement>) => e.target.checked,
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

  componentDidUpdate(prevProps: typeof this.props) {
    const { checked } = prevProps;
    // TODO: bad crutch for updating the DOM node
    if (checked !== undefined && checked !== this.asProps.checked) {
      this.asProps.$rootForceUpdate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handlers.checked(!this.asProps.checked, event);
    }
  };

  // because clicking on label causes a click on input
  handlerInputClick = (e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation();

  render() {
    const SToggle = Box;
    const SInput = Box;
    const SSlider = Box;
    const {
      Children,
      forwardRef,
      styles,
      includeInputProps,
      neighborLocation,
      theme,
      uid: _uid,
      active,
      resolveColor,
      ...other
    } = this.asProps;

    const [inputProps, toggleProps] = getInputProps(other, includeInputProps);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;
    const color = resolveColor(theme);

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SToggle
              // @ts-expect-error
              neighborLocation={neighborLocation}
              checked={inputProps.checked}
              active={active}
              use:theme={useTheme}
              use:color={color}
              {...toggleProps}
            >
              <SInput
                tag='input'
                type='checkbox'
                ref={forwardRef}
                role='switch'
                aria-readonly={inputProps.disabled}
                {...inputProps}
                onClick={callAllEventHandlers(this.handlerInputClick, inputProps.click)}
                onKeyDown={callAllEventHandlers(this.handleKeyDown, inputProps.onKeyDown)}
              />
              <SSlider
                // @ts-expect-error
                checked={inputProps.checked}
              >
                <Children />
              </SSlider>
            </SToggle>,
          )}
      </NeighborLocation.Detect>
    );
  }
}

function Addon(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSSwitch.Addon.Component, typeof SwitchRoot, 'Addon'>,
) {
  const SAddon = Root;
  const { styles, neighborLocation, uid } = props;

  return (
    <NeighborLocation.Detect neighborLocation={neighborLocation}>
      {(neighborLocation) =>
        sstyled(styles)(
          <SAddon
            render={Box}
            tag='span'
            neighborLocation={neighborLocation}
            id={`igc-${uid}-switch-addon-${neighborLocation}`}
          />,
        )}
    </NeighborLocation.Detect>
  );
}

export { inputProps };

const Switch = createComponent<
  NSSwitch.Component,
  typeof SwitchRoot
>(SwitchRoot, {
  Value,
  Addon,
});

export default Switch;
