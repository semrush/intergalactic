import type { NSTimePicker } from '../component/TimePicker/TimePicker.type';

class TimePickerEntity {
  private _hours: string = '';
  private _minutes: string = '';
  private _is12Hour: boolean = false;
  private _meridiem: NSTimePicker.Meridiem = 'AM';

  constructor(
    value: string = ':', // should be in the format 'HH:mm'
    is12Hour: boolean = false,
  ) {
    const [hours = '', minutes = ''] = value.split(':');

    this._is12Hour = is12Hour;
    this._hours = hours;
    this._minutes = minutes;
    this._meridiem = this.meridiemFromHours(hours);
  }

  get meridiem() {
    return this._meridiem;
  }

  get hours() {
    return this._is12Hour ? this.formatHoursTo12(this._hours) : this.formatHoursTo24(this._hours);
  }

  get minutes() {
    return this._minutes && this.withLeadingZero(this._minutes);
  }

  set is12Hour(newIs12Hour: boolean) {
    this._is12Hour = newIs12Hour;
  }

  set hours(newHours) {
    this._hours = newHours;
  }

  set minutes(newMinutes) {
    this._minutes = newMinutes;
  }

  private set meridiem(newMeridiem) {
    this._meridiem = newMeridiem;
  }

  private withLeadingZero(value: string | number) {
    return String(value).padStart(2, '0');
  }

  private formatHoursTo12(hours: string) {
    const numberHours = Number.parseInt(hours, 10);

    if (Number.isNaN(numberHours)) return hours;

    if (numberHours === 0) {
      return '12';
    } else if (numberHours > 12) {
      return this.withLeadingZero(numberHours - 12);
    }

    return this.withLeadingZero(numberHours);
  }

  private formatHoursTo24(hours: string) {
    const numberHours = Number.parseInt(hours, 10);

    if (Number.isNaN(numberHours)) return hours;

    if (this._is12Hour) {
      if (this.meridiem === 'AM') {
        return this.withLeadingZero(numberHours === 12 ? 0 : numberHours);
      }

      return this.withLeadingZero(numberHours < 12 ? numberHours + 12 : numberHours);
    }

    return this.withLeadingZero(numberHours);
  }

  toggleMeridiem() {
    this.meridiem = this._meridiem === 'AM' ? 'PM' : 'AM';
  }

  toString() {
    const hours = this._is12Hour ? this.formatHoursTo24(this.hours) : this.hours;

    return `${hours}:${this.minutes}`;
  }

  setMeridiemFromHours(hours: string): void {
    this._meridiem = this.meridiemFromHours(hours);
  }

  private meridiemFromHours(hours: string): NSTimePicker.Meridiem {
    const numberHours = Number.parseInt(hours, 10);

    if (Number.isNaN(numberHours)) return 'AM';

    return numberHours < 12 ? 'AM' : 'PM';
  }
}

export default TimePickerEntity;
