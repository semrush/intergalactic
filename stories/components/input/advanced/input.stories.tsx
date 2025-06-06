import type { Meta, StoryObj } from '@storybook/react-vite';

import WithSubmitExample from './examples/input-with-submit';

const meta: Meta = {
  title: 'Components/Input/Advanced',
};

export default meta;
type Story = StoryObj;

export const WithSubmit: Story = {
  render: WithSubmitExample,
};
