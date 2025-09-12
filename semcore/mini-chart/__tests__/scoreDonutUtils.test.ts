import { describe, it, expect } from '@semcore/testing-utils/vitest';

import { ScoreDonutUtils } from '../src/utils/ScoreDonutUtils';

describe('Score Donut Functions', () => {
  describe.each([true, false])('when isSemiDonut = %s', (isSemiDonut) => {
    it('Verify returns correct value for divider when value is 100', () => {
      const scoreDonut = new ScoreDonutUtils(100, isSemiDonut);
      const actualResult = scoreDonut.hasDivider;
      const expectedResult = false;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify returns correct value for divider when value is 33.5', () => {
      const scoreDonut = new ScoreDonutUtils(33.5, isSemiDonut);
      const actualResult = scoreDonut.hasDivider;
      const expectedResult = true;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify returns correct value for divider when value is 0', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.hasDivider;
      const expectedResult = false;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify returns correct viewBox', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.viewBox;
      const expectedResult = isSemiDonut ? '0 0 24 12' : '0 0 24 24';

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify returns correct strokeWidth', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.strokeWidth;
      const expectedResult = isSemiDonut ? 6 : 4;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify returns correct radius', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.radius;
      const expectedResult = isSemiDonut ? 9 : 10;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates base stroke dash array correctly', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.baseStrokeDashArray;
      const expectedResult = isSemiDonut ? Math.PI * scoreDonut.radius : 2 * Math.PI * scoreDonut.radius;

      expect(actualResult).toBeCloseTo(expectedResult);
    });

    it('Verify calculates ofset point correctly', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const baseStroke = scoreDonut.baseStrokeDashArray;

      const actualResult = scoreDonut.offsetPoint;
      const expectedResult = isSemiDonut ? baseStroke / (100 / 3) : baseStroke / 100;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates value stroke dash array correctly', () => {
      const value = 30;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);
      const baseStroke = scoreDonut.baseStrokeDashArray;

      const actualResult = scoreDonut.valueStrokeDashArray;
      const expectedResult = baseStroke * (value / 100);

      expect(actualResult).toBeCloseTo(expectedResult);
    });

    it('Verify calculates grey stroke dash array correctly', () => {
      const value = 30;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);
      const baseStroke = scoreDonut.baseStrokeDashArray;
      const valueStroke = scoreDonut.valueStrokeDashArray;

      const actualResult = scoreDonut.greyStrokeDashArray;
      const expectedResult = baseStroke - valueStroke;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify returns correct strokeDashArrayParts for normal case', () => {
      const value = 30;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const baseStroke = scoreDonut.baseStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;
      const greyStroke = scoreDonut.greyStrokeDashArray;
      const greyStrokeDash = greyStroke - 2 * offsetPoint;

      const actualResult = scoreDonut.strokeDashArrayParts;
      const expectedResult = `${offsetPoint} ${greyStrokeDash} ${offsetPoint} ${baseStroke}`;
      const expectedResultSemiDonut = `${offsetPoint} ${greyStrokeDash} ${offsetPoint} ${baseStroke}`;

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('Verify returns correct strokeDashArrayParts for edge case where greyStrokeDash would be negative', () => {
      const value = 98.5;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const baseStroke = scoreDonut.baseStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;

      const actualResult = scoreDonut.strokeDashArrayParts;
      const expectedResult = `${offsetPoint}  ${baseStroke}`;
      const expectedResultSemiDonut = `${offsetPoint}  ${baseStroke}`;

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('Verify calculates stroke dash offset base correctly', () => {
      const value = 50;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const valueStroke = scoreDonut.valueStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;

      const actualResult = scoreDonut.strokeDashOffsetBase;
      const expectedResult = -valueStroke;
      const expectedResultSemiDonut = -1 * (valueStroke + offsetPoint);

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('Verify calculates stroke dash offset base correctly for 0 value', () => {
      const value = 0;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const actualResult = scoreDonut.strokeDashOffsetBase;
      const expectedResult = 0;
      const expectedResultSemiDonut = 0;

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('Verify calculates stroke dash offset base correctly for given value', () => {
      const value = 10;
      const isSemiDonut = false;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const hasDivider = scoreDonut.hasDivider;
      const valueStroke = scoreDonut.valueStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;
      const expectedResult = hasDivider ? -1 * (valueStroke + (isSemiDonut ? offsetPoint : 0)) : 0;
      const actualResult = scoreDonut.strokeDashOffsetBase;
      expect(actualResult).toBe(expectedResult);
    });
  });
});
