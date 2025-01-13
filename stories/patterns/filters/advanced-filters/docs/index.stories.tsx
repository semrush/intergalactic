import type { Meta, StoryObj } from '@storybook/react';

import FiltersWithConditionsEx from './examples/filters-with-filter-conditions';

import { AdvancedFiltersTest } from './__tests__/filters-with-filter-conditions.test';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/FiltersWithConditions',
};

export default meta;

export const FiltersWithConditions: StoryObj = {
  render: FiltersWithConditionsEx,
  play: playWrapper(AdvancedFiltersTest),
};
