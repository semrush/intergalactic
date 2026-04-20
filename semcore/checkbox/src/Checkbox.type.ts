import type { Box, BoxProps, FlexProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';

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

export type CheckboxTextProps = NSText.Props;

export type CheckboxValueRootComponent = Intergalactic.Component<'input', CheckboxValueProps>;
export type CheckboxValueControlComponent = Intergalactic.Component<'input', CheckboxValueControlProps>;
export type CheckboxCheckMarkComponent = Intergalactic.Component<typeof Box, CheckboxValueCheckMarkProps>;

export type CheckboxValueComponent = CheckboxValueRootComponent & {
  Control: CheckboxValueControlComponent;
  CheckMark: CheckboxCheckMarkComponent;
};

export type CheckboxRootComponent = Intergalactic.Component<'label', CheckboxProps, CheckboxContext>;
export type CheckboxTextComponent = Intergalactic.Component<'span', CheckboxTextProps>;

export type CheckboxComponent = CheckboxRootComponent & {
  Text: CheckboxTextComponent;
  Value: CheckboxValueComponent;
};
