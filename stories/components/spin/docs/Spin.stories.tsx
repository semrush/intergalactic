import type { Meta, StoryObj } from '@storybook/react';
import Spin from '@semcore/spin';

import BasicExample from './examples/basic_example';

const meta: Meta<typeof BasicExample> = {
  title: 'Components/Spin/Documentation',
  component: BasicExample,
};

export default meta;
type Story = StoryObj<typeof BasicExample>;

export const Basic: Story = {
  render: BasicExample,
};

