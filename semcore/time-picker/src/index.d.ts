import React from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IInputProps, IInputValueProps } from '@semcore/input';
import { Box, IBoxProps } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export interface ITimePickerProps extends Omit<IInputProps, 'size'> {
  /** Time in the hh:mm format */
  value?: string;
  /** The event responses upon time changing */
  onChange?: (time: string, event?: React.SyntheticEvent) => void;
  /** In charge of the component blocking */
  disabled?: boolean;
  /** Control size
   * @default m */
  size?: 'm' | 'l';
  /** 12-hour time format */
  is12Hour?: boolean;
}

export interface ITimePickerItemProps extends IInputValueProps {
  /** Step for changing of the values in the dropdown list */
  step?: number;
}

export interface ITimePickerFormatProps extends IBoxProps, IKeyboardFocusProps {}

export interface ITimePickerContext {
  getHoursProps: PropGetterFn;
  getFormatProps: PropGetterFn;
  getMinutesProps: PropGetterFn;
}

export interface ITimePickerHandlers {
  value: (value: string) => void;
}

declare const TimePicker: (<T>(
  props: CProps<ITimePickerProps & T, ITimePickerContext, ITimePickerHandlers>,
) => ReturnEl) & {
  Hours: <T>(props: ITimePickerItemProps & T) => ReturnEl;
  Minutes: <T>(props: ITimePickerItemProps & T) => ReturnEl;
  Separator: typeof Box;
  Format: <T>(props: ITimePickerFormatProps & T) => ReturnEl;
};

export default TimePicker;
