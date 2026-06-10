import type { Box, BoxProps, NeighborItemProps, NeighborLocationProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSTabLine {
  type Value = string | number | boolean;
  type Props<T extends NSTabLine.Value = NSTabLine.Value> = BoxProps &
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

      /**
       * Behavior of tabs.
       * In `auto`, changes the tab immediately when press arrow.
       * In `manual`, needs to press `space` or `enter` for select a choice.
       * @default 'auto'
       */
      behavior?: 'auto' | 'manual';
    };
  type Ctx = {
    getItemProps: PropGetterFn;
  };
  type Handlers = {
    value: null;
  };

  type DefaultProps = {
    defaultValue: 0;
    size: 'm';
    underlined: true;
    behavior: 'auto';
  };

  namespace Item {
    type Props = BoxProps &
      NeighborItemProps & {
        /** Makes a tab selected. This property is determined automatically depending on the value. */
        selected?: boolean;
        /** Disabled state  */
        disabled?: boolean;
        /** Tab value */
        value?: NSTabLine.Value;
        /** Left addon tag */
        addonLeft?: React.ElementType;
        /** Right addon tag  */
        addonRight?: React.ElementType;
      };

    namespace Text {
        type Props = NSText.Props;
        type Component = NSText.Component;
    }

    namespace Addon {
        type Component = typeof Box;
    }

    type Component = Intergalactic.Component<'div', Props, {}, [handlers: NSTabLine.Handlers]> & {
      Text: Text.Component;
      Addon: Addon.Component;
    };
  }

  type WrapperComponent<PropsExtending = {}> = (<
    V extends Value,
    Tag extends Intergalactic.Tag = 'div',
  >(
    props: Intergalactic.InternalTypings.ComponentProps<
      Tag,
      'div',
      Props<V>,
      Ctx,
      [handlers: Handlers]
    > &
    PropsExtending,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', Props>;

  type Component = WrapperComponent & {
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type TabLineValue = NSTabLine.Value;
/** @deprecated It will be removed in v18. */
export type TabLineProps<T extends TabLineValue = TabLineValue> = NSTabLine.Props<T>;
/** @deprecated It will be removed in v18. */
export type TabLineItemProps = NSTabLine.Item.Props;
/** @deprecated It will be removed in v18. */
export type TabLineContext = NSTabLine.Ctx;
/** @deprecated It will be removed in v18. */
export type TabLineHandlers = NSTabLine.Handlers;

export type { NSTabLine };
