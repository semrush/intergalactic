import React, { ComponentProps } from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { INeighborItemProps, INeighborLocationProps } from '@semcore/neighbor-location';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type TabLineValue = string | number | boolean;

export interface ITabLineProps<T extends TabLineValue = TabLineValue>
  extends IBoxProps,
    INeighborLocationProps {
  /** TabLine size
   * @default m
   * */
  size?: 'm' | 'l' | 'xl';
  /** Adds a bottom border for the entire component
   * @default true
   * */
  underlined?: boolean;
  /** Is invoked when changing the selection */
  onChange?: (value: T, e?: React.SyntheticEvent<HTMLButtonElement>) => void;
  /** Value of the selected tab */
  value?: T;
}

export interface ITabLineItemProps extends IBoxProps, IKeyboardFocusProps, INeighborItemProps {
  /** Makes a tab selected. This property is determined automatically depending on the value. */
  selected?: boolean;
  /** Disabled state  */
  disabled?: boolean;
  /** Tab value */
  value: TabLineValue;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag  */
  addonRight?: React.ElementType;
}

export interface ITabLineContext {
  getItemProps: PropGetterFn;
}

export interface ITabLineHandlers {
  value: (value: TabLineValue) => void;
}

declare const TabLine: (<T, V>(
  props: CProps<ITabLineProps<V> & T, ITabLineContext, ITabLineHandlers>,
) => ReturnEl) & {
  Item: (<T>(props: CProps<ITabLineItemProps & T, {}, ITabLineHandlers>) => ReturnEl) & {
    Text: typeof Box;
    Addon: typeof Box;
  };
};

export default TabLine;
