import type { Meta, StoryObj } from '@storybook/react';
import AddFilterExample from './examples/add-filter';

const meta: Meta = {
  title: 'Patterns/Filters/AddFilter/Advanced',
};

export default meta;

export const AddFilter: StoryObj = {
  render: AddFilterExample,
};
