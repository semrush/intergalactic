import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { SelectProps } from '@semcore/select';

import type { TimePickerField, TimePickerItemProps } from '../TimePicker/TimePicker.type';

export type PickerInputProps = SelectProps & TimePickerItemProps & {
  time: string;
  size?: 'm' | 'l';
  is12Hour?: boolean;
  disabled?: boolean;
  $onValueChange: (value: string, field: TimePickerField, event: React.SyntheticEvent) => void;
  minutesInputRef: React.RefObject<HTMLElement>;
  hoursInputRef: React.RefObject<HTMLElement>;
  _getI18nText: ReturnType<typeof useI18n>;
};

export type PickerInputMinMax = [number, number];
