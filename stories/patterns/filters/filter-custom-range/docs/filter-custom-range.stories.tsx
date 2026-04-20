import type { Meta, StoryObj } from '@storybook/react-vite';

import { ClickPotentialCompetitiveDensityCPCTest } from './__tests__/filter-custom-range.test';
import FilterCustomRangeExample from './examples/basic-example';
import PresetsExample from './examples/presets';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/FilterCustomRange',
};

export default meta;

export const FilterCustomRange: StoryObj = {
  render: FilterCustomRangeExample,
  play: playWrapper(ClickPotentialCompetitiveDensityCPCTest),
};

export const FilterCustomRangePresets: StoryObj = {
  render: PresetsExample,
};
