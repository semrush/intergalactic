import type { Meta, StoryObj } from '@storybook/react';

import FilterKDPositionsVolumeExample from './examples/basic-example';

const meta: Meta = {
  title: 'Patterns/Filters/FilterKDPositionsVolume',
};

export default meta;

export const FilterKDPositionsVolume: StoryObj = {
  render: FilterKDPositionsVolumeExample,
};
