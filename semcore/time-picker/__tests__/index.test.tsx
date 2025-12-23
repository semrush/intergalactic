import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe, it, expect } from '@semcore/testing-utils/vitest';

import TimePickerEntity from '../src/entity/TimePickerEntity';

describe('time-picker Dependency imports', () => {
  runDependencyCheckTests('time-picker');
});

describe('TimePickerEntity', () => {
  describe('constructor', () => {
    it('should initialize with default empty time when no value provided', () => {
      const entity = new TimePickerEntity(':', { is12Hour: false });

      expect(entity.hours).toBe('');
      expect(entity.minutes).toBe('');
    });

    it('should parse hours and minutes from value string', () => {
      const entity = new TimePickerEntity('14:30', { is12Hour: false });

      expect(entity.hours).toBe('14');
      expect(entity.minutes).toBe('30');
    });

    it('should handle single digit hours and minutes', () => {
      const entity = new TimePickerEntity('9:5', { is12Hour: false });

      expect(entity.hours).toBe('09');
      expect(entity.minutes).toBe('05');
    });

    it('should initialize with AM meridiem by default', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: true });

      expect(entity.meridiem).toBe('AM');
    });
  });

  describe('12-hour format', () => {
    it('should format midnight (00:00) as 12:00 AM', () => {
      const entity = new TimePickerEntity('0:00', { is12Hour: true });

      expect(entity.hours).toBe('12');
      expect(entity.minutes).toBe('00');
    });

    it('should format hours 1-11 AM correctly', () => {
      const entity = new TimePickerEntity('9:30', { is12Hour: true });

      expect(entity.hours).toBe('09');
    });

    it('should format noon (12:00) as 12:00', () => {
      const entity = new TimePickerEntity('12:00', { is12Hour: true });

      expect(entity.hours).toBe('12');
    });

    it('should format hours 13-23 as 1-11 PM', () => {
      const entity = new TimePickerEntity('14:45', { is12Hour: true });

      expect(entity.hours).toBe('02');
    });

    it('should format 23:59 as 11:59', () => {
      const entity = new TimePickerEntity('23:59', { is12Hour: true });

      expect(entity.hours).toBe('11');
      expect(entity.minutes).toBe('59');
    });
  });

  describe('24-hour format', () => {
    it('should format hours with leading zero in 24-hour mode', () => {
      const entity = new TimePickerEntity('9:30', { is12Hour: false });

      expect(entity.hours).toBe('09');
    });

    it('should handle midnight in 24-hour format', () => {
      const entity = new TimePickerEntity('0:00', { is12Hour: false });

      expect(entity.hours).toBe('00');
    });

    it('should convert 12 AM to 00:00 in 24-hour format', () => {
      const entity = new TimePickerEntity('12:00', { is12Hour: false });
      entity.meridiem = 'AM';

      expect(entity.hours).toBe('00');
    });

    it('should convert 12 PM to 12:00 in 24-hour format', () => {
      const entity = new TimePickerEntity('12:00', { is12Hour: false });
      entity.meridiem = 'PM';

      expect(entity.hours).toBe('12');
    });

    it('should convert PM hours correctly', () => {
      const entity = new TimePickerEntity('3:00', { is12Hour: false });
      entity.meridiem = 'PM';

      expect(entity.hours).toBe('15');
    });

    it('should keep AM hours unchanged (except 12)', () => {
      const entity = new TimePickerEntity('9:00', { is12Hour: false });
      entity.meridiem = 'AM';

      expect(entity.hours).toBe('09');
    });
  });

  describe('getters and setters', () => {
    it('should update hours via setter', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: false });
      entity.hours = '15';

      expect(entity.hours).toBe('15');
    });

    it('should update minutes via setter', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: false });
      entity.minutes = '45';

      expect(entity.minutes).toBe('45');
    });

    it('should update options via setter', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: false });
      entity.options = { is12Hour: true };

      expect(entity.options.is12Hour).toBe(true);
    });

    it('should update meridiem via setter', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: true });
      entity.meridiem = 'PM';

      expect(entity.meridiem).toBe('PM');
    });
  });

  describe('toggleMeridiem', () => {
    it('should toggle from AM to PM', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: true });

      entity.toggleMeridiem();

      expect(entity.meridiem).toBe('PM');
    });

    it('should toggle from PM to AM', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: true });
      entity.meridiem = 'PM';

      entity.toggleMeridiem();

      expect(entity.meridiem).toBe('AM');
    });

    it('should toggle multiple times correctly', () => {
      const entity = new TimePickerEntity('10:00', { is12Hour: true });

      entity.toggleMeridiem();
      expect(entity.meridiem).toBe('PM');

      entity.toggleMeridiem();
      expect(entity.meridiem).toBe('AM');

      entity.toggleMeridiem();
      expect(entity.meridiem).toBe('PM');
    });
  });

  describe('toString', () => {
    it('should return 24-hour format string when is12Hour is false', () => {
      const entity = new TimePickerEntity('14:30', { is12Hour: false });

      expect(entity.toString()).toBe('14:30');
    });

    it('should convert to 24-hour format string when is12Hour is true', () => {
      const entity = new TimePickerEntity('2:30', { is12Hour: true });
      entity.meridiem = 'PM';

      expect(entity.toString()).toBe('14:30');
    });

    it('should handle midnight (12 AM) conversion', () => {
      const entity = new TimePickerEntity('12:00', { is12Hour: true });
      entity.meridiem = 'AM';

      expect(entity.toString()).toBe('00:00');
    });

    it('should handle noon (12 PM) conversion', () => {
      const entity = new TimePickerEntity('12:00', { is12Hour: true });
      entity.meridiem = 'PM';

      expect(entity.toString()).toBe('12:00');
    });

    it('should add leading zeros to output', () => {
      const entity = new TimePickerEntity('9:5', { is12Hour: false });

      expect(entity.toString()).toBe('09:05');
    });
  });

  describe('edge cases', () => {
    it('should handle invalid hours gracefully', () => {
      const entity = new TimePickerEntity('invalid:30', { is12Hour: false });

      expect(entity.hours).toBe('invalid');
    });

    it('should handle empty minutes', () => {
      const entity = new TimePickerEntity('10:', { is12Hour: false });

      expect(entity.minutes).toBe('');
    });

    it('should handle empty hours', () => {
      const entity = new TimePickerEntity(':30', { is12Hour: false });

      expect(entity.hours).toBe('');
    });

    it('should preserve non-numeric hour values in 12-hour format', () => {
      const entity = new TimePickerEntity('invalid:30', { is12Hour: true });

      expect(entity.hours).toBe('invalid');
    });
  });

  describe('format switching', () => {
    it('should recalculate hours when switching from 12-hour to 24-hour', () => {
      const entity = new TimePickerEntity('3:00', { is12Hour: true });
      entity.meridiem = 'PM';

      entity.options = { is12Hour: false };

      expect(entity.hours).toBe('15');
    });

    it('should recalculate hours when switching from 24-hour to 12-hour', () => {
      const entity = new TimePickerEntity('15:00', { is12Hour: false });

      entity.options = { is12Hour: true };

      expect(entity.hours).toBe('03');
    });
  });
});
