import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe, it, expect } from '@semcore/testing-utils/vitest';

import TimePickerTime from '../src/entity/TimePickerTime';
import { withLeadingZero, meridiemByHours, formatHoursTo12, formatHoursTo24 } from '../src/utils';

describe('time-picker Dependency imports', () => {
  runDependencyCheckTests('time-picker');
});

describe('time-picker utils', () => {
  describe('withLeadingZero', () => {
    it('should add leading zero to single digit numbers', () => {
      expect(withLeadingZero(5)).toBe('05');
      expect(withLeadingZero(0)).toBe('00');
      expect(withLeadingZero(9)).toBe('09');
    });

    it('should not add leading zero to double digit numbers', () => {
      expect(withLeadingZero(10)).toBe('10');
      expect(withLeadingZero(23)).toBe('23');
      expect(withLeadingZero(99)).toBe('99');
    });

    it('should handle string input', () => {
      expect(withLeadingZero('5')).toBe('05');
      expect(withLeadingZero('10')).toBe('10');
    });

    it('should handle three digit numbers', () => {
      expect(withLeadingZero(100)).toBe('100');
    });
  });

  describe('meridiemByHours', () => {
    it('should return AM for hours less than 12', () => {
      expect(meridiemByHours(0)).toBe('AM');
      expect(meridiemByHours(1)).toBe('AM');
      expect(meridiemByHours(11)).toBe('AM');
    });

    it('should return PM for hours 12 and greater', () => {
      expect(meridiemByHours(12)).toBe('PM');
      expect(meridiemByHours(13)).toBe('PM');
      expect(meridiemByHours(23)).toBe('PM');
    });
  });

  describe('formatHoursTo12', () => {
    it('should convert midnight (0) to 12', () => {
      expect(formatHoursTo12('0')).toBe('12');
    });

    it('should keep AM hours (1-11) with leading zero', () => {
      expect(formatHoursTo12('1')).toBe('01');
      expect(formatHoursTo12('9')).toBe('09');
      expect(formatHoursTo12('11')).toBe('11');
    });

    it('should keep 12 as 12', () => {
      expect(formatHoursTo12('12')).toBe('12');
    });

    it('should convert PM hours (13-23) to 1-11', () => {
      expect(formatHoursTo12('13')).toBe('01');
      expect(formatHoursTo12('14')).toBe('02');
      expect(formatHoursTo12('20')).toBe('08');
      expect(formatHoursTo12('23')).toBe('11');
    });

    it('should return original value for invalid input', () => {
      expect(formatHoursTo12('abc')).toBe('abc');
      expect(formatHoursTo12('')).toBe('');
    });

    it('should handle already formatted hours', () => {
      expect(formatHoursTo12('01')).toBe('01');
      expect(formatHoursTo12('09')).toBe('09');
    });
  });

  describe('formatHoursTo24', () => {
    it('should convert 12 AM to 00', () => {
      expect(formatHoursTo24('12', 'AM')).toBe('00');
    });

    it('should keep AM hours (1-11) as is with leading zero', () => {
      expect(formatHoursTo24('1', 'AM')).toBe('01');
      expect(formatHoursTo24('9', 'AM')).toBe('09');
      expect(formatHoursTo24('11', 'AM')).toBe('11');
    });

    it('should keep 12 PM as 12', () => {
      expect(formatHoursTo24('12', 'PM')).toBe('12');
    });

    it('should convert PM hours (1-11) to 13-23', () => {
      expect(formatHoursTo24('1', 'PM')).toBe('13');
      expect(formatHoursTo24('2', 'PM')).toBe('14');
      expect(formatHoursTo24('8', 'PM')).toBe('20');
      expect(formatHoursTo24('11', 'PM')).toBe('23');
    });

    it('should return original value for invalid input', () => {
      expect(formatHoursTo24('abc', 'AM')).toBe('abc');
      expect(formatHoursTo24('', 'PM')).toBe('');
    });

    it('should handle already formatted hours', () => {
      expect(formatHoursTo24('01', 'AM')).toBe('01');
      expect(formatHoursTo24('09', 'PM')).toBe('21');
    });
  });
});

