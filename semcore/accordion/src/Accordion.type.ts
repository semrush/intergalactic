import type { BoxProps, FlexProps, Flex } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';
import type { Property } from 'csstype';

declare namespace NSAccordion {
  // TODO: It looks like the value isn't accurate. Revise and align it with the component's logic.
  type Value = null | number | string | Array<number | string | null>;
  type Props<V extends NSAccordion.Value = NSAccordion.Value> = FlexProps & {
  /** Value for the active tab. Can be set as stroke, number, null or as array.
   * @type NSAccordion.Value
   * */
    value?: V;
    /**
   * Value of the active tabs selected by default
   * @type NSAccordion.Value
   * @default []
   */
    defaultValue?: V;
    /** Called when the selection is changed
   * @type (value: NSAccordion.Value, event?: React.SyntheticEvent) => void
   * */
    onChange?:
      | ((value: V, event?: React.SyntheticEvent) => void)
      | React.Dispatch<React.SetStateAction<V>>;
    /** Animation duration of each Accordion.Item inside
   * @default 200 */
    duration?: number;
    /**
   * Changes the visual appearance of the component
   * @default secondary
   */
    use?: 'primary' | 'secondary';
  };
  type Ctx = {
    getItemProps: PropGetterFn;
  };
  type Handlers = {
    value: Props['value'];
  };
  type DefaultProps = {
    defaultValue: Value;
    use: 'secondary';
  };
  namespace Item {
    type Props = {
      /** Tab value */
      value: string | number;
      /** Disabling selection changes */
      disabled?: boolean;
      /** Animation duration
       * @default 350 */
      duration?: number;
    };
    type Ctx = {
      getToggleProps?: PropGetterFn;
      getCollapseProps?: PropGetterFn;
      getChevronProps?: PropGetterFn;
      selected?: boolean;
    };
    namespace Toggle {
      type Props = BoxProps & {
        tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      };
      type Component = Intergalactic.Component<typeof Text, Props>;
    }
    namespace ToggleButton {
      type Props = {};
      type Component = Intergalactic.Component<typeof Flex, Props>;
    }
    namespace Chevron {
      type Props = BoxProps & {
        /**
         * Chevron size
         * @default m
         */
        size?: 'm' | 'l';
      };

      type Component = Intergalactic.Component<'div', Props>;
    }

    namespace Collapse {
      type Props = BoxProps & {
        /** Animation titles */
        keyframes?: [string, string];
        /** Enables animation on first rendering
         * @default false
         */
        initialAnimation?: boolean;
        /**
         * @default ease-out
         */
        timingFunction?: Property.AnimationTimingFunction;
        /**
         * @default false
         */
        animationsDisabled?: boolean;
        /** Animation duration in ms
         * @default 0
         */
        duration?: number | [number, number];
        /** If it set to `true`, animated node is persisted in dom even if `visible=false`   */
        preserveNode?: boolean;
        /**
         * Add overflow=clip when passing animation
         * @default true
         * */
        overflowHidden?: boolean;
        /**
         * Value for height after animation
         * @default auto
         */
        defaultHeight?: 'auto' | '100%';
      };
      type Component = Intergalactic.Component<'div', Props>;
    }

    type Component = Intergalactic.Component<'div', Props, Ctx> & {
      Toggle: Toggle.Component;
      ToggleButton: ToggleButton.Component;
      Chevron: Chevron.Component;
      Collapse: Collapse.Component;
    };
  }

  type WrapComponent<PropsExtending = {}> = (<
    V extends Value,
    Tag extends Intergalactic.Tag = 'div',
  >(
    props: Intergalactic.InternalTypings.ComponentProps<
      Tag,
      'div',
      Props<V>,
    Ctx & { value: V },
    [handlers: Handlers]
    > & PropsExtending,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', Props>;

  type Component = WrapComponent & {
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type AccordionValue = NSAccordion.Value;
/** @deprecated It will be removed in v18. */
export type AccordionProps<V extends AccordionValue = AccordionValue> = NSAccordion.Props<V>;
/** @deprecated It will be removed in v18. */
export type AccordionContext = NSAccordion.Ctx;
/** @deprecated It will be removed in v18. */
export type AccordionHandlers = NSAccordion.Handlers;
/** @deprecated It will be removed in v18. */
export type AccordionItemProps = NSAccordion.Item.Props;
/** @deprecated It will be removed in v18. */
export type AccordionItemContext = NSAccordion.Item.Ctx;
/** @deprecated It will be removed in v18. */
export type AccordionItemToggleProps = NSAccordion.Item.Toggle.Props;
/** @deprecated It will be removed in v18. */
export type ChevronItemProps = NSAccordion.Item.Chevron.Props;
/** @deprecated It will be removed in v18. */
export type AccordionCollapseProps = NSAccordion.Item.Collapse.Props;

export type { NSAccordion };
