import type { Flex, BoxProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { NSText } from '@semcore/typography';

declare namespace NSRadio {
  type Size = 'm' | 'l';
  type State = 'normal' | 'invalid';
  type Value = string | number | boolean;
  type Props = BoxProps & {
    /** Radio item value **/
    value?: NSRadio.Value;
    /** Radio item checked flag **/
    checked?: boolean;
    /**
     * The value displaying the state of the component
     * @default normal
     */
    state?: NSRadio.State;
    /**
     * Radio button size
     * @default m
     **/
    size?: NSRadio.Size;
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
  namespace Value {
    type Handlers = {
      checked: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
    };
    type Props = BoxProps & {
      /** List of elements that can be put on a hidden input */
      includeInputProps?: string[];
    };
    type DefaultProps = {
      includeInputProps: Props['includeInputProps'];
      defaultChecked: false;
    };
    namespace Control {
      type Props = {};
      type Component = Intergalactic.Component<'input', Props>;
    }

    namespace Mark {
      type Props = {};
      type Component = Intergalactic.Component<'input', Props>;
    }

    type Component = Intergalactic.Component<'input', Props> & {
      Control: Control.Component;
      RadioMark: Mark.Component;
    };
  }

  namespace Text {
    type Props = NSText.Props;
    type Component = Intergalactic.Component<'span', Props>;
  }

  namespace Group {
    type Props<T extends NSRadio.Value = NSRadio.Value> = {
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
      size?: NSRadio.Size;
      /** The theme of the radio button that you can send your color to */
      theme?: string;
      /** Blocks access and changes to the form field */
      disabled?: boolean;
    };
    type DefaultProps = {
      defaultValue: '';
    };
    type Component<PropsExtending = {}> = (<V extends Value, Tag extends Intergalactic.Tag = 'div'>(
      props: Intergalactic.InternalTypings.ComponentProps<Tag, typeof Flex, Props<V>> & PropsExtending,
    ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
    Intergalactic.InternalTypings.ComponentAdditive<'div', typeof Flex, Props>;
  }
  type Component = Intergalactic.Component<'label', Props, Ctx> & {
    Value: Value.Component;
    Text: Text.Component;
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
