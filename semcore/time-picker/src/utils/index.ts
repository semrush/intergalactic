import type { TimePickerMeridiem } from '../component/TimePicker/TimePicker.type';

export function withLeadingZero(value: number | string) {
  return String(value).padStart(2, '0');
}

export function meridiemByHours(hours: number): TimePickerMeridiem {
  return hours >= 12 ? 'PM' : 'AM';
}

export function formatHoursTo12(hours: string) {
  const numberHours = Number.parseInt(hours);

  if (Number.isNaN(numberHours)) return hours;

  if (numberHours === 0) {
    return '12';
  } else if (numberHours > 12) {
    return withLeadingZero(numberHours - 12);
  }

  return withLeadingZero(numberHours);
}

export function formatHoursTo24(hours: string, meridiem: TimePickerMeridiem) {
  const numberHours = Number.parseInt(hours);

  if (Number.isNaN(numberHours)) return hours;

  if (meridiem === 'AM') {
    return withLeadingZero(numberHours === 12 ? 0 : numberHours);
  }

  return withLeadingZero(numberHours < 12 ? numberHours + 12 : numberHours);
}
