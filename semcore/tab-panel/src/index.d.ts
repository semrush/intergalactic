import React, { ComponentProps } from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type TabPanelValue = string | number | boolean;

export interface ITabPanelProps<T extends TabPanelValue = TabPanelValue> extends IBoxProps {
  /** Is invoked when changing the selection */
  onChange?: (value: T, e?: React.SyntheticEvent<HTMLButtonElement>) => void;
  /** Value of the selected tab */
  value?: T;
}

export interface ITabPanelItemProps extends IBoxProps, IKeyboardFocusProps {
  /** Makes a tab selected. This property is determined automatically depending on the value. */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Left addon tag  */
  addonLeft?: React.ElementType;
  /** Right addon tag  */
  addonRight?: React.ElementType;
}

export interface ITabPanelContext {
  getItemProps: PropGetterFn;
}

export interface ITabPanelHandlers {
  value: (value: TabPanelValue) => void;
}

declare const TabPanel: (<T, V>(
  props: CProps<ITabPanelProps<V> & T, ITabPanelContext, ITabPanelHandlers>,
) => ReturnEl) & {
  Item: (<T>(props: CProps<ITabPanelItemProps & T, {}, ITabPanelHandlers>) => ReturnEl) & {
    Text: typeof Box;
    Addon: typeof Box;
  };
};

export default TabPanel;
