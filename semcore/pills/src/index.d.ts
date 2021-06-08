import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import React from 'react';
import { INeighborItemProps, INeighborLocationProps } from '@semcore/neighbor-location';
import { IBoxProps } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type PillsValue = string | number | boolean;

export interface IPillsProps<T extends PillsValue = PillsValue> extends INeighborLocationProps {
  /** Pills size */
  size?: 'xl' | 'l' | 'm' | 's' | false;
  /** Disabled state */
  disabled?: boolean;
  /** Called when the selection is changed */
  onChange?: (value: T, e?: React.SyntheticEvent<HTMLSpanElement>) => void;
  /** Value for the selected pill */
  value?: T;
  /** Default value for the selected pill */
  defaultValue?: T;
}

export interface IPillProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /** Disabled state */
  disabled?: boolean;
  /** Pill value */
  value: PillsValue;
  /** Left addon text */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
}

export interface IPillsContext {
  getItemProps: PropGetterFn;
}

export interface IPopperHandlers {
  value: (value: PillsValue) => void;
}

declare const Pills: (<T, V>(
  props: CProps<IPillsProps<V> & T, IPillsContext, IPopperHandlers>,
) => ReturnEl) & {
  Item: (<T>(props: CProps<IPillProps & T, {}, IPopperHandlers>) => ReturnEl) & {
    Text: (props: ComponentProps<typeof Box>) => ReturnEl;
    Addon: (props: ComponentProps<typeof Box>) => ReturnEl;
  };
};

export default Pills;
