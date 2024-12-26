import type { Meta, StoryObj } from '@storybook/react';
import AddFilterExample from './examples/add-filter';
import AddFilterDropdownsAndSelectsExample from './examples/add-filter-dropdown-and-selects';

const meta: Meta = {
  title: 'Patterns/Filters/AddFilter/Advanced',
};

export default meta;

export const AddFilter: StoryObj = {
  render: AddFilterExample,
};

export const AddFilterDropdownsAndSelects: StoryObj = {
  render: AddFilterDropdownsAndSelectsExample,
};
