import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  sstyled,
  Root,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import NeighborLocation, {
  INeighborItemProps,
  INeighborLocationProps,
  neighborLocationEnhance,
} from '@semcore/neighbor-location';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import resolveColor from '@semcore/utils/lib/color';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';

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

export type SwitchTheme = 'info' | 'success' | string;

export interface ISwitchProps extends IBoxProps, INeighborLocationProps {
  /** Switch size
   * @default m
   */
  size?: 'm' | 'l' | 'xl';
  /** Switch theme
   * @default info
   */
  theme?: SwitchTheme;
}

export interface ISwitchValueProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /** Handler on change */
  onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Control state  */
  checked?: boolean;
  /** Initial state for uncontrolled mode
   * @default false */
  defaultChecked?: boolean;
  /** The list of properties that can be placed in the hidden input */
  includeInputProps?: string[];
  /** Switch theme */
  theme?: SwitchTheme;
  /** @ignore */
  $rootForceUpdate?: () => void;
}

export interface ISwitchAddonProps extends IBoxProps, INeighborItemProps {}

export interface ISwitchContext extends ISwitchProps {
  getTextProps: PropGetter<() => {}>;
  getValueProps: PropGetter<Switch['getValueProps']>;
}

class Switch extends Component<ISwitchProps> {
  static displayName = 'Switch';
  static style = style;
  static defaultProps = {
    theme: 'info',
    size: 'm',
  };

  inputRef = React.createRef<HTMLInputElement>();

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

class Value extends Component<ISwitchValueProps> {
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
        checked={(inputProps as ISwitchValueProps).checked}
        color={resolveColor(getColor(theme))}
        {...toggleProps}
      >
        <SInput tag="input" type="checkbox" ref={forwardRef} {...inputProps} />
        <SSlider>
          <Children />
        </SSlider>
      </SToggle>,
    );
  }
}

function Addon(props: IFunctionProps<ISwitchAddonProps>) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag="span" />);
}
Addon.enhance = [neighborLocationEnhance()];

export { inputProps };
export default createComponent<
  Merge<ISwitchProps, HTMLAttributes<HTMLDivElement>>,
  {
    Addon: Merge<ISwitchAddonProps, HTMLAttributes<HTMLSpanElement>>;
    Value: Merge<ISwitchValueProps, InputHTMLAttributes<HTMLInputElement>>;
  },
  ISwitchContext
>(Switch, {
  Value,
  Addon,
});