describe('time-picker time entity', () => {
  describe('constructor', () => {
    it('should create instance with 24-hour format', () => {
      const time = new TimePickerTime('14', '30', {
        is12Hour: false,
        meridiem: 'PM',
      });

      expect(time.hours).toBe('14');
      expect(time.minutes).toBe('30');
      expect(time.options).toEqual({ is12Hour: false, meridiem: 'PM' });
    });

    it('should create instance with 12-hour format', () => {
      const time = new TimePickerTime('14', '30', {
        is12Hour: true,
        meridiem: 'PM',
      });

      expect(time.hours).toBe('02'); // 14 -> 02 PM
      expect(time.minutes).toBe('30');
    });

    it('should format minutes with leading zero', () => {
      const time = new TimePickerTime('10', '5', {
        is12Hour: false,
        meridiem: 'AM',
      });

      expect(time.minutes).toBe('05');
    });

    it('should handle empty minutes', () => {
      const time = new TimePickerTime('10', '', {
        is12Hour: false,
        meridiem: 'AM',
      });

      expect(time.minutes).toBe('');
    });

    it('should convert midnight in 12-hour format', () => {
      const time = new TimePickerTime('0', '00', {
        is12Hour: true,
        meridiem: 'AM',
      });

      expect(time.hours).toBe('12'); // 0 -> 12 AM
    });
  });

  describe('getters', () => {
    it('should return hours', () => {
      const time = new TimePickerTime('15', '45', {
        is12Hour: false,
        meridiem: 'PM',
      });

      expect(time.hours).toBe('15');
    });

    it('should return minutes', () => {
      const time = new TimePickerTime('15', '45', {
        is12Hour: false,
        meridiem: 'PM',
      });

      expect(time.minutes).toBe('45');
    });

    it('should return options', () => {
      const options = { is12Hour: true, meridiem: 'AM' as const };
      const time = new TimePickerTime('10', '30', options);

      expect(time.options).toEqual(options);
    });
  });

  describe('setters', () => {
    describe('hours setter', () => {
      it('should set hours in 24-hour format', () => {
        const time = new TimePickerTime('10', '30', {
          is12Hour: false,
          meridiem: 'AM',
        });

        time.hours = '20';

        expect(time.hours).toBe('20');
      });

      it('should convert hours in 12-hour format', () => {
        const time = new TimePickerTime('10', '30', {
          is12Hour: true,
          meridiem: 'PM',
        });

        time.hours = '15'; // 15 -> 03 PM

        expect(time.hours).toBe('03');
      });

      it('should handle midnight in 12-hour format', () => {
        const time = new TimePickerTime('10', '30', {
          is12Hour: true,
          meridiem: 'AM',
        });

        time.hours = '0';

        expect(time.hours).toBe('12');
      });
    });

    describe('minutes setter', () => {
      it('should set minutes with leading zero', () => {
        const time = new TimePickerTime('10', '30', {
          is12Hour: false,
          meridiem: 'AM',
        });

        time.minutes = '5';

        expect(time.minutes).toBe('05');
      });

      it('should set minutes without adding extra zero', () => {
        const time = new TimePickerTime('10', '30', {
          is12Hour: false,
          meridiem: 'AM',
        });

        time.minutes = '45';

        expect(time.minutes).toBe('45');
      });
    });

    describe('options setter', () => {
      it('should update options', () => {
        const time = new TimePickerTime('10', '30', {
          is12Hour: false,
          meridiem: 'AM',
        });

        const newOptions = { is12Hour: true, meridiem: 'PM' as const };
        time.options = newOptions;

        expect(time.options).toEqual(newOptions);
      });
    });
  });

  describe('toString', () => {
    it('should return time string in 24-hour format', () => {
      const time = new TimePickerTime('14', '30', {
        is12Hour: false,
        meridiem: 'PM',
      });

      expect(time.toString()).toBe('14:30');
    });

    it('should convert 12-hour format to 24-hour in toString', () => {
      const time = new TimePickerTime('2', '30', {
        is12Hour: true,
        meridiem: 'PM',
      });

      expect(time.toString()).toBe('14:30'); // 02 PM -> 14:30
    });

    it('should handle midnight (12 AM)', () => {
      const time = new TimePickerTime('12', '00', {
        is12Hour: true,
        meridiem: 'AM',
      });

      expect(time.toString()).toBe('00:00'); // 12 AM -> 00:00
    });

    it('should handle noon (12 PM)', () => {
      const time = new TimePickerTime('12', '00', {
        is12Hour: true,
        meridiem: 'PM',
      });

      expect(time.toString()).toBe('12:00'); // 12 PM -> 12:00
    });

    it('should handle AM hours in 12-hour format', () => {
      const time = new TimePickerTime('9', '15', {
        is12Hour: true,
        meridiem: 'AM',
      });

      expect(time.toString()).toBe('09:15'); // 09 AM -> 09:15
    });

    it('should handle PM hours in 12-hour format', () => {
      const time = new TimePickerTime('11', '45', {
        is12Hour: true,
        meridiem: 'PM',
      });

      expect(time.toString()).toBe('23:45'); // 11 PM -> 23:45
    });
  });

  describe('edge cases', () => {
    it('should handle switching from 24h to 12h format', () => {
      const time = new TimePickerTime('14', '30', {
        is12Hour: false,
        meridiem: 'PM',
      });

      expect(time.hours).toBe('14');

      time.options = { is12Hour: true, meridiem: 'PM' };
      time.hours = '14';

      expect(time.hours).toBe('02');
      expect(time.toString()).toBe('14:30');
    });

    it('should handle switching from 12h to 24h format', () => {
      const time = new TimePickerTime('2', '30', {
        is12Hour: true,
        meridiem: 'PM',
      });

      expect(time.hours).toBe('02');

      time.options = { is12Hour: false, meridiem: 'PM' };
      time.hours = '14';

      expect(time.hours).toBe('14');
      expect(time.toString()).toBe('14:30');
    });
  });
});
