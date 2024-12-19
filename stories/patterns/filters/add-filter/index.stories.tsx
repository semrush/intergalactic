import type { Meta, StoryObj } from '@storybook/react';
import AddFilterPatternExample from './examples/docs/add-filter';

const meta: Meta = {
  title: 'Patterns/Filters/AddFilter',
};

export default meta;

export const AddFilterPattern: StoryObj = {
  render: AddFilterPatternExample,
};
