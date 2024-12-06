import type { Meta, StoryObj } from '@storybook/react';

import SerpFilterExample from './examples/serp-filter';

const meta: Meta = {
  title: 'Patterns/Filters/SerpFeatures',
};

export default meta;

export const SerpFilter: StoryObj = {
  render: SerpFilterExample,
};
