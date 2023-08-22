import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { NeighborItemProps, NeighborLocationProps } from '@semcore/neighbor-location';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type PillsValue = string | number | boolean | null;

/** @deprecated */
export interface IPillsProps<T extends PillsValue = PillsValue>
  extends PillsProps<T>,
    UnknownProperties {}
export type PillsProps<T extends PillsValue = PillsValue> = NeighborLocationProps &
  BoxProps & {
    /** Pills size */
    size?: 'l' | 'm';
    /** Disabled state */
    disabled?: boolean;
    /** Called when the selection is changed */
    onChange?:
      | ((value: T, e?: React.SyntheticEvent<HTMLSpanElement>) => void)
      | React.Dispatch<React.SetStateAction<T>>;
    /** Value for the selected pill */
    value?: T;
    /** Default value for the selected pill */
    defaultValue?: T;
    /** Sets semantic role for corresponding behavior,
     * when set to `radio` pressing left and right arrows
     * selects corresponding sibling pill.
     *
     * It's recommended to use `radio` behavior in forms
     * while `tabs` behavior for navigation and layout.
     * @default tabs
     */
    behavior?: 'tabs' | 'radio';
  };

/** @deprecated */
export interface IPillProps extends PillProps, UnknownProperties {}
export type PillProps = BoxProps &
  NeighborItemProps &
  KeyboardFocusProps & {
    /** Pill value */
    value?: PillsValue;
    /** Disabled state */
    disabled?: boolean;
    /** Selected state */
    selected?: boolean;
    /** Left addon text */
    addonLeft?: React.ElementType;
    /** Right addon tag */
    addonRight?: React.ElementType;
  };

/** @deprecated */
export interface IPillsContext extends PillsContext, UnknownProperties {}
export type PillsContext = {
  getItemProps: PropGetterFn;
};

/** @deprecated */
export interface IPillsHandlers extends PillsHandlers, UnknownProperties {}
export type PillsHandlers = {
  value: (value: PillsValue) => void;
};

type IntergalacticPillsComponent = (<
  Value extends PillsValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    PillsProps<Value>,
    PillsContext,
    [handlers: PillsHandlers]
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div'>;

declare const Pills: IntergalacticPillsComponent & {
  Item: Intergalactic.Component<'button', PillProps, [handlers: PillsHandlers]> & {
    Text: typeof Box;
    Addon: typeof Box;
  };
};

export default Pills;
