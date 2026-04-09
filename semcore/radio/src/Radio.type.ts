import type { Flex, Box, BoxProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { TextProps } from '@semcore/typography';

declare namespace NSRadio {
  type Size = 'm' | 'l';
  type State = 'normal' | 'invalid';
  type Value = string | number | boolean;

  type Props = BoxProps & {
    /** Radio item value **/
    value?: Value;
    /** Radio item checked flag **/
    checked?: boolean;
    /**
   * The value displaying the state of the component
   * @default normal
   */
    state?: State;
    /**
   * Radio button size
   * @default m
   **/
    size?: Size;
    /** The theme of the radio button that you can send your color to */
    theme?: string;
    /** Radio item text **/
    label?: string;
    /** Blocks access and changes to the radio item **/
    disabled?: boolean;
  };

  type Ctx = {
    getValueProps: PropGetterFn;
    getTextProps: PropGetterFn;
  };

  type Root = Intergalactic.Component<'label', Props, Ctx>;

  namespace Value {
    type Props = BoxProps & {
    /** List of elements that can be put on a hidden input */
      includeInputProps?: string[];
    };

    type Root = Intergalactic.Component<'input', Props>;

    namespace Control {
      type Props = {};

      type Root = Intergalactic.Component<'input', Props>;
    }

    namespace Mark {
      type Props = {};

      type Root = Intergalactic.Component<typeof Box, Props>;
    }

    type Component = Root & {
      Control: Control.Root;
      RadioMark: Mark.Root;
    };
  }

  namespace Text {
    type Props = TextProps;

    type Root = Intergalactic.Component<'span', Props>;
  }

  namespace Group {
    type Props<T extends Value = Value> = {
      /** Radio group name */
      name?: string;
      /** Active default value */
      defaultValue?: T;
      /** Active value */
      value?: T;
      /** Called when the selected element is changed */
      onChange?:
    | ((value: T, e?: React.SyntheticEvent<HTMLInputElement>) => void)
    | React.Dispatch<React.SetStateAction<T>>;
      /** Radio button size */
      size?: Size;
      /** The theme of the radio button that you can send your color to */
      theme?: string;
      /** Blocks access and changes to the form field */
      disabled?: boolean;
    };

    type Component<PropsExtending = {}> = (<
      V extends Value,
      Tag extends Intergalactic.Tag = 'div',
    >(
      props: Intergalactic.InternalTypings.ComponentProps<Tag, typeof Flex, Props<V>> &
        PropsExtending,
    ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
    Intergalactic.InternalTypings.ComponentAdditive<'div', typeof Flex, Props>;
  }

  type Component = Root & {
    Value: Value.Component;
    Text: Text.Root;
  };
}

/** @deprecated It will be removed in v18. */
export type RadioSize = NSRadio.Size;
/** @deprecated It will be removed in v18. */
export type RadioState = NSRadio.State;
/** @deprecated It will be removed in v18. */
export type RadioValue = NSRadio.Value;
/** @deprecated It will be removed in v18. */
export type RadioProps = NSRadio.Props;
/** @deprecated It will be removed in v18. */
export type RadioGroupProps<T extends RadioValue = RadioValue> = NSRadio.Group.Props<T>;
/** @deprecated It will be removed in v18. */
export type RadioValueProps = NSRadio.Value.Props;
/** @deprecated It will be removed in v18. */
export type RadioCtx = NSRadio.Ctx;
/** @deprecated It will be removed in v18. */
export type RadioValueControlProps = NSRadio.Value.Control.Props;
/** @deprecated It will be removed in v18. */
export type RadioValueMarkProps = NSRadio.Value.Mark.Props;

export type { NSRadio };
