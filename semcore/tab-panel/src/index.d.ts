import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';

export type TabPanelValue = string | number | boolean;

/** @deprecated */
export interface ITabPanelProps<T extends TabPanelValue = TabPanelValue>
  extends TabPanelProps<T>,
    UnknownProperties {}
export type TabPanelProps<T extends TabPanelValue = TabPanelValue> = BoxProps & {
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
  /**
   * Behavior of tabs.
   * In `auto`, changes the tab immediately when press arrow.
   * In `manual`, needs to press `space` or `enter` for select a choice.
   * @default 'auto'
   */
  behavior?: 'auto' | 'manual';
};

/** @deprecated */
export interface ITabPanelItemProps extends TabPanelItemProps, UnknownProperties {}
export type TabPanelItemProps = BoxProps & {
  /** Makes a tab selected. This property is determined automatically depending on the value. */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Tab value */
  value?: TabPanelValue;
  /** Left addon tag  */
  addonLeft?: React.ElementType;
  /** Right addon tag  */
  addonRight?: React.ElementType;
};

/** @deprecated */
export interface ITabPanelContext extends TabPanelContext, UnknownProperties {}
export type TabPanelContext = {
  getItemProps: PropGetterFn;
};

/** @deprecated */
export interface ITabPanelHandlers extends TabPanelHandlers, UnknownProperties {}
export type TabPanelHandlers = {
  value: (value: TabPanelValue) => void;
};

type IntergalacticTabPanelComponent<PropsExtending = {}> = (<
  Value extends TabPanelValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    TabPanelProps<Value>,
    TabPanelContext,
    [handlers: TabPanelHandlers]
  > &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', TabPanelProps>;

declare const TabPanel: IntergalacticTabPanelComponent & {
  Item: Intergalactic.Component<'div', TabPanelItemProps, {}, [handlers: TabPanelHandlers]> & {
    Text: typeof Box;
    Addon: typeof Box;
  };
};

declare const wrapTabPanel: <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticTabPanelComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
) => IntergalacticTabPanelComponent<PropsExtending>;
export { wrapTabPanel };

export default TabPanel;
