import type { Box, BoxProps, FlexProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';

declare namespace NSCheckbox {
  type Size = 'm' | 'l';
  type State = 'normal' | 'invalid';
  type Props = BoxProps & {
    /** Callback when the value changes */
    onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
    /** Controls the checked state of the checkbox (controlled mode) */
    checked?: boolean;
    /** Default state of uncontrolled checkbox */
    defaultChecked?: boolean;
    /** Checkbox text */
    label?: string;
    /** Special indeterminate state */
    indeterminate?: boolean;
    /** Special disabled state */
    disabled?: boolean;
    /**
     * Checkbox visual state
     * @default normal
     */
    state?: NSCheckbox.State;
    /**
     * Checkbox size
     * @default m
     */
    size?: NSCheckbox.Size;
    /**
     * Checkbox color
     */
    theme?: string;
  };
  type DefaultProps = {
    size: 'm';
    state: 'normal';
    defaultChecked: false;
  };
  type Ctx = {
    getTextProps: PropGetterFn;
    getValueProps: PropGetterFn;
  };

  namespace Value {
    type Handlers = {
      checked: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
    };
    type Props = FlexProps & {
      /** Callback when the value changes */
      onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
    };
    type InnerProps = {
      includeInputProps: string[];
    };
    type DefaultProps = {
      includeInputProps: InnerProps['includeInputProps'];
    };

    namespace Control {
      type Props = {};
      type Component = Intergalactic.Component<'input', Props>;
    }

    namespace Mark {
      type Props = {};
      type Component = Intergalactic.Component<typeof Box, Props>;
    }

    type Component = Intergalactic.Component<'input', Props> & {
      Control: Control.Component;
      CheckMark: Mark.Component;
    };
  }

  namespace Text {
    type Props = NSText.Props;
    type Component = Intergalactic.Component<'span', Props>;
  }

  type Component = Intergalactic.Component<'label', Props, Ctx> & {
    Text: Text.Component;
    Value: Value.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type CheckboxSize = NSCheckbox.Size;
/** @deprecated It will be removed in v18. */
export type CheckboxState = NSCheckbox.State;
/** @deprecated It will be removed in v18. */
export type CheckboxProps = NSCheckbox.Props;
/** @deprecated It will be removed in v18. */
export type CheckboxValueProps = NSCheckbox.Value.Props;
/** @deprecated It will be removed in v18. */
export type CheckboxValueControlProps = NSCheckbox.Value.Control.Props;
/** @deprecated It will be removed in v18. */
export type CheckboxValueCheckMarkProps = NSCheckbox.Value.Mark.Props;
/** @deprecated It will be removed in v18. */
export type CheckboxContext = NSCheckbox.Ctx;
/** @deprecated It will be removed in v18. */
export type CheckboxTextProps = NSCheckbox.Text.Props;

export type { NSCheckbox };
