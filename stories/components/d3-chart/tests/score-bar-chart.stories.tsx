import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/score-bar-chart/basic-usage';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Score-Bar-Chart',
};
export default meta;

/**
 * Knobs that belong to the story, not to `ScoreBarChart`: they swap the data or pick a
 * ready function for a function prop.
 */
const storyKnob = { table: { category: 'Story data knobs' } } as const;

export const BasicUsage: StoryObj<typeof BasicUsageExample> = {
  render: BasicUsageExample,
  argTypes: {
    mode: { control: 'select', options: ['default', 'compact'] },
    // Unset = sum of all values.
    totalValue: { control: 'number' },
    showTooltip: { control: 'boolean' },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    locale: { control: 'select', options: ['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'sv', 'tr', 'vi', 'zh', 'uk'] },
    colorMapVariant: { control: 'select', options: ['none', 'custom'], ...storyKnob },
    valueFormat: { control: 'select', options: ['default', 'currency', 'thousands'], ...storyKnob },
    titleFormat: { control: 'select', options: ['default', 'uppercase'], ...storyKnob },
    // Adds `href` to every item.
    withLinks: { control: 'boolean', ...storyKnob },
    // Value of the first row, `Schema.org (Microdata)`. With `totalValue` below a row value the
    // percent goes above 100; a negative value gives a negative percent.
    firstItemValue: { control: 'number', ...storyKnob },
    // Passes `onClickItem`; the last click is printed under the chart.
    clickable: { control: 'boolean', ...storyKnob },
  },
  args: BasicUsageProps,
};
