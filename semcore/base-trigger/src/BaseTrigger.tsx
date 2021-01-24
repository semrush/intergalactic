import React, { HTMLAttributes, ComponentProps } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { INeighborItemProps, neighborLocationEnhance } from '@semcore/neighbor-location';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';

import style from './style/base-trigger.shadow.css';

export interface IBaseTriggerProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /**
   * Trigger size
   * @default m
   */
  size?: 'm' | 'l' | 'xl';
  /**
   * Trigger state
   */
  state?: 'normal' | 'valid' | 'invalid';
  /**
   * Sets active state to trigger
   */
  active?: boolean;
  /**
   * Responsible for placeholder displaying
   */
  empty?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: React.ReactNode;
  /**
   * Sets disabled state to trigger
   */
  disabled?: boolean;
  /** Trigger theme
   * @deprecated {@link IBaseTriggerProps.state}
   * */
  theme?: 'normal' | 'valid' | 'invalid' | false;
}

export interface IBaseTriggerContext extends IBaseTriggerProps {
  getTextProps: PropGetter<RootBaseTrigger['getTextProps']>;
  getAddonProps: PropGetter<() => {}>;
}

class RootBaseTrigger extends Component<IBaseTriggerProps> {
  static displayName = 'BaseTrigger';
  static style = style;
  static defaultProps = {
    size: 'm',
  };
  static enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
    };
  }

  render() {
    const SBaseTrigger = this.Root;
    const SInner = 'div';
    const {
      Children,
      styles,
      size,
      state,
      active,
      disabled,
      keyboardFocused,
      neighborLocation,
      theme,
      ...other
    } = this.asProps;

    logger.warn(
      theme !== undefined,
      "Свойство 'theme' является устаревшим, используйте 'state'",
      other['data-ui-name'] || BaseTrigger.displayName,
    );

    // TODO: add aria
    return styled(styles)(
      <SBaseTrigger
        render={Box}
        active={active}
        disabled={disabled}
        state={state || theme}
        size={size}
        neighborLocation={neighborLocation}
        keyboardFocused={keyboardFocused}
      >
        <SInner>{addonTextChildren(Children, BaseTrigger.Text, BaseTrigger.Addon)}</SInner>
      </SBaseTrigger>,
    );
  }
}

function Text(props: IFunctionProps<ReturnType<RootBaseTrigger['getTextProps']>>) {
  const { Root: SText, Children, styles, empty, placeholder } = props;

  return styled(styles)(
    <SText render={Box} placeholder={empty}>
      {empty ? placeholder : <Children />}
    </SText>,
  );
}

function Addon(props) {
  const { Root: SAddon, styles } = props;
  return styled(styles)(<SAddon render={Box} />);
}

const BaseTrigger = createComponent<
  Merge<IBaseTriggerProps, HTMLAttributes<HTMLDivElement>>,
  {
    Text: ComponentProps<typeof Box>;
    Addon: ComponentProps<typeof Box>;
  },
  IBaseTriggerContext
>(RootBaseTrigger, {
  Text,
  Addon,
});

export default BaseTrigger;
