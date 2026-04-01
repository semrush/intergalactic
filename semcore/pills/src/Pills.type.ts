import type { Box, BoxProps, NeighborItemProps, NeighborLocationProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type React from 'react';

export type PillsValue = string | number | boolean | null;

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
     * when set to `auto` pressing left and right arrows
     * selects corresponding sibling pill.
     *
     * It's recommended to use `auto` behavior in forms
     * while `manual` behavior for navigation and layout.
     * @default tabs
     */
    behavior?:
      | 'auto'
      | 'manual';
  };

export type PillProps = BoxProps &
  NeighborItemProps & {
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

export type PillsContext = {
  getItemProps: PropGetterFn;
};

export type PillsHandlers = {
  value: (value: PillProps['value'], event: React.SyntheticEvent) => PillProps['value'];
};

export type IntergalacticPillsComponent<PropsExtending = {}> = (<
  Value extends PillsValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    PillsProps<Value>,
    PillsContext,
    [handlers: PillsHandlers]
  > &
  PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', PillsProps>;

export type PillsComponent = IntergalacticPillsComponent & {
  Item: Intergalactic.Component<'button', PillProps, [handlers: PillsHandlers]> & {
    Text: typeof Box;
    Addon: typeof Box;
  };
};
