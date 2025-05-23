import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Counter from '@semcore/counter';

import AnimatedNumberExample from './examples/animated_number';
import CounterAndTypographyExample from './examples/counter_and_typography';
import CounterInButtonExample from './examples/counter_in_button';
import CounterInDotExample from './examples/counter_in_dot';
import CounterInFiltersExample from './examples/counter_in_filters';
import CounterInFormsExample from './examples/counter_in_forms';
import CounterInLimitsExample from './examples/counter_in_limits';
import CounterInPillsExample from './examples/counter_in_pills';

import { CounterInFiltersTest } from './__tests__/counter_in_filters.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter/Documentation',
  component: Counter,
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const AnimatedNumber: Story = {
  render: AnimatedNumberExample,
};

export const CounterAndTypography: Story = {
  render: CounterAndTypographyExample,
};

export const CounterInButton: Story = {
  render: CounterInButtonExample,
};

export const CounterInDot: Story = {
  render: CounterInDotExample,
};

export const CounterInFilters: Story = {
  render: CounterInFiltersExample,
  play: playWrapper(CounterInFiltersTest),
};

export const CounterInForms: Story = {
  render: CounterInFormsExample,
};

export const CounterInLimits: Story = {
  render: CounterInLimitsExample,
};

export const CounterInPills: Story = {
  render: CounterInPillsExample,
};
