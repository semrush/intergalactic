import type { Meta, StoryObj } from '@storybook/react';

import { FilterKDPositionsVolumeTest } from './__tests__/filter-kd-positions-volume.test';
import FilterKDPositionsVolumeExample from './examples/basic-example';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/FilterKDPositionsVolume',
};

export default meta;

export const FilterKDPositionsVolume: StoryObj = {
  render: FilterKDPositionsVolumeExample,
  play: playWrapper(FilterKDPositionsVolumeTest),
};
