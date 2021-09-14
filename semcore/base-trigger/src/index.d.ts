import React, { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import Dot from '@semcore/dot';
import { INeighborItemProps } from '@semcore/neighbor-location';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

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

export interface IButtonTriggerProps extends Omit<IBaseTriggerProps, 'theme'> {
  /** Sets the loading state */
  loading?: boolean;
}

export interface ILinkTriggerProps extends Omit<IBaseTriggerProps, 'theme'> {
  /** Sets the loading state */
  loading?: boolean;
  /** Text color */
  color?: string;
}

export interface IFilterTriggerProps extends IBaseTriggerProps {
  /** Click on the filter cleaning cross */
  onClear?: (event: React.SyntheticEvent) => void;
}

declare const BaseTrigger: (<T>(props: CProps<IBaseTriggerProps & T>) => ReturnEl) & {
  Text: typeof Box;
  Addon: typeof Box;
};

declare const ButtonTrigger: (<T>(props: CProps<IButtonTriggerProps & T>) => ReturnEl) & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
};

declare const LinkTrigger: (<T>(props: CProps<ILinkTriggerProps & T>) => ReturnEl) & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
};

declare const FilterTrigger: (<T>(props: CProps<ILinkTriggerProps & T>) => ReturnEl) & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
  Counter: <T>(
    props: ComponentProps<typeof BaseTrigger.Addon> & ComponentProps<typeof Dot> & T,
  ) => ReturnEl;
};

export default BaseTrigger;
export { ButtonTrigger, LinkTrigger, FilterTrigger };
