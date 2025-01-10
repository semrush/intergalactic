import type { Meta, StoryObj } from '@storybook/react';
import AddFilterExample from './examples/add-filter';
import AddFilterComplexSelectsExample from './examples/add-filter-complex-selects';

const meta: Meta = {
  title: 'Patterns/Filters/AddFilter/Advanced',
};

export default meta;

export const AddFilter: StoryObj = {
  render: AddFilterExample,
};

export const AddFilterComplexSelects: StoryObj = {
  render: AddFilterComplexSelectsExample,
};
