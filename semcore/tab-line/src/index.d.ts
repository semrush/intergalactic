import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { INeighborItemProps, NeighborLocationProps } from '@semcore/neighbor-location';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type TabLineValue = string | number | boolean;

/** @deprecated */
export interface ITabLineProps<T extends TabLineValue = TabLineValue>
  extends TabLineProps<T>,
    UnknownProperties {}
export type TabLineProps<T extends TabLineValue = TabLineValue> = BoxProps &
  NeighborLocationProps & {
    /** TabLine size
     * @default m
     * */
    size?: 'm' | 'l' | false;
    /** Adds a bottom border for the entire component
     * @default true
     * */
    underlined?: boolean;
    /** Is invoked when changing the selection */
    onChange?:
      | ((value: T, e?: React.SyntheticEvent<HTMLButtonElement>) => void)
      | React.Dispatch<React.SetStateAction<T>>;
    /** Value of the selected tab */
    value?: T;
    /** Default value of the selected tab
     * @default null
     * */
    defaultValue?: T;
  };

/** @deprecated */
export interface ITabLineItemProps extends TabLineItemProps, UnknownProperties {}
export type TabLineItemProps = BoxProps &
  KeyboardFocusProps &
  INeighborItemProps & {
    /** Makes a tab selected. This property is determined automatically depending on the value. */
    selected?: boolean;
    /** Disabled state  */
    disabled?: boolean;
    /** Tab value */
    value?: TabLineValue;
    /** Left addon tag */
    addonLeft?: React.ElementType;
    /** Right addon tag  */
    addonRight?: React.ElementType;
  };

/** @deprecated */
export interface ITabLineContext extends TabLineContext, UnknownProperties {}
export type TabLineContext = {
  getItemProps: PropGetterFn;
};

/** @deprecated */
export interface ITabLineHandlers extends TabLineHandlers, UnknownProperties {}
export type TabLineHandlers = {
  value: (value: TabLineValue) => void;
};

type IntergalacticTabLineComponent = (<
  Value extends TabLineValue,
  Tag extends Intergalactic.InternalTypings.ComponentTag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    TabLineProps<Value>,
    TabLineContext,
    [handlers: TabLineHandlers]
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div'>;

declare const TabLine: IntergalacticTabLineComponent & {
  Item: Intergalactic.Component<'div', TabLineItemProps, {}, [handlers: TabLineHandlers]> & {
    Text: typeof Box;
    Addon: typeof Box;
  };
};

export default TabLine;
