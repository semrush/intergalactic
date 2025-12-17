import type { TimePickerMeridiem } from '../component/TimePicker/TimePicker.type';
import { formatHoursTo12, formatHoursTo24, withLeadingZero } from '../utils';

class TimePickerTime {
  private _hours = '';
  private _minutes = '';
  private _options: { is12Hour?: boolean; meridiem: TimePickerMeridiem };

  constructor(
    hours: string,
    minutes: string,
    options: { is12Hour?: boolean; meridiem: TimePickerMeridiem },
  ) {
    this._options = options;
    this._hours = options.is12Hour ? formatHoursTo12(hours) : hours;
    this._minutes = minutes && withLeadingZero(minutes);
  }

  get hours() {
    return this._hours;
  }

  get minutes() {
    return this._minutes;
  }

  get options() {
    return this._options;
  }

  set hours(newHours) {
    this._hours = this.options?.is12Hour ? formatHoursTo12(newHours) : newHours;
  }

  set minutes(newMinutes) {
    this._minutes = withLeadingZero(newMinutes);
  }

  set options(newOptions) {
    this._options = newOptions;
  }

  toString() {
    const { is12Hour, meridiem } = this.options;

    const hours = is12Hour ? formatHoursTo24(this.hours, meridiem) : this.hours;

    return `${hours}:${this.minutes}`;
  }
}

export default TimePickerTime;
