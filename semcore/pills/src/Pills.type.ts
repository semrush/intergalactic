import type { NSBox, NSNeighborLocation } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSPills {
  // TODO: It looks like the value isn't accurate. Revise and align it with the component's logic.
  type Value = string | number | boolean | null;
  type Props<T extends NSPills.Value = NSPills.Value> = NSBox.Props & {
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
  type Ctx = {
    getItemProps: PropGetterFn;
  };
  type Handlers = {
    value: null;
  };
  type DefaultProps = {
    size: 'm';
    defaultValue: null;
    behavior: Props['behavior'];
  };
  namespace Pill {
    type Props = NSBox.Props & NSNeighborLocation.Detect.Props & {
      /** Pill value */
      value?: NSPills.Value;
      /** Disabled state */
      disabled?: boolean;
      /** Selected state */
      selected?: boolean;
      /** Left addon text */
      addonLeft?: React.ElementType;
      /** Right addon tag */
      addonRight?: React.ElementType;
    };
    namespace Text {
      type Component = NSText.Component;
    }
    namespace Addon {
      type Component = NSBox.Component;
    }

    type Component = Intergalactic.Component<'button', Props, [handlers: Handlers]>;
  }

  type WrapComponent<PropsExtending = {}> = (<
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

  type Component = WrapComponent & {
    Item: Pill.Component & {
      Text: Pill.Text.Component;
      Addon: Pill.Addon.Component;
    };
  };
}

/** @deprecated It will be removed in v19. */
export type PillsValue = NSPills.Value;
/** @deprecated It will be removed in v19. */
export type PillsProps<T extends PillsValue = PillsValue> = NSPills.Props<T>;
/** @deprecated It will be removed in v19. */
export type PillProps = NSPills.Pill.Props;
/** @deprecated It will be removed in v19. */
export type PillsContext = NSPills.Ctx;
/** @deprecated It will be removed in v19. */
export type PillsHandlers = NSPills.Handlers;

export type { NSPills };
