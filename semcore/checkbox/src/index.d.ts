import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps, FlexProps } from '@semcore/flex-box';
import { TextProps } from '@semcore/typography';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type CheckboxSize = 'm' | 'l';
export type CheckboxState = 'normal' | 'invalid';

/** @deprecated */
export interface ICheckboxProps extends CheckboxProps, UnknownProperties {}
export type CheckboxProps = BoxProps & {
  /**
   * Checkbox state
   * @default normal
   */
  state?: CheckboxState;
  /**
   * Checkbox size
   * @default m
   */
  size?: CheckboxSize;
  /** A checkbox theme you can add your own color to
   */
  theme?: string;
};

/** @deprecated */
export interface ICheckboxValueProps extends CheckboxValueProps, UnknownProperties {}
export type CheckboxValueProps = KeyboardFocusProps &
  FlexProps & {
    /** Handler to change */
    onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
    /** Control status */
    checked?: boolean;
    /** The initial status for uncontrolled mode
     * @default false */
    defaultChecked?: boolean;
    /** The value responsible for the indeterminate attribute */
    indeterminate?: boolean;
    /** List of props that will be added to the hidden input */
    includeInputProps?: string[];
    /**
     * The value responsible for the state of the component
     * @default normal
     */
    state?: CheckboxState;
    /**
     * Checkbox size
     * @default m
     */
    size?: CheckboxSize;
    /** A checkbox theme you can add your own color to */
    theme?: string;
  };

/** @deprecated */
export interface ICheckboxContext extends CheckboxContext, UnknownProperties {}
export type CheckboxContext = {
  getTextProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

/** @deprecated */
export interface ICheckboxTextProps extends CheckboxTextProps, UnknownProperties {}
export type CheckboxTextProps = TextProps & {
  disabled?: boolean;
};

declare const Checkbox: Intergalactic.Component<'label', CheckboxProps, CheckboxContext> & {
  Text: Intergalactic.Component<'span', CheckboxTextProps>;
  Value: Intergalactic.Component<'input', CheckboxValueProps>;
};

export default Checkbox;
