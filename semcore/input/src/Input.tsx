import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import NeighborLocation, {
  INeighborItemProps,
  INeighborLocationProps,
  neighborLocationEnhance,
} from '@semcore/neighbor-location';
import autoFocusEnhance, {
  IWithAutoFocusEnhanceProps,
} from '@semcore/utils/lib/enhances/autoFocusEnhance';

import style from './style/input.shadow.css';

export type InputSize = 's' | 'm' | 'l' | 'xl';

export interface IInputProps extends IBoxProps, INeighborItemProps, INeighborLocationProps {
  /**
   * Input size
   * @default m
   */
  size?: InputSize;
  /**
   * Sets the input state
   * @default normal
   */
  state?: 'normal' | 'invalid' | 'valid';
}

export interface IInputValueProps
  extends IBoxProps,
    INeighborItemProps,
    IWithAutoFocusEnhanceProps {
  /**
   * Input size
   * @default m
   */
  size?: InputSize;
  /**
   * Handler for changing the value
   */
  onChange?: (value: string, event?: React.SyntheticEvent<HTMLInputElement>) => void;
}

export interface IInputAddonProps extends IBoxProps, INeighborItemProps {
  /**
   * Adds styles for interactive icons
   */
  interactive?: boolean;
  /**
   * Blocks the addon
   * */
  disabled?: boolean;
  /**
   * Input size
   * @default m
   */
  size?: InputSize;
}

export interface IInputContext extends IInputProps {
  getAddonProps: PropGetter<Input['getAddonProps']>;
  getValueProps: PropGetter<Input['getValueProps']>;
}

class Input extends Component<IInputProps> {
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

  inputRef = React.createRef<HTMLInputElement>();

  handleMouseDownAddon = (e) => {
    e.preventDefault();
    this.inputRef.current?.focus();
  };

  handlerValueFocus = () => {
    this.setState({ focused: true });
  };

  handlerValueBlur = () => {
    this.setState({ focused: false });
  };

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
      onFocus: this.handlerValueFocus,
      onBlur: this.handlerValueBlur,
    };
  }

  render() {
    const { Root: SInput } = this;
    const SOutline = 'div';
    const { Children, styles, size, state, neighborLocation, controlsLength } = this.asProps;
    const { focused } = this.state;

    return styled(styles)(
      <SInput
        render={Box}
        neighborLocation={neighborLocation}
        state={state}
        size={size}
        focused={focused}
      >
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
        <SOutline />
      </SInput>,
    );
  }
}

class Value extends Component<IInputValueProps> {
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
    const SValue = this.Root;
    const { styles, size, neighborLocation } = this.asProps;

    return styled(styles)(
      <SValue
        render={Box}
        tag="input"
        type="text"
        neighborLocation={neighborLocation}
        size={size}
      />,
    );
  }
}

function Addon(props: IFunctionProps<IInputAddonProps>) {
  const { Root: SAddon, interactive, disabled, size, styles } = props;

  return styled(styles)(
    <SAddon render={Box} interactive={interactive} disabled={disabled} size={size} />,
  );
}

Addon.enhance = [neighborLocationEnhance()];

export default createComponent<
  Merge<IInputProps, HTMLAttributes<HTMLDivElement>>,
  {
    Addon: Merge<IInputAddonProps, HTMLAttributes<HTMLSpanElement>>;
    Value: Merge<IInputValueProps, InputHTMLAttributes<HTMLInputElement>>;
  },
  IInputContext
>(Input, { Value, Addon });
