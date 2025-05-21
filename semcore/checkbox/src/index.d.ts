import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps, FlexProps } from '@semcore/flex-box';
import { TextProps } from '@semcore/typography';
import { WithAutoFocusEnhanceProps } from '@semcore/core/lib/utils/enhances/autoFocusEnhance';

export type CheckboxSize = 'm' | 'l';
export type CheckboxState = 'normal' | 'invalid';

/** @deprecated */
export interface ICheckboxProps extends CheckboxProps, UnknownProperties {}
export type CheckboxProps = BoxProps & {
  onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
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
  state?: CheckboxState;
  /**
   * Checkbox size
   * @default m
   */
  size?: CheckboxSize;
  /**
   * Checkbox color
   */
  theme?: string;
};

/** @deprecated */
export interface ICheckboxValueProps extends CheckboxValueProps, UnknownProperties {}
export type CheckboxValueProps = WithAutoFocusEnhanceProps &
  FlexProps &
  CheckboxValueControlProps & {
    /**
     * @deprecated set `onChange` on root Checkbox instead
     * */
    onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
    /**
     * @deprecated set `checked` on root Checkbox instead
     * */
    checked?: boolean;
    /**
     * @deprecated set `defaultChecked` on root Checkbox instead
     * */
    defaultChecked?: boolean;
    /**
     * @deprecated set `indeterminate` on root Checkbox instead
     * */
    indeterminate?: boolean;
    /**
     * @deprecated set `disabled` on root Checkbox instead
     * */
    disabled?: boolean;
    /** List of props that will be added to the hidden input
     * @deprecated use `Checkbox.Value.Control` and `Checkbox.Value.CheckMark` instead
     * */
    includeInputProps?: string[];
    /**
     * @deprecated set `state` on root Checkbox instead
     * */
    state?: CheckboxState;
    /**
     * @deprecated set `size` on root Checkbox instead
     * */
    size?: CheckboxSize;
    /**
     * @deprecated
     * */
    theme?: string;
  };

export type CheckboxValueControlProps = {};
export type CheckboxValueCheckMarkProps = {};

/** @deprecated */
export interface ICheckboxContext extends CheckboxContext, UnknownProperties {}
export type CheckboxContext = {
  getTextProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

/** @deprecated */
export interface ICheckboxTextProps extends CheckboxTextProps, UnknownProperties {}
export type CheckboxTextProps = TextProps & {
  /** @deprecated Set disabled state on Checkbox root component */
  disabled?: boolean;
};

declare const Checkbox: Intergalactic.Component<'label', CheckboxProps, CheckboxContext> & {
  Text: Intergalactic.Component<'span', CheckboxTextProps>;
  Value: Intergalactic.Component<'input', CheckboxValueProps> & {
    Control: Intergalactic.Component<'input', CheckboxValueControlProps>;
    CheckMark: Intergalactic.Component<typeof Box, CheckboxValueCheckMarkProps>;
  };
};

export default Checkbox;
