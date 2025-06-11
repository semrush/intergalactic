import type { Meta, StoryObj } from '@storybook/react-vite';

import AddFilterExample from './examples/add-filter';
import AddFilterComplexSelectsExample from './examples/add-filter-complex-selects';
import ControlledAddFilterExample from './examples/controlled_add_filter';

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

export const ControlledAddFilter: StoryObj = {
  render: ControlledAddFilterExample,
};
