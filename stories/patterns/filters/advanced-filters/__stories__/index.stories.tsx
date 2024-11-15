import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


import FiltersWithConditionsEx from './docs-examples/filters-with-filter-conditions';

const meta: Meta = {
  title: 'Patterns/Filters/FiltersWithConditions',
};

export default meta;

export const FiltersWithConditions: StoryObj = {
  render: FiltersWithConditionsEx
};
