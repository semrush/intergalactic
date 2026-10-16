import type { Meta, StoryObj } from '@storybook/react-vite';

import ScoreDonutsExample, { defaultScoreDonutsProps } from './examples/score-donuts';
import ScoreLineSegments, { defaultScoreLineSegmentsProps } from './examples/score-line-segments';
import ScoreLinesExample, { defaultScoreLinesProps } from './examples/score-lines';
import TrendBarsExample, { defaultTrendBarsProps } from './examples/trend-bars';
import TrendLinesExample, { defaultTrendLinesProps } from './examples/trend-lines';

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
  options: [undefined, ...chartPaletteOptions],
} as const;

const baseBgColorControl = {
  control: { type: 'select' },
  options: [undefined, 'chart-grid-bar-base-bg', ...chartPaletteOptions],
} as const;

export const ScoreDonuts: StoryObj<typeof defaultScoreDonutsProps> = {
  render: ScoreDonutsExample,
  argTypes: {
    value: { control: 'number' },
    ...baseControls,
    color: colorControl,
    baseBgColor: baseBgColorControl,
  },
  args: defaultScoreDonutsProps,
};

export const ScoreLines: StoryObj<typeof defaultScoreLinesProps> = {
  render: ScoreLinesExample,
  argTypes: {
    value: { control: 'number' },
    segments: { control: 'number' },
    ...baseControls,
    color: colorControl,
    baseBgColor: baseBgColorControl,
  },
  args: defaultScoreLinesProps,
};

export const TrendBars: StoryObj<typeof defaultTrendBarsProps> = {
  render: TrendBarsExample,
  argTypes: {
    ...baseControls,
  },
  args: defaultTrendBarsProps,
};

export const TrendLines: StoryObj<typeof defaultTrendLinesProps> = {
  render: TrendLinesExample,
  argTypes: {
    chartType: {
      control: { type: 'select' },
      options: ['line', 'area'],
    },
    lastPointRadius: { control: 'number' },
    ...baseControls,
    lastPointColor: colorControl,
    color: colorControl,
  },
  args: defaultTrendLinesProps,
};

export const ScoreLineSegmenets: StoryObj<typeof defaultScoreLineSegmentsProps> = {
  render: ScoreLineSegments,
  argTypes: {
    value1: { control: 'number' },
    value2: { control: 'number' },
    ...baseControls,
    color1: { control: { type: 'select' }, options: chartPaletteOptions },
    color2: { control: { type: 'select' }, options: chartPaletteOptions },
    baseBgColor: baseBgColorControl,
  },
  args: defaultScoreLineSegmentsProps,
};
