import type { BarChartProps } from '@semcore/ui/d3-chart';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BarPropsExample, { defaultProps as BarPropsDefaultProps } from './examples/bar-chart/bars-props';
import BasicUsageExample, { defaultProps as BasicUsageProps, categories } from './examples/bar-chart/basic-usage';
import { getChartArgTypes, referenceControls } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Chart',
};

export default meta;

export const BarProps: StoryObj = {
  render: BarPropsExample,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['#3498db', 'yellow'],
    },
    r: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    hMin: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    hide: { control: 'boolean' },
    transparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 0, max: 100, step: 1 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: BarPropsDefaultProps,
};

/**
 * Knobs that belong to the story, not to `BarChart`: they pick values the component takes
 * as data rather than as props.
 */
const storyKnob = { table: { category: 'Story data knobs' } } as const;
const referenceKnob = referenceControls.withReferenceLine.table;

/**
 * The reference line and area sit on the x scale: categories for a vertical chart,
 * numbers once `invertAxis` makes it horizontal. Each mode shows only its own knobs.
 */
const barReferenceControls = {
  ...referenceControls,
  referenceLineCategory: {
    control: 'select',
    options: categories,
    if: { arg: 'invertAxis', truthy: false },
    table: referenceKnob,
  },
  referenceLineValue: { control: 'number', if: { arg: 'invertAxis' }, table: referenceKnob },
  referenceAreaStartCategory: {
    control: 'select',
    options: categories,
    if: { arg: 'invertAxis', truthy: false },
    table: referenceKnob,
  },
  referenceAreaEndCategory: {
    control: 'select',
    options: categories,
    if: { arg: 'invertAxis', truthy: false },
    table: referenceKnob,
  },
  referenceAreaStart: { control: 'number', if: { arg: 'invertAxis' }, table: referenceKnob },
  referenceAreaEnd: { control: 'number', if: { arg: 'invertAxis' }, table: referenceKnob },
};

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    type: { control: 'select', options: ['stack', 'group'] },
    maxBarSize: { control: { type: 'number', min: 0, max: 100, step: 1 } },
    // Applied to Category 0–2; `mixed` is good / insightful / bad.
    highlightDots: {
      control: 'select',
      options: ['none', 'good', 'bad', 'insightful', 'mixed'],
      ...storyKnob,
    },
    // Applied to Category 3–4; `both` is forecast / potential.
    dataType: {
      control: 'select',
      options: ['none', 'forecast', 'potential', 'both'],
      ...storyKnob,
    },
    ...barReferenceControls,
  }),
  args: BasicUsageProps,
};
