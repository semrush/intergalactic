import type { Box } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { InputProps, InputValueProps } from '@semcore/input';

import type { TimePickerFormatProps } from '../PickerFormat/PickerFormat.type';

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
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type TimePickerDefaultProps = {
  defaultValue: '';
  size: 'm';
  children: React.ReactNode;
  locale: 'en';
};

export type TimePickerSeparatorProps = {
  /** @Internal */
  hoursInputRef: React.RefObject<HTMLElement>;
  /** @Internal */
  disabled?: boolean;
};

export type TimePickerItemProps = InputValueProps & {
  /** Step for changing of the values in the dropdown list */
  step?: number;
};

export type TimePickerContext = {
  getHoursProps: PropGetterFn;
  getFormatProps: PropGetterFn;
  getMinutesProps: PropGetterFn;
  getSeparatorProps: PropGetterFn;
};

export type TimePickerHandlers = {
  value: (value: string) => void;
};

export type TimePickerMeridiem = 'AM' | 'PM';

export type TimePickerField = 'hours' | 'minutes';

export type TimePickerComponent = Intergalactic.Component<
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
