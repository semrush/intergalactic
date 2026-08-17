import type { SelectProps } from '@semcore/select';

import type { NSTimePicker } from '../TimePicker/TimePicker.type';

export type PickerInputProps = SelectProps & NSTimePicker.FieldProps & {
  time: string;
  size?: 'm' | 'l';
  is12Hour?: boolean;
  disabled?: boolean;
  $onValueChange: (value: string, field: NSTimePicker.Field, event: React.SyntheticEvent) => void;
  minutesInputRef: React.RefObject<HTMLElement>;
  hoursInputRef: React.RefObject<HTMLElement>;
  ariaLabel: string;
};

export type PickerInputMinMax = [number, number];
