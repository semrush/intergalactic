import { describe, expect, test } from '@semcore/testing-utils/vitest';

import { resolvePatternDasharray } from '../src/Pattern';

// Pattern indexes are cached per module in the order keys are first seen,
// so this file keeps its own module instance and resolves keys in series order.
const SERIES_COUNT = 24;
const DASHARRAYS_COUNT = 12;

describe('Default patterns', () => {
  const seriesKeys = Array.from({ length: SERIES_COUNT }, (_, index) => `series-${index + 1}`);
  const dasharrays = seriesKeys.map((key) => resolvePatternDasharray(key, true));

  test('Verify every series gets a dasharray', () => {
    expect(dasharrays).toHaveLength(SERIES_COUNT);
    expect(dasharrays.every((dasharray) => typeof dasharray === 'string' && dasharray.length > 0)).toBe(true);
  });

  test('Verify any 12 neighbouring line series get distinct dasharrays', () => {
    for (let start = 0; start <= SERIES_COUNT - DASHARRAYS_COUNT; start++) {
      const window = dasharrays.slice(start, start + DASHARRAYS_COUNT);

      expect(new Set(window).size, `series ${start + 1}–${start + DASHARRAYS_COUNT}`).toBe(DASHARRAYS_COUNT);
    }
  });
});
