import type { NSBox, NSFlex } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type React from 'react';

declare namespace NSSlider {
  // TODO: type value accurately depending on `options`.
  type Value = string | number;
  type Ctx = {
    getOptionsProps: PropGetterFn;
    getItemProps: PropGetterFn;
  };
  type Handlers = {
    value: null;
  };
  type Option<V extends NSSlider.Value> = {
    value: V;
    label: React.ReactNode;
  };
  type Props<V extends NSSlider.Value = NSSlider.Value> = NSBox.Props & {
    /** Numeric value
     */
    value?: V;
    /** Numeric default value
     * @default 0
     */
    defaultValue?: V;
    /** Minimum value
     * @default 0
     */
    min?: number;
    /** Maximum value
     * @default 100
     */
    max?: number;
    /** Value change step
     * @default 1
     */
    step?: number;
    /**
     * Handler for changing the value
     */
    onChange?: ((value: V, event: React.SyntheticEvent) => void) | React.Dispatch<React.SetStateAction<V>>;
    /**
     * Disable element
     */
    disabled?: boolean;
    /** Predefined slider options */
    options?: NSSlider.Option<V>[];
  };

  type DefaultProps = {
    defaultValue: number;
    min: number;
    max: number;
    step: number;
    children: React.ReactNode;
  };

  namespace Knob {
    type Component = NSBox.Component;
  }
  namespace Bar {
    type Component = NSBox.Component;
  }
  namespace Options {
    type Props = NSFlex.Props;
    type Component = Intergalactic.Component<
      'div',
      Props,
      NSSlider.Ctx,
      [handlers: NSSlider.Handlers]
    >;
  }
  namespace Item {
    type Props = NSBox.Props;
    type Component = Intergalactic.Component<'div', Props, NSSlider.Ctx, [handlers: NSSlider.Handlers]>;
  }

  type WrapperComponent<PropsExtending = {}> = (<
    V extends NSSlider.Value,
    Tag extends Intergalactic.Tag = 'div',
  >(
    props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', NSSlider.Props<V>> &
      PropsExtending,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', NSSlider.Props>;

  type Component = WrapperComponent & {
    Knob: Knob.Component;
    Bar: Bar.Component;
    Options: Options.Component;
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type SliderOption<V extends NSSlider.Value> = NSSlider.Option<V>;
/** @deprecated It will be removed in v19. */
export type SliderProps<V extends NSSlider.Value = NSSlider.Value> = NSSlider.Props<V>;

export type { NSSlider };
