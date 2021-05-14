import { ComponentProps } from 'react';
import { CProps, PropGetter, ReturnEl } from '@semcore/core';
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
  size?: 'm' | 'l' | 'xl';
  /** 12-hour time format */
  is12Hour?: boolean;
}

export interface ITimePickerContext {
  getHoursProps: PropGetter<TimePickerRoot['getHoursProps']>;
  getFormatProps: PropGetter<TimePickerRoot['getFormatProps']>;
  getMinutesProps: PropGetter<TimePickerRoot['getMinutesProps']>;
}

export interface ITimePickerItemProps extends IInputValueProps {
  /** Step for changing of the values in the dropdown list */
  step?: number;
  /* @ignore */
  $onValueChange?: (value: string, field?: string, event?: React.SyntheticEvent) => void;
}

export interface ITimePickerFormatProps extends IBoxProps, IKeyboardFocusProps {}

declare const TimePicker: ((props: CProps<ITimePickerProps, ITimePickerContext>) => ReturnEl) & {
  Hours: <T>(props: ITimePickerItemProps & T) => ReturnEl;
  Minutes: <T>(props: ITimePickerItemProps & T) => ReturnEl;
  Separator: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Format: <T>(props: ITimePickerFormatProps & T) => ReturnEl;
};

export default TimePicker;
