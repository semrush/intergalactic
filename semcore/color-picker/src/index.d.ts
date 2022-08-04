import { CProps, ReturnEl, PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import Dropdown, { IDropdownProps, IDropdownHandlers } from '@semcore/dropdown';

export interface IItemProps extends IBoxProps {
  styles?: React.CSSProperties;
  value?: string;
  displayLabel?: boolean;
  editable?: boolean;
  selected?: boolean;
  onRemove?: React.MouseEventHandler;
  Children?: React.FC;
}

export interface IColorsProps extends IBoxProps {
  styles?: React.CSSProperties;
  colors?: string[];
  Children: any;
}

export interface IColorsCustomProps extends IColorsProps, IBoxProps {
  onPlusButtonClick?: React.MouseEventHandler;
}

export interface IInputColorProps {
  styles?: React.CSSProperties;
  defaultValue?: string;
  defaultState?: string;
  value?: string;
  state?: 'normal' | 'valid' | 'invalid';
  colors?: string[];
  onAdd?: (value: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  Children: any;
}

export interface IColorPickerProps extends IDropdownProps {
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  colors?: string[];
  displayLabel?: boolean;
  styles?: React.CSSProperties;
  Children: React.FC;
}

export interface IPaletteManagerProps extends IBoxProps {
  defaultColors?: string[];
  colors?: string[];
  styles?: React.CSSProperties;
  Children: React.FC;
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

export { PaletteManager };
export default ColorPicker;
