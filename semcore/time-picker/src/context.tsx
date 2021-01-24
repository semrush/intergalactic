/* eslint-disable */
import React from 'react';
import { ITimePickerProps } from './TimePicker';

export interface ITimepickerContext {
  size: ITimePickerProps['size'];
  is12Hour: ITimePickerProps['is12Hour'];
  disabled: ITimePickerProps['disabled'];
  meridiem: string;
  onMeridiemClick: React.MouseEventHandler;
  onValueChange: (value: string, field?: string) => void;
  time: [string, string];
  disablePortal: boolean;
}

const TimePickerContext = React.createContext<ITimepickerContext>({} as ITimepickerContext);

export const { Provider, Consumer } = TimePickerContext;
export default TimePickerContext;
