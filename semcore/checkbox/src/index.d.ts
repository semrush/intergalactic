import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { WithAutoFocusEnhanceProps } from '@semcore/core/lib/utils/enhances/autoFocusEnhance';
import type { Box, BoxProps, FlexProps } from '@semcore/flex-box';
import type { TextProps } from '@semcore/typography';

export type CheckboxSize = 'm' | 'l';
export type CheckboxState = 'normal' | 'invalid';

export type CheckboxProps = BoxProps & {
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

export type CheckboxValueProps = WithAutoFocusEnhanceProps &
  FlexProps &
  CheckboxValueControlProps;

export type CheckboxValueControlProps = {};
export type CheckboxValueCheckMarkProps = {};

export type CheckboxContext = {
  getTextProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

export type CheckboxTextProps = TextProps;

declare const Checkbox: Intergalactic.Component<'label', CheckboxProps, CheckboxContext> & {
  Text: Intergalactic.Component<'span', CheckboxTextProps>;
  Value: Intergalactic.Component<'input', CheckboxValueProps> & {
    Control: Intergalactic.Component<'input', CheckboxValueControlProps>;
    CheckMark: Intergalactic.Component<typeof Box, CheckboxValueCheckMarkProps>;
  };
};

export default Checkbox;
