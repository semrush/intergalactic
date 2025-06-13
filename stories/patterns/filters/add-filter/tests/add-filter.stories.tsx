import type { Meta, StoryObj } from '@storybook/react-vite';

import ControlledByButtonExample from './examples/controlled-by-button';

const meta: Meta = {
  title: 'Patterns/Filters/AddFilter/Tests',
};

export default meta;

export const ControlledByButton: StoryObj = {
  render: ControlledByButtonExample,
};
