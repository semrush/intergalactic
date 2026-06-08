import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

import MiniChart from '../src';

describe('mini-chart Dependency imports', () => {
  runDependencyCheckTests('mini-chart');
});

describe('MiniChart data-ui-name', () => {
  shouldHaveDataUiName({
    Component: MiniChart.ScoreLine,
    props: { value: 50 },
    expectedDataUiName: 'MiniChart.ScoreLine',
  });

  shouldHaveDataUiName({
    Component: MiniChart.ScoreDonut,
    props: { value: 50 },
    expectedDataUiName: 'MiniChart.ScoreDonut',
  });

  shouldHaveDataUiName({
    Component: MiniChart.ScoreSemiDonut,
    props: { value: 50 },
    expectedDataUiName: 'MiniChart.ScoreSemiDonut',
  });

  shouldHaveDataUiName({
    Component: MiniChart.TrendLine,
    props: { data: [1, 2, 3] },
    expectedDataUiName: 'MiniChart.TrendLine',
  });

  shouldHaveDataUiName({
    Component: MiniChart.TrendArea,
    props: { data: [1, 2, 3] },
    expectedDataUiName: 'MiniChart.TrendArea',
  });

  shouldHaveDataUiName({
    Component: MiniChart.TrendBar,
    props: { data: [{ value: 1 }, { value: 2 }, { value: 3 }] },
    expectedDataUiName: 'MiniChart.TrendBar',
  });

  shouldHaveDataUiName({
    Component: MiniChart.TrendHistogram,
    props: { data: [{ value: 1 }, { value: 2 }, { value: 3 }] },
    expectedDataUiName: 'MiniChart.TrendHistogram',
  });
});
