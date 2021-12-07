import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IBoxProps, IFlexProps } from '@semcore/flex-box';
import { ITextProps } from '@semcore/typography';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type CheckboxSize = 's' | 'm' | 'l';
export type CheckboxState = 'normal' | 'invalid';

export interface ICheckboxProps extends IBoxProps {
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
}

export interface ICheckboxValueProps extends IKeyboardFocusProps, IFlexProps {
  /** Handler to change */
  onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Control status */
  checked?: boolean;
  /** The initial status for uncontrolled mode
   * @default false */
  defaultChecked?: boolean;
  /** The value responsible for the indeterminate attribute */
  indeterminate?: boolean;
  /** List of components that can be added to a hidden input */
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
}

export interface ICheckboxContext {
  getTextProps: PropGetterFn;
  getValueProps: PropGetterFn;
}

export interface ICheckboxTextProps extends ITextProps {
  disabled?: boolean;
}

declare const Checkbox: (<T>(props: CProps<ICheckboxProps & T, ICheckboxContext>) => ReturnEl) & {
  Text: <T>(props: ICheckboxTextProps & T) => ReturnEl;
  Value: <T>(props: ICheckboxValueProps & T) => ReturnEl;
};

export default Checkbox;
