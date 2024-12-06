import type { Meta, StoryObj } from '@storybook/react';
import FiltersWithConditionsEx from './examples/docs/filters-with-filter-conditions';

const meta: Meta = {
  title: 'Patterns/Filters/FiltersWithConditions',
};

export default meta;

export const FiltersWithConditions: StoryObj = {
  render: FiltersWithConditionsEx,
};
