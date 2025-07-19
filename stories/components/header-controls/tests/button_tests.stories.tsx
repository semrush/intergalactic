import type { Meta, StoryObj } from '@storybook/react-vite';

import HeaderControlsExample from './examples/header-controls';

const meta: Meta = {
  title: 'Components/Header controls/Tests',
};

export default meta;
type Story = StoryObj;

export const HeaderControls: Story = {
  render: HeaderControlsExample,
};
