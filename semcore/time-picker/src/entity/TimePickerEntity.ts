import type { TimePickerMeridiem } from '../component/TimePicker/TimePicker.type';

class TimePickerEntity {
  private _hours: string = '';
  private _minutes: string = '';
  private _options: { is12Hour?: boolean };
  private _meridiem: TimePickerMeridiem = 'AM';

  constructor(
    value: string = ':', // should be in the format 'HH:mm'
    options: { is12Hour?: boolean },
  ) {
    const [hours = '', minutes = ''] = value.split(':');

    this._options = options;
    this._hours = hours;
    this._minutes = minutes;
  }

  get meridiem() {
    return this._meridiem;
  }

  get hours() {
    const { is12Hour } = this.options;

    return is12Hour ? this.formatHoursTo12(this._hours) : this.formatHoursTo24(this._hours);
  }

  get minutes() {
    return this._minutes && this.withLeadingZero(this._minutes);
  }

  get options() {
    return this._options;
  }

  set hours(newHours) {
    this._hours = newHours;
  }

  set minutes(newMinutes) {
    this._minutes = newMinutes;
  }

  set options(newOptions) {
    this._options = newOptions;
  }

  set meridiem(newMeridiem) {
    this._meridiem = newMeridiem;
  }

  private withLeadingZero(value: string | number) {
    return String(value).padStart(2, '0');
  }

  private formatHoursTo12(hours: string) {
    const numberHours = Number.parseInt(hours);

    if (Number.isNaN(numberHours)) return hours;

    if (numberHours === 0) {
      return '12';
    } else if (numberHours > 12) {
      return this.withLeadingZero(numberHours - 12);
    }

    return this.withLeadingZero(numberHours);
  }

  private formatHoursTo24(hours: string) {
    const numberHours = Number.parseInt(hours);

    if (Number.isNaN(numberHours)) return hours;

    if (this.meridiem === 'AM') {
      return this.withLeadingZero(numberHours === 12 ? 0 : numberHours);
    }

    return this.withLeadingZero(numberHours < 12 ? numberHours + 12 : numberHours);
  }

  toggleMeridiem() {
    this.meridiem = this._meridiem === 'AM' ? 'PM' : 'AM';
  }

  toString() {
    const { is12Hour } = this.options;

    const hours = is12Hour ? this.formatHoursTo24(this.hours) : this.hours;

    return `${hours}:${this.minutes}`;
  }
}

export default TimePickerEntity;
