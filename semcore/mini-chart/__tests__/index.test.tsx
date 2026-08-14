import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import MiniCharts from '../src';

const expectUINameToMatchSnapshot = (component: React.ReactElement) => {
  const { container } = render(component);
  const result = extractUIName(container);

  expect(result).toMatchSnapshot();
};

describe('mini-chart Dependency imports', () => {
  runDependencyCheckTests('mini-chart');
});

describe('MiniCharts', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name for ScoreLine', () => {
    const component = (
      <MiniCharts.ScoreLine value={2}>
        <MiniCharts.ScoreLine.Segment value={1} color='chart-palette-order-1' />
      </MiniCharts.ScoreLine>
    );

    expectUINameToMatchSnapshot(component);
  });

  test('Verify data-ui-name for ScoreDonut', () => {
    const component = <MiniCharts.ScoreDonut value={50} />;

    expectUINameToMatchSnapshot(component);
  });

  test('Verify data-ui-name for ScoreSemiDonut', () => {
    const component = <MiniCharts.ScoreSemiDonut value={50} />;

    expectUINameToMatchSnapshot(component);
  });

  test('Verify data-ui-name for TrendLine', () => {
    const component = <MiniCharts.TrendLine data={[15, 70, 20, 85, 20]} />;

    expectUINameToMatchSnapshot(component);
  });

  test('Verify data-ui-name for TrendArea', () => {
    const component = <MiniCharts.TrendArea data={[15, 70, 20, 85, 20]} />;

    expectUINameToMatchSnapshot(component);
  });

  test('Verify data-ui-name for TrendBar', () => {
    const component = <MiniCharts.TrendBar data={[{ value: 20 }, { value: 80 }]} />;

    expectUINameToMatchSnapshot(component);
  });

  test('Verify data-ui-name for TrendHistogram', () => {
    const component = <MiniCharts.TrendHistogram data={[{ value: 20 }, { value: 80 }]} />;

    expectUINameToMatchSnapshot(component);
  });
});
