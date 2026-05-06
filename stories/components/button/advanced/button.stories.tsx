import type { Meta, StoryObj } from '@storybook/react-vite';

import AllButtonsExample from './examples/all-buttons';

const meta: Meta = {
  title: 'Components/Button/Advanced',
};

export default meta;

export const AllButtons: StoryObj = {
  render: AllButtonsExample,
};
