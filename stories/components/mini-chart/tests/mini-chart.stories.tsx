import type { Meta, StoryObj } from '@storybook/react-vite';

import ScoreDonutsExample from './examples/score-donuts';
import type { scoreDonutsProps } from './examples/score-donuts';
import ScoreLineSegments from './examples/score-line-segments';
import type { scoreLineProps } from './examples/score-line-segments';
import ScoreLinesExample from './examples/score-lines';
import type { scoreLinesProps } from './examples/score-lines';
import TrendBarsExample from './examples/trend-bars';
import type { trendBarsProps } from './examples/trend-bars';
import TrendLinesExample from './examples/trend-lines';
import type { trendLinesProps } from './examples/trend-lines';

const meta: Meta = {
  title: 'Components/MiniChart/Tests',
};

export default meta;

export const ScoreDonuts: StoryObj<scoreDonutsProps> = {
  render: ScoreDonutsExample,
  argTypes: {
    value: { control: 'number' },
    loading: { control: 'boolean' },
    animate: { control: 'boolean' },
    color: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
    baseBgColor: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
  },
};

export const ScoreLines: StoryObj<scoreLinesProps> = {
  render: ScoreLinesExample,
  argTypes: {
    value: { control: 'number' },
    segments: { control: 'number' },
    loading: { control: 'boolean' },
    animate: { control: 'boolean' },
    color: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
    baseBgColor: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
  },
};

export const TrendBars: StoryObj<trendBarsProps> = {
  render: TrendBarsExample,
  argTypes: {
    loading: { control: 'boolean' },
    animate: { control: 'boolean' },
  },
};

export const TrendLines: StoryObj<trendLinesProps> = {
  render: TrendLinesExample,
  argTypes: {
    lastPointRadius: { control: 'number' },
    loading: { control: 'boolean' },
    animate: { control: 'boolean' },
    lastPointColor: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
  },
};

export const ScoreLineSegmenets: StoryObj<scoreLineProps> = {
  render: ScoreLineSegments,
  argTypes: {
    value1: { control: 'number' },
    value2: { control: 'number' },
    loading: { control: 'boolean' },
    animate: { control: 'boolean' },
    color1: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
    color2: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
    baseBgColor: {
      control: { type: 'select' },
      options: [
        'chart-palette-order-2',
        'chart-palette-order-3',
        'chart-palette-order-4',
        'chart-palette-order-5',
        'chart-palette-order-6',
        'chart-palette-order-7',
        'chart-palette-order-8',
        'chart-palette-order-9',
        'chart-palette-order-10',
        'chart-palette-order-11',
        'chart-palette-order-12',
        'chart-palette-order-13',
        'chart-palette-order-14',
        'chart-palette-order-15',
        'chart-palette-order-16',
      ],
    },
  },
};
