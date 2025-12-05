import type { BoxProps } from '@semcore/base-components';
import type Popper from '@semcore/base-components';
import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { DropdownProps, DropdownHandlers } from '@semcore/dropdown';
import type Dropdown from '@semcore/dropdown';
import type { InputProps } from '@semcore/input';

export type ItemProps = BoxProps & {
  /**
   * Color item in hexadecimal format.
   */
  value?: string | null;
  /**
   * Shows label `A` as text color icon inside all color items
   */
  displayLabel?: boolean;
  /**
   * Property enabling the ability to remove a color item on click
   */
  editable?: boolean;
  /**
   * Shows if color item is selected
   */
  selected?: boolean;
  /**
   * Fired with color item when user clicks on the close icon
   */
  onRemove?: React.MouseEventHandler;
};

export type ColorsProps = BoxProps & {
  /**
   * Array of color items
   */
  colors?: Array<string | null>;
};

export type ColorsCustomProps = ColorsProps &
  BoxProps & {
    /**
     * Fired when user clicks on the plus icon in Palette Manager - focuses the input component
     */
    onPlusButtonClick?: React.MouseEventHandler;
  };

export type InputColorProps = InputProps & {
  /**
   * Text value of input
   */
  value?: string;
  /**
   * Default value if `value` property is not provided
   * @default null
   */
  defaultValue?: string | null;
  /**
   * Uncontrolled visual state of input
   * @default normal
   */
  state?: 'normal' | 'valid' | 'invalid';
  /**
   * Array of color items
   */
  colors?: string[];
  /**
   * Fired with entered value when user clicks on the check icon or hits `Enter` or `Space`
   */
  onAdd?: (value: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Handle changes of state
   */
  onStateChange?: (state: 'normal' | 'valid' | 'invalid') => void;
};

export type ColorPickerProps = DropdownProps & {
  /**
   * Selected color item. Should be used with `onChange` property together
   */
  value?: string | null;
  /**
   * Fired when user selects color item. Should be used with `value` property together
   */
  onChange?: (value: string, event: React.ChangeEvent) => void;
  /**
   * Default value if `value` property is not provided
   * @default null
   */
  defaultValue?: string | null;
  /**
   * Array of color items. Should be used with `onColorsChange` property together
   * @default defaultColors
   */
  colors?: string[];
  /**
   * Fired when user changes color items. Should be used with `colors` property together
   */
  onColorsChange?: (value: string[], event: React.ChangeEvent) => void;
  /**
   * Shows label `A` as text color icon inside all color items
   * @default false
   */
  displayLabel?: boolean;
};

export type PaletteManagerProps = {
  /**
   * Array of color items. Should be used with `onColorsChange` property together
   * @default []
   */
  colors?: string[];
  /**
   * Default value if `colors` property is not provided
   * @default []
   */
  defaultColors?: string[];
  /**
   * Fired when user adds or removes color items. Should be used with `colors` property together
   */
  onColorsChange?: (value: string[], event: React.ChangeEvent) => void;
};

export type ColorPickerHandlers = DropdownHandlers & {};

export type PaletteManagerHandlers = DropdownHandlers & {};

type ColorPickerContext = {
  getTriggerProps: PropGetterFn;
  getColorsProps: PropGetterFn;
  getItemProps: PropGetterFn;
};

type PaletteManagerContext = {
  getInputColorProps: PropGetterFn;
  getColorsProps: PropGetterFn;
  getItemProps: PropGetterFn;
};

declare const defaultColors: string[];

declare const PaletteManager: Intergalactic.Component<
  'div',
  PaletteManagerProps,
  PaletteManagerContext,
  [handlers: PaletteManagerHandlers]
> & {
  Colors: Intergalactic.Component<'div', ColorsCustomProps>;
  InputColor: Intergalactic.Component<'div', InputColorProps>;
};

declare const ColorPicker: Intergalactic.Component<
  'div',
  ColorPickerProps,
  ColorPickerContext,
  [handlers: ColorPickerHandlers]
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Popper.Popper;
  Colors: Intergalactic.Component<'div', ColorsProps>;
};

export { PaletteManager, defaultColors };
export default ColorPicker;
