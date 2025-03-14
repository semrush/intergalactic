import type { Meta, StoryObj } from '@storybook/react';

import SerpFilterExample from './examples/serp-filter';
import { SerpFilterTest } from './__tests__/serp-filter.test';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/SerpFeatures',
};

export default meta;

export const SerpFilter: StoryObj = {
  render: SerpFilterExample,
  play: playWrapper(SerpFilterTest),
};
