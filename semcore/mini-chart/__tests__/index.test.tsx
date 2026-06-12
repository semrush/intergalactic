import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import MiniCharts from '../src';

describe('mini-chart Dependency imports', () => {
  runDependencyCheckTests('mini-chart');
});

describe('MiniCharts', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name for ScoreLine', () => {
    const scoreLine = (
      <MiniCharts.ScoreLine value={2}>
        <MiniCharts.ScoreLine.Segment value={1} color='chart-palette-order-1' />
      </MiniCharts.ScoreLine>
    );

    const { container } = render(scoreLine);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify data-ui-name for ScoreDonut', () => {
    const scoreDonut = <MiniCharts.ScoreDonut value={50} />;

    const { container } = render(scoreDonut);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify data-ui-name for ScoreSemiDonut', () => {
    const scoreSemiDonut = <MiniCharts.ScoreSemiDonut value={50} />;

    const { container } = render(scoreSemiDonut);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify data-ui-name for TrendLine', () => {
    const trendLine = <MiniCharts.TrendLine data={[15, 70, 20, 85, 20]} />;

    const { container } = render(trendLine);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify data-ui-name for TrendArea', () => {
    const trendArea = <MiniCharts.TrendArea data={[15, 70, 20, 85, 20]} />;

    const { container } = render(trendArea);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify data-ui-name for TrendBar', () => {
    const trendBar = <MiniCharts.TrendBar data={[{ value: 20 }, { value: 80 }]} />;

    const { container } = render(trendBar);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify data-ui-name for TrendHistogram', () => {
    const trendHistogram = <MiniCharts.TrendHistogram data={[{ value: 20 }, { value: 80 }]} />;

    const { container } = render(trendHistogram);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
