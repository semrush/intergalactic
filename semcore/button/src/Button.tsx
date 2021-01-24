import React, { HTMLAttributes } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { INeighborItemProps, neighborLocationEnhance } from '@semcore/neighbor-location';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import SpinButton from './SpinButton';

import style from './style/button.shadow.css';

export type ButtonSize = 'xl' | 'l' | 'm' | 's';

export interface IButtonProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /**
   *  Button type
   * @default secondary
   */
  use?: 'primary' | 'secondary' | 'tertiary';
  /** Button theme */
  theme?: 'info' | 'success' | 'warning' | 'danger' | 'muted' | 'invert';
  /** Button activity state */
  active?: boolean;
  /**
   *  Button size
   * @default m
   */
  size?: ButtonSize;
  /** Disabled button state */
  disabled?: boolean;
  /** Loading button state */
  loading?: boolean;
  /** Tag for the left Addon */
  addonLeft?: React.ElementType;
  /** Tag for the right Addon */
  addonRight?: React.ElementType;
}

export interface IButtonTextProps extends IBoxProps {
  size?: ButtonSize;
}

export interface IButtonAddonProps extends IBoxProps {
  size?: ButtonSize;
}

export interface IButtonContext extends IButtonProps {
  getTextProps: PropGetter<RootButton['getTextProps']>;
  getAddonProps: PropGetter<RootButton['getAddonProps']>;
}

export const MAP_USE_DEFAULT_THEME = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

class RootButton extends Component<IButtonProps> {
  static displayName = 'Button';
  static enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];
  static style = style;
  static defaultProps = {
    use: 'secondary',
    size: 'm',
  };

  getTextProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  getAddonProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  render() {
    const { Root: SButton } = this;
    const SInner = Box;
    const SSpin = Box;
    const {
      Children,
      styles,
      use,
      theme = typeof use === 'string' && MAP_USE_DEFAULT_THEME[use],
      loading,
      disabled = loading,
      active,
      size,
      addonLeft,
      addonRight,
      keyboardFocused,
      neighborLocation,
    } = this.asProps;

    const useTheme = use && theme ? `${use}-${theme}` : false;
    return styled(styles)(
      <SButton
        render={Box}
        type="button"
        tag="button"
        disabled={disabled}
        theme={useTheme}
        size={size}
        active={active}
        neighborLocation={neighborLocation}
        keyboardFocused={keyboardFocused}
      >
        <SInner tag="span" loading={loading}>
          {addonLeft ? <Button.Addon tag={addonLeft} /> : null}
          {addonTextChildren(Children, Button.Text, Button.Addon)}
          {addonRight ? <Button.Addon tag={addonRight} /> : null}
        </SInner>
        {loading && (
          <SSpin tag="span">
            <SpinButton centered size={size} theme={useTheme} />
          </SSpin>
        )}
      </SButton>,
    );
  }
}

function Text(props: IFunctionProps<IButtonTextProps>) {
  const { Root: SText, size, styles } = props;
  return styled(styles)(<SText render={Box} tag="span" size={size} />);
}

function Addon(props: IFunctionProps<IButtonAddonProps>) {
  const { Root: SAddon, size, styles } = props;
  return styled(styles)(<SAddon render={Box} tag="span" size={size} />);
}

const Button = createComponent<
  Merge<IButtonProps, HTMLAttributes<HTMLButtonElement>>,
  {
    Addon: Merge<IButtonAddonProps, HTMLAttributes<HTMLSpanElement>>;
    Text: Merge<IButtonTextProps, HTMLAttributes<HTMLSpanElement>>;
  },
  IButtonContext
>(RootButton, {
  Text,
  Addon,
});

export default Button;
