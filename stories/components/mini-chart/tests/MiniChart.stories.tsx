import type { Meta, StoryObj } from '@storybook/react-vite';

import ScoreDonutsExample from './examples/score-donuts';
import ScoreLineSegments from './examples/score-line-segments';
import ScoreLinesExample from './examples/score-lines';
import TrendBarsExample from './examples/trend-bars';
import TrendLinesExample from './examples/trend-lines';

const meta: Meta = {
  title: 'Components/MiniChart/Tests',
};

export default meta;

export const ScoreDonuts: StoryObj = {
  render: ScoreDonutsExample,
};

export const ScoreLines: StoryObj = {
  render: ScoreLinesExample,
};

export const TrendBars: StoryObj = {
  render: TrendBarsExample,
};

export const TrendLines: StoryObj = {
  render: TrendLinesExample,
};

export const ScoreLineSegmenets: StoryObj = {
  render: ScoreLineSegments,
};
