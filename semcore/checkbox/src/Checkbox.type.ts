import type { Box, BoxProps, FlexProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
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

export type CheckboxValueProps = FlexProps & CheckboxValueControlProps;

export type CheckboxValueControlProps = {};
export type CheckboxValueCheckMarkProps = {};

export type CheckboxContext = {
  getTextProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

export type CheckboxTextProps = TextProps;

export type CheckboxValueComponent = Intergalactic.Component<'input', CheckboxValueProps> & {
  Control: Intergalactic.Component<'input', CheckboxValueControlProps>;
  CheckMark: Intergalactic.Component<typeof Box, CheckboxValueCheckMarkProps>;
};

export type CheckboxComponent = Intergalactic.Component<'label', CheckboxProps, CheckboxContext> & {
  Text: Intergalactic.Component<'span', CheckboxTextProps>;
  Value: CheckboxValueComponent;
};
