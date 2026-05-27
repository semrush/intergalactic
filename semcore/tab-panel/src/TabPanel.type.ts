import type { Box, BoxProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { NSText } from '@semcore/typography';

declare namespace NSTabPanel {
  type Value = string | number | boolean;
  type Props<V extends NSTabPanel.Value = NSTabPanel.Value> = BoxProps & {
    /** Is invoked when changing the selection */
    onChange?:
      | ((value: V, e?: React.SyntheticEvent<HTMLButtonElement>) => void)
      | React.Dispatch<React.SetStateAction<V>>;
    /** Value of the selected tab */
    value?: V;
    /** Default value of the selected tab
     * @default null
     * */
    defaultValue?: V;
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
    behavior: 'manual';
  };

  namespace Item {
    type Props = BoxProps & {
      /** Makes a tab selected. This property is determined automatically depending on the value. */
      selected?: boolean;
      /** Disabled state */
      disabled?: boolean;
      /** Tab value */
      value?: NSTabPanel.Value;
      /** Left addon tag  */
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

    type Component = Intergalactic.Component<'div', Props, {}, [handlers: NSTabPanel.Handlers]> & {
      Text: Text.Component;
      Addon: Addon.Component;
    };
  }

  type WrapperComponent<PropsExtending = {}> = (<
    V extends NSTabPanel.Value,
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
  ) => Intergalactic.InternalTypings.ComponentRenderingResults) & Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', Props>;

  type Component = WrapperComponent & {
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type TabPanelValue = NSTabPanel.Value;
/** @deprecated It will be removed in v18. */
export type TabPanelProps<T extends NSTabPanel.Value = NSTabPanel.Value> = NSTabPanel.Props<T>;
/** @deprecated It will be removed in v18. */
export type TabPanelItemProps = NSTabPanel.Item.Props;
/** @deprecated It will be removed in v18. */
export type TabPanelContext = NSTabPanel.Ctx;
/** @deprecated It will be removed in v18. */
export type TabPanelHandlers = NSTabPanel.Handlers;

export type { NSTabPanel };
