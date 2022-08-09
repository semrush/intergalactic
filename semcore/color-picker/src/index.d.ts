import { CProps, ReturnEl, PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import Dropdown, { IDropdownProps, IDropdownHandlers } from '@semcore/dropdown';
import { IInputProps } from '@semcore/input';

export interface IItemProps extends IBoxProps {
  /**
   * Color item in hexadecimal format.
   */
  value?: string;
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
   * Fired with color item when user clicks on the close icon`
   */
  onRemove?: React.MouseEventHandler;
}

export interface IColorsProps extends IBoxProps {
  /**
   * Array of color items
   */
  colors?: string[];
}

export interface IColorsCustomProps extends IColorsProps, IBoxProps {
  /**
   * Fired when user clicks on the plus icon in Palette Manager - focuses the input component`
   */
  onPlusButtonClick?: React.MouseEventHandler;
}

export interface IInputColorProps extends IInputProps {
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
}

export interface IColorPickerProps extends IDropdownProps {
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
  onColorsChange?: (value: string, event: React.ChangeEvent) => void;
  /**
   * Shows label `A` as text color icon inside all color items
   * @default false
   */
  displayLabel?: boolean;
}

export interface IPaletteManagerProps extends IBoxProps {
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
  onColorsChange?: (value: string, event: React.ChangeEvent) => void;
}

export interface IColorPickerHandlers extends IDropdownHandlers {}

export interface IPaletteManagerHandlers extends IDropdownHandlers {}

interface IColorPickerContext {
  getTriggerProps: PropGetterFn;
  getColorsProps: PropGetterFn;
  getItemProps: PropGetterFn;
}

interface IPaletteManagerContext {
  getInputColorProps: PropGetterFn;
  getColorsProps: PropGetterFn;
  getItemProps: PropGetterFn;
}

declare const defaultColors: string[];

declare const PaletteManager: (<T>(
  props: CProps<IPaletteManagerProps & T, IPaletteManagerContext, IPaletteManagerHandlers>,
) => ReturnEl) & {
  Item: <T>(props: IItemProps & T) => ReturnEl;
  Colors: <T>(props: IColorsCustomProps & T) => ReturnEl;
  InputColor: <T>(props: IInputColorProps & T) => ReturnEl;
};

declare const ColorPicker: (<T>(
  props: CProps<IColorPickerProps & T, IColorPickerContext, IColorPickerHandlers>,
) => ReturnEl) & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Dropdown.Popper;
  Item: <T>(props: IItemProps & T) => ReturnEl;
  Colors: <T>(props: IColorsProps & T) => ReturnEl;
};

export { PaletteManager, defaultColors };
export default ColorPicker;
