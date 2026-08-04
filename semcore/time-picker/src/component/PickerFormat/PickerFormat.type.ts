import type { NSBox } from '@semcore/base-components';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';

import type { TimePickerMeridiem } from '../TimePicker/TimePicker.type';

export type TimePickerFormatProps = NSBox.Props & {};

export type TimePickerFormatPropsInternal = {
  /** @Internal */
  getI18nText: ReturnType<typeof useI18n>;
  /** @Internal */
  size: 'm' | 'l';
  /** @Internal */
  disabled: boolean;
  /** @Internal */
  meridiem: TimePickerMeridiem;
  /** @Internal */
  onClick: (event: React.SyntheticEvent) => void;
};
