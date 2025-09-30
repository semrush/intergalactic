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

    const fullLength = isSemiDonut
      ? Math.PI * 9
      : 2 * Math.PI * 10;

    const point = isSemiDonut
      ? fullLength / (100 / 3)
      : fullLength / 100;

    it('Verify calculates fullLength correctly', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.fullLength;
      const expectedResult = fullLength;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates point correctly', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.point;
      const expectedResult = point;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates valueLength correctly for value = 30', () => {
      const value = 30;
      const scoreDonut = new ScoreDonutUtils(30, isSemiDonut);
      const actualResult = scoreDonut.valueLength;
      const expectedResult = fullLength * (value / 100);

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates valueLength correctly for value = -1', () => {
      const scoreDonut = new ScoreDonutUtils(-1, isSemiDonut);
      const actualResult = scoreDonut.valueLength;
      const expectedResult = 0;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates valueLength correctly for value = 101', () => {
      const scoreDonut = new ScoreDonutUtils(101, isSemiDonut);
      const actualResult = scoreDonut.valueLength;
      const expectedResult = fullLength;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates animatedValueLength correctly for value = 30', () => {
      const value = 30;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);
      const actualResult = scoreDonut.animatedValueLength;
      const expectedResult = fullLength * (value / 100);

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates animatedValueLength correctly for value = 100', () => {
      const scoreDonut = new ScoreDonutUtils(100, isSemiDonut);
      const actualResult = scoreDonut.animatedValueLength;
      const expectedResult = isSemiDonut
        ? fullLength - point
        : fullLength - 2 * point;

      expect(actualResult).toBeCloseTo(expectedResult);
    });

    it('Verify calculates baseOffset correctly for value = 0', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.baseOffset;
      const expectedResult = -0;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates baseOffset correctly for value = 30', () => {
      const scoreDonut = new ScoreDonutUtils(30, isSemiDonut);
      const actualResult = scoreDonut.baseOffset;
      const expectedResult = -1 * (fullLength * (30 / 100) + point);

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates baseLength correctly for value = 0', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);
      const actualResult = scoreDonut.baseLength;
      const expectedResult = fullLength;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates baseLength correctly for value = 30', () => {
      const scoreDonut = new ScoreDonutUtils(30, isSemiDonut);
      const actualResult = scoreDonut.baseLength;
      const expectedResult = isSemiDonut
        ? fullLength * 0.7 - point
        : fullLength * 0.7 - 2 * point;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates baseLength correctly for value = 100', () => {
      const scoreDonut = new ScoreDonutUtils(100, isSemiDonut);
      const actualResult = scoreDonut.baseLength;
      const expectedResult = 0;

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates animatedBaseLengthFrom correctly for value = 30', () => {
      const scoreDonut = new ScoreDonutUtils(30, isSemiDonut);
      const actualResult = scoreDonut.animatedBaseLengthFrom;
      const expectedResult = fullLength - point - (isSemiDonut ? 0 : point);

      expect(actualResult).toBe(expectedResult);
    });

    it('Verify calculates animatedBaseLengthTo correctly for value = 30', () => {
      const scoreDonut = new ScoreDonutUtils(30, isSemiDonut);
      const actualResult = scoreDonut.animatedBaseLengthTo;
      const expectedResult = fullLength * 0.7 - point - (isSemiDonut ? 0 : point);

      expect(actualResult).toBe(expectedResult);
    });
  });
});
