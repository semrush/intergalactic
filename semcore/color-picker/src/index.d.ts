import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import Dropdown, { DropdownProps, DropdownHandlers } from '@semcore/dropdown';
import Popper from '@semcore/popper';
import { InputProps } from '@semcore/input';

/** @deprecated */
export interface IItemProps extends ItemProps, UnknownProperties {}
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

/** @deprecated */
export interface IColorsProps extends ColorsProps, UnknownProperties {}
export type ColorsProps = BoxProps & {
  /**
   * Array of color items
   */
  colors?: Array<string | null>;
};

/** @deprecated */
export interface IColorsCustomProps extends ColorsCustomProps, UnknownProperties {}
export type ColorsCustomProps = ColorsProps &
  BoxProps & {
    /**
     * Fired when user clicks on the plus icon in Palette Manager - focuses the input component
     */
    onPlusButtonClick?: React.MouseEventHandler;
  };

/** @deprecated */
export interface IInputColorProps extends InputColorProps, UnknownProperties {}
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
};

/** @deprecated */
export interface IColorPickerProps extends ColorPickerProps, UnknownProperties {}
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

/** @deprecated */
export interface IPaletteManagerProps extends PaletteManagerProps, UnknownProperties {}
export type PaletteManagerProps = BoxProps & {
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

/** @deprecated */
export interface IColorPickerHandlers extends ColorPickerHandlers, UnknownProperties {}
export type ColorPickerHandlers = DropdownHandlers & {};

/** @deprecated */
export interface IPaletteManagerHandlers extends PaletteManagerHandlers, UnknownProperties {}
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
  /**
   * @deprecated Use `colors` property in `PaletteManager.Colors`
   */
  Item: Intergalactic.Component<'div', ItemProps>;
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
  /**
   * @deprecated Use `colors` property in `ColorPicker.Colors`
   */
  Item: Intergalactic.Component<'div', ItemProps>;
  Colors: Intergalactic.Component<'div', ColorsProps>;
};

export { PaletteManager, defaultColors };
export default ColorPicker;
