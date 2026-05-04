import type { Meta, StoryObj } from '@storybook/react-vite';

import AllComponentsExample from './all-components';

const meta: Meta = {
  title: 'Patterns/Core/Advanced',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {
  render: AllComponentsExample,
  parameters: {
    layout: 'fullscreen',
  },
};
