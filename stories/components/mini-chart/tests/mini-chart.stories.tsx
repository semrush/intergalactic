import type { Meta, StoryObj } from '@storybook/react-vite';

import ScoreDonutsExample from './examples/score-donuts';
import type { ScoreDonutsProps } from './examples/score-donuts';
import ScoreLineSegments from './examples/score-line-segments';
import type { ScoreLineProps } from './examples/score-line-segments';
import ScoreLinesExample from './examples/score-lines';
import type { ScoreLinesProps } from './examples/score-lines';
import TrendBarsExample from './examples/trend-bars';
import type { TrendBarsProps } from './examples/trend-bars';
import TrendLinesExample from './examples/trend-lines';
import type { TrendLinesProps } from './examples/trend-lines';

const meta: Meta = {
  title: 'Components/MiniChart/Tests',
};

export default meta;

const chartPaletteOptions = Array.from({ length: 24 }, (_, i) => `chart-palette-order-${i + 1}`);

const baseControls = {
  loading: { control: 'boolean' },
  animate: { control: 'boolean' },
} as const;

const colorControl = {
  control: { type: 'select' },
  options: chartPaletteOptions,
} as const;

export const ScoreDonuts: StoryObj<ScoreDonutsProps> = {
  render: ScoreDonutsExample,
  argTypes: {
    value: { control: 'number' },
    ...baseControls,
    color: colorControl,
    baseBgColor: colorControl,
  },
};

export const ScoreLines: StoryObj<ScoreLinesProps> = {
  render: ScoreLinesExample,
  argTypes: {
    value: { control: 'number' },
    segments: { control: 'number' },
    ...baseControls,
    color: colorControl,
    baseBgColor: colorControl,
  },
};

export const TrendBars: StoryObj<TrendBarsProps> = {
  render: TrendBarsExample,
  argTypes: {
    ...baseControls,
  },
};

export const TrendLines: StoryObj<TrendLinesProps> = {
  render: TrendLinesExample,
  argTypes: {
    lastPointRadius: { control: 'number' },
    ...baseControls,
    lastPointColor: colorControl,
    color: colorControl,
  },
};

export const ScoreLineSegmenets: StoryObj<ScoreLineProps> = {
  render: ScoreLineSegments,
  argTypes: {
    value1: { control: 'number' },
    value2: { control: 'number' },
    ...baseControls,
    color1: colorControl,
    color2: colorControl,
    baseBgColor: colorControl,
  },
};
