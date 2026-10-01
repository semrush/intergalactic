import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/line-chart/basic-usage';
import HiddenHoverPropExample from './examples/line-chart/disable-hover-line';
import LineAreWithEmptyExample from './examples/line-chart/line-area-with-empty';
import LinesExample from './examples/line-chart/lines';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Line-Chart',
};

export default meta;

export const HiddenHoverProp: StoryObj = {
  render: HiddenHoverPropExample,
};

export const LineAreWithEmpty: StoryObj = {
  render: LineAreWithEmptyExample,
};

export const Lines: StoryObj = {
  render: LinesExample,
};

/**
 * Knobs that belong to the story, not to `LineChart`. They reshape the dataset or pick a
 * value the component takes as data rather than as a prop, so they are grouped apart in the
 * controls panel — mixed in with the real props they read as API that does not exist.
 */
const storyKnob = { table: { category: 'Story data knobs' } } as const;

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    aspect: { control: { type: 'number', min: 0, max: 2, step: 0.1 } },
    hMin: { control: { type: 'number', min: 0, max: 600, step: 10 } },
    hMax: { control: { type: 'number', min: 0, max: 600, step: 10 } },
    showDots: { control: 'boolean' },

    useExplicitPlotWidth: { control: 'boolean', ...storyKnob },
    highlightDots: {
      control: 'select',
      options: ['none', 'good', 'bad', 'insightful', 'mixed'],
      ...storyKnob,
    },
    dataType: {
      control: 'select',
      options: ['none', 'forecast', 'potential', 'both'],
      ...storyKnob,
    },
    withInterpolatedGaps: { control: 'boolean', ...storyKnob },
    // Variants label the numeric group key. Date-shaped titles live in the Tooltip-Format story.
    titleFormat: { control: 'select', options: ['off', 'point', 'week', 'padded'], ...storyKnob },
    // Needs showDeltaPercentInTooltip to be on.
    deltaOverride: {
      control: 'select',
      options: ['off', 'custom', 'divideByZero', 'includesFirstPoint'],
      ...storyKnob,
    },
  }),
  args: BasicUsageProps,
};
