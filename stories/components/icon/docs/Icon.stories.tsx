import Icon from '@semcore/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

import InteractiveExample from './examples/interactive';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Documentation',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Interactive: Story = {
  render: InteractiveExample,
};
