import { describe, it, expect } from 'vitest';
import { L } from 'vitest/dist/chunks/reporters.d.CqBhtcTq';

import getScoreDonutFunctions from '../src/utils/score.donut.functions';

describe('Score Donut Functions', () => {
  describe.each([true, false])('when isSemiDonut = %s', (isSemiDonut) => {
    const {
      getViewBox,
      getStrokeWidth,
      getRadius,
      getBaseStrokeDashArray,
      getStrokeDashArrayParts,
      getStrokeDashOffsetBase,
      getValueStrokeDashArray,
      getGreyStrokeDashArray,
      getOffsetPoint,
    } = getScoreDonutFunctions(isSemiDonut);

    it('returns correct viewBox', () => {
      const actualResult = getViewBox();
      const expectedResult = isSemiDonut ? '0 0 24 12' : '0 0 24 24';

      expect(actualResult).toBe(expectedResult);
    });

    it('returns correct strokeWidth', () => {
      const actualResult = getStrokeWidth();
      const expectedResult = isSemiDonut ? 6 : 4;

      expect(actualResult).toBe(expectedResult);
    });

    it('returns correct radius', () => {
      const actualResult = getRadius();
      const expectedResult = isSemiDonut ? 9 : 10;

      expect(actualResult).toBe(expectedResult);
    });

    it('calculates base stroke dash array correctly', () => {
      const radius = getRadius();

      const actualResult = getBaseStrokeDashArray(radius);
      const expectedResult = isSemiDonut ? Math.PI * radius : 2 * Math.PI * radius;

      expect(actualResult).toBeCloseTo(expectedResult);
    });

    it('calculates ofset point correctly', () => {
      const radius = getRadius();
      const baseStroke = getBaseStrokeDashArray(radius);

      const actualResult = getOffsetPoint(baseStroke);
      const expectedResult = isSemiDonut ? baseStroke / (100 / 3) : baseStroke / 100;

      expect(actualResult).toBe(expectedResult);
    });

    it('calculates value stroke dash array correctly', () => {
      const radius = getRadius();
      const value = 30;
      const baseStroke = getBaseStrokeDashArray(radius);

      const actualResult = getValueStrokeDashArray(value, baseStroke);
      const expectedResult = baseStroke * (value / 100);

      expect(actualResult).toBeCloseTo(expectedResult);
    });

    it('calculates grey stroke dash array correctly', () => {
      const radius = getRadius();
      const baseStroke = getBaseStrokeDashArray(radius);
      const valueStroke = getValueStrokeDashArray(30, baseStroke);

      const actualResult = getGreyStrokeDashArray(baseStroke, valueStroke);
      const expectedResult = baseStroke - valueStroke;

      expect(actualResult).toBe(expectedResult);
    });

    it('returns correct strokeDashArrayParts for normal case', () => {
      const value = 30;
      const radius = getRadius();
      const baseStroke = getBaseStrokeDashArray(radius);
      const valueStroke = getValueStrokeDashArray(value, baseStroke);
      const offsetPoint = getOffsetPoint(baseStroke);
      const greyStroke = getGreyStrokeDashArray(baseStroke, valueStroke);
      const greyStrokeDash = greyStroke - 2 * offsetPoint;

      const actualResult = getStrokeDashArrayParts(value, baseStroke);
      const expectedResult = `${offsetPoint} ${greyStrokeDash} ${offsetPoint} ${baseStroke}`;
      const expectedResultSemiDonut = `${offsetPoint} ${greyStrokeDash} ${offsetPoint} ${baseStroke}`;

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('returns correct strokeDashArrayParts for edge case where greyStrokeDash would be negative', () => {
      const value = 98.5;
      const radius = getRadius();
      const baseStroke = getBaseStrokeDashArray(radius);
      const offsetPoint = getOffsetPoint(baseStroke);

      const actualResult = getStrokeDashArrayParts(value, baseStroke);
      const expectedResult = `${offsetPoint}  ${baseStroke}`;
      const expectedResultSemiDonut = `${offsetPoint}  ${baseStroke}`;

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });

    it('calculates stroke dash offset base correctly', () => {
      const value = 50;
      const radius = getRadius();
      const baseStroke = getBaseStrokeDashArray(radius);
      const valueStroke = getValueStrokeDashArray(value, baseStroke);
      const offsetPoint = getOffsetPoint(baseStroke);

      const actualResult = getStrokeDashOffsetBase(value, baseStroke);
      const expectedResult = -valueStroke;
      const expectedResultSemiDonut = -1 * (valueStroke + offsetPoint);

      expect(actualResult).toBe(isSemiDonut ? expectedResultSemiDonut : expectedResult);
    });
  });
});
