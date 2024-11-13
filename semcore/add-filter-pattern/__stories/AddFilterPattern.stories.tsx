import AddFilterPattern from '@semcore/add-filter-pattern';
import type { Meta, StoryObj } from '@storybook/react';
import { AddFilterPatternBasicExample } from './examples/add-filter-pattern-basic-example';

const meta: Meta<typeof AddFilterPattern> = {
  title: 'Components/AddFilterPattern',
  component: AddFilterPattern,
};

export default meta;
type Story = StoryObj<typeof AddFilterPattern>;

export const AddFilterPatternExample: Story = {
  render: AddFilterPatternBasicExample,
};
