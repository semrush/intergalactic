import { describe, it, expect } from '@semcore/testing-utils/vitest';
import { arc } from 'd3-shape';

import { ScoreDonutUtils } from '../src/utils/ScoreDonutUtils';

const MIN_ANGLE = 0.25;
const ANIMATION_FRAMES = 60;

const buildArc = (endAngle: number) =>
  arc<void>()
    .innerRadius(8)
    .outerRadius(12)
    .startAngle(0)
    .endAngle(endAngle)
    .cornerRadius(1)() ?? '';

describe('Score Donut Functions', () => {
  describe.each([true, false])('when isSemiDonut = %s', (isSemiDonut) => {
    const totalAngle = isSemiDonut ? Math.PI : 2 * Math.PI;

    it('Verify returns correct viewBox', () => {
      const scoreDonut = new ScoreDonutUtils(0, isSemiDonut);

      expect(scoreDonut.viewBox).toBe(isSemiDonut ? '0 0 24 12' : '0 0 24 24');
    });

    it.each([
      [-10, false, true],
      [0, false, true],
      [0.5, true, true],
      [50, true, true],
      [99.9, true, true],
      [100, true, false],
      [120, true, false],
    ])('Verify hasValue/hasBase for value %s', (value, hasValue, hasBase) => {
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      expect(scoreDonut.hasValue).toBe(hasValue);
      expect(scoreDonut.hasBase).toBe(hasBase);
    });

    it('Verify basePath is a full arc regardless of value', () => {
      const expected = buildArc(totalAngle);

      expect(new ScoreDonutUtils(0, isSemiDonut).basePath).toBe(expected);
      expect(new ScoreDonutUtils(50, isSemiDonut).basePath).toBe(expected);
      expect(new ScoreDonutUtils(100, isSemiDonut).basePath).toBe(expected);
    });

    it.each([
      [0, 0],
      [-10, 0],
      [25, 0.25],
      [50, 0.5],
      [75, 0.75],
      [100, 1],
      [120, 1],
    ])('Verify valuePath for value %s is proportional to the total angle', (value, ratio) => {
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);

      expect(scoreDonut.valuePath).toBe(buildArc(totalAngle * ratio));
    });

    it('Verify small values are clamped to the minimal visible angle', () => {
      const scoreDonut = new ScoreDonutUtils(1, isSemiDonut);

      expect(scoreDonut.valuePath).toBe(buildArc(MIN_ANGLE));
    });

    it('Verify values close to 100 keep a visible gap before the end', () => {
      const scoreDonut = new ScoreDonutUtils(99, isSemiDonut);

      expect(scoreDonut.valuePath).toBe(buildArc(totalAngle - MIN_ANGLE));
    });

    it('Verify valueAnimationFrames grows from an empty arc towards the value', () => {
      const value = 50;
      const scoreDonut = new ScoreDonutUtils(value, isSemiDonut);
      const frames = scoreDonut.valueAnimationFrames.split(';');
      const valueAngle = totalAngle * (value / 100);

      expect(frames).toHaveLength(ANIMATION_FRAMES);
      expect(frames[0]).toBe(buildArc(0));
      expect(frames[ANIMATION_FRAMES / 2]).toBe(buildArc(valueAngle / 2));
      expect(frames[ANIMATION_FRAMES - 1]).toBe(
        buildArc((valueAngle * (ANIMATION_FRAMES - 1)) / ANIMATION_FRAMES),
      );
    });

    it('Verify valueAnimationFrames are all empty arcs for value 0', () => {
      const frames = new ScoreDonutUtils(0, isSemiDonut).valueAnimationFrames.split(';');

      expect(frames).toHaveLength(ANIMATION_FRAMES);
      expect(new Set(frames)).toEqual(new Set([buildArc(0)]));
    });
  });
});
