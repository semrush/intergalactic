import { CProps } from '@semcore/core';

export interface IColorPickerProps {}

declare const ColorPicker: <T>(props: CProps<IColorPickerProps & T>) => ReturnEl;

export default ColorPicker;
