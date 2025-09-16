import { describe, it, expect } from '@semcore/testing-utils/vitest';

import { ScoreDonutUtils } from '../src/utils/ScoreDonutUtils';

describe('Score Donut Functions', () => {
  describe.each([true, false])('when isSemiDonut = %s', (isSemiDonut) => {
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

    it('Verify returns correct separatorDash for normal case', () => {
      const value = 30;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const baseStroke = scoreDonut.baseStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;
      const greyStroke = scoreDonut.greyStrokeDashArray;
      const greyStrokeDash = greyStroke - 2 * offsetPoint;

      const actualResult = scoreDonut.separatorDash;
      const expectedResult = `${offsetPoint} ${greyStrokeDash} ${offsetPoint} ${baseStroke}`;
      const expectedResultSemiDonut = `${offsetPoint} ${greyStrokeDash} ${offsetPoint} ${baseStroke}`;

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('Verify returns correct separatorDash for edge case where greyStrokeDash would be negative', () => {
      const value = 98.5;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      const baseStroke = scoreDonut.baseStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;

      const actualResult = scoreDonut.separatorDash;
      const expectedResult = `${offsetPoint} 0 ${offsetPoint} ${baseStroke}`;
      const expectedResultSemiDonut = `${offsetPoint} 0 ${offsetPoint} ${baseStroke}`;

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

      const valueStroke = scoreDonut.valueStrokeDashArray;
      const offsetPoint = scoreDonut.offsetPoint;
      const expectedResult = -1 * (valueStroke + (isSemiDonut ? offsetPoint : 0));
      const actualResult = scoreDonut.strokeDashOffsetBase;
      expect(actualResult).toBe(expectedResult);
    });
  });
});
