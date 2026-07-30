import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe, it, expect } from '@semcore/testing-utils/vitest';

import TimePickerEntity from '../src/entity/TimePickerEntity';

describe('time-picker Dependency imports', () => {
  runDependencyCheckTests('time-picker');
});

describe('TimePickerEntity', () => {
  describe('constructor', () => {
    it('should initialize with default empty time when no value provided', () => {
      const entity = new TimePickerEntity(':');

      expect(entity.hours).toBe('');
      expect(entity.minutes).toBe('');
    });

    it('should parse hours and minutes from value string', () => {
      const entity = new TimePickerEntity('14:30');

      expect(entity.hours).toBe('14');
      expect(entity.minutes).toBe('30');
      expect(entity.meridiem).toBe('PM');
    });

    it('should handle single digit hours and minutes', () => {
      const entity = new TimePickerEntity('9:5');

      expect(entity.hours).toBe('09');
      expect(entity.minutes).toBe('05');
      expect(entity.meridiem).toBe('AM');
    });

    it('should initialize with AM meridiem by default', () => {
      const entity = new TimePickerEntity('10:00', true);

      expect(entity.meridiem).toBe('AM');
    });
  });

  describe('12-hour format', () => {
    it('should format midnight (00:00) as 12:00 AM', () => {
      const entity = new TimePickerEntity('0:00', true);

      expect(entity.hours).toBe('12');
      expect(entity.minutes).toBe('00');
      expect(entity.meridiem).toBe('AM');
    });

    it('should format hours 1-11 AM correctly', () => {
      const entity = new TimePickerEntity('9:30', true);

      expect(entity.hours).toBe('09');
    });

    it('should format noon (12:00) as 12:00', () => {
      const entity = new TimePickerEntity('12:00', true);

      expect(entity.hours).toBe('12');
      expect(entity.meridiem).toBe('PM');
    });

    it('should format hours 13-23 as 1-11 PM', () => {
      const entity = new TimePickerEntity('14:45', true);

      expect(entity.hours).toBe('02');
      expect(entity.meridiem).toBe('PM');
    });
  });

  describe('24-hour format', () => {
    it('should format hours with leading zero in 24-hour mode', () => {
      const entity = new TimePickerEntity('9:30');

      expect(entity.hours).toBe('09');
      expect(entity.meridiem).toBe('AM');
    });

    it('should handle midnight in 24-hour format', () => {
      const entity = new TimePickerEntity('0:00');

      expect(entity.hours).toBe('00');
      expect(entity.meridiem).toBe('AM');
    });

    it('should not handle meridiem in 24-hour format', () => {
      const entity = new TimePickerEntity('14:00');

      expect(entity.hours).toBe('14');
      expect(entity.meridiem).toBe('PM');
      entity.toggleMeridiem();
      expect(entity.hours).toBe('14');
      expect(entity.meridiem).toBe('AM');

      entity.hours = '3';
      expect(entity.hours).toBe('03');
      expect(entity.meridiem).toBe('AM');
      entity.toggleMeridiem();
      expect(entity.hours).toBe('03');
      expect(entity.meridiem).toBe('PM');
    });

    it('should not convert 12 to 00:00 in 24-hour format by default', () => {
      const entity = new TimePickerEntity('12:00');

      expect(entity.hours).toBe('12');
      expect(entity.meridiem).toBe('PM');
    });

    it('should keep AM hours unchanged (except 12)', () => {
      const entity = new TimePickerEntity('9:00');

      expect(entity.hours).toBe('09');
      expect(entity.meridiem).toBe('AM');
    });
  });

  describe('toggleMeridiem', () => {
    it('should toggle multiple times correctly', () => {
      const entity = new TimePickerEntity('10:00', true);

      expect(entity.meridiem).toBe('AM');
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
      const entity = new TimePickerEntity('14:30');

      expect(entity.toString()).toBe('14:30');
    });

    it('should not apply meridiem conversion to 24-hour format string', () => {
      const entity = new TimePickerEntity('12:30');

      entity.toggleMeridiem();
      expect(entity.toString()).toBe('12:30');

      entity.hours = '3';
      expect(entity.toString()).toBe('03:30');
    });

    it('should convert to 24-hour format string when is12Hour is true', () => {
      const entity = new TimePickerEntity('2:30', true);
      entity.toggleMeridiem();

      expect(entity.toString()).toBe('14:30');
    });

    it('should handle midnight (12 AM) conversion', () => {
      const entity = new TimePickerEntity('00:00', true);

      expect(entity.toString()).toBe('00:00');
    });

    it('should handle noon (12 PM) conversion', () => {
      const entity = new TimePickerEntity('12:00', true);

      expect(entity.toString()).toBe('12:00');
    });

    it('should add leading zeros to output', () => {
      const entity = new TimePickerEntity('9:5');

      expect(entity.toString()).toBe('09:05');
    });
  });

  describe('edge cases', () => {
    it('should handle invalid hours gracefully', () => {
      const entity = new TimePickerEntity('invalid:30');

      expect(entity.hours).toBe('invalid');
    });

    it('should handle empty minutes', () => {
      const entity = new TimePickerEntity('10:');

      expect(entity.minutes).toBe('');
    });

    it('should handle empty hours', () => {
      const entity = new TimePickerEntity(':30');

      expect(entity.hours).toBe('');
    });

    it('should preserve non-numeric hour values in 12-hour format', () => {
      const entity = new TimePickerEntity('invalid:30', true);

      expect(entity.hours).toBe('invalid');
    });
  });
});
