import { CProps, ReturnEl } from '@semcore/core';
// import { Box, IBoxProps } from '@semcore/flex-box';
import Popper, { IPopperContext, IPopperHandlers } from '@semcore/popper';

export interface IItemProps {
  value: string;
  selected?: boolean;
  styles?: Record<string, string>;
  onClick?: (event: React.SyntheticEvent) => void;
  editable?: boolean;
  colors?: string[];
  displayLabel?: boolean;
  onColorsChange?: (value: string[], event: React.SyntheticEvent) => void;
}

export interface IColorsProps {
  value?: string;
  selectedValue?: null | string;
  styles?: Record<string, string>;
  colors?: string[];
  onValueChange?: (value: string, event: React.SyntheticEvent) => void;
  editable?: boolean;
  displayLabel?: boolean;
  onPlusButtonClick?: (event: React.SyntheticEvent) => void;
  onColorsChange?: (value: string[], event: React.SyntheticEvent) => void;
}

export interface IPlusButtonProps {
  styles: Record<string, string>;
  onClick: (event: React.SyntheticEvent) => void;
}

export interface IInputColorProps {
  styles: Record<string, string>;
  inputValue: string;
  onClick: (event: React.SyntheticEvent) => void;
  onInputValueChange: (value: string, event: React.SyntheticEvent) => void;
  colors: string[];
  onColorsChange: (value: string[], event: React.SyntheticEvent) => void;
}

export interface IColorPickerProps {
  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent) => void;
  displayLabel?: boolean;
}

export interface IColorPickerContext extends IPopperContext {}

export interface IColorPickerHandlers extends IPopperHandlers {}

declare const ColorPicker: (<T>(
  props: CProps<IColorPickerProps & T, IColorPickerContext, IColorPickerHandlers>,
) => ReturnEl) & {
  Trigger: typeof Popper.Trigger;
  Popper: typeof Popper.Popper;
  Item: <T>(props: IItemProps & T) => ReturnEl;
  Colors: <T>(props: IColorsProps & T) => ReturnEl;
  // PaletteManager: <T>(props: IPaletteManagerProps & T) => ReturnEl;
};

export default ColorPicker;
