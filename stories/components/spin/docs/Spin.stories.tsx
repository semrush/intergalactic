import type { Meta, StoryObj } from '@storybook/react';
import Spin from '@semcore/spin';

import BasicExample from './examples/basic_example';

const meta: Meta<typeof Spin> = {
  title: 'Components/Spin/Documentation',
  component: Spin,
};

export default meta;
type Story = StoryObj<typeof Spin>;

export const Basic: Story = {
  render: BasicExample,
};
