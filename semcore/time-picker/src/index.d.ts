import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { InputProps, InputValueProps } from '@semcore/input';
import { Box, BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface ITimePickerProps extends TimePickerProps, UnknownProperties {}
export type TimePickerProps = Omit<InputProps, 'size'> & {
  /** Time in the hh:mm format */
  value?: string;
  /** Default value if `value` property is not provided */
  defaultValue?: string;
  /** The event responses upon time changing */
  onChange?: (time: string, event?: React.SyntheticEvent) => void;
  /** In charge of the component blocking */
  disabled?: boolean;
  /** Control size
   * @default m */
  size?: 'm' | 'l';
  /** 12-hour time format */
  is12Hour?: boolean;
  locale?: string;
};

/** @deprecated */
export interface ITimePickerItemProps extends TimePickerItemProps, UnknownProperties {}
export type TimePickerItemProps = InputValueProps & {
  /** Step for changing of the values in the dropdown list */
  step?: number;
};

/** @deprecated */
export interface ITimePickerFormatProps extends TimePickerFormatProps, UnknownProperties {}
export type TimePickerFormatProps = BoxProps & {};

/** @deprecated */
export interface ITimePickerContext extends TimePickerContext, UnknownProperties {}
export type TimePickerContext = {
  getHoursProps: PropGetterFn;
  getFormatProps: PropGetterFn;
  getMinutesProps: PropGetterFn;
};

/** @deprecated */
export interface ITimePickerHandlers extends TimePickerHandlers, UnknownProperties {}
export type TimePickerHandlers = {
  value: (value: string) => void;
};

declare const TimePicker: Intergalactic.Component<
  'div',
  TimePickerProps,
  TimePickerContext,
  [handlers: TimePickerHandlers]
> & {
  Hours: Intergalactic.Component<'div', TimePickerItemProps>;
  Minutes: Intergalactic.Component<'div', TimePickerItemProps>;
  Separator: typeof Box;
  Format: Intergalactic.Component<'div', TimePickerFormatProps>;
};

export default TimePicker;
