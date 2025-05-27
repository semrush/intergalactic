import type { Meta, StoryObj } from '@storybook/react';

import Flags from '@semcore/flags';

import BasicExample from './examples/basic';
import AriaLabelExample from './examples/aria-label';

const meta: Meta<typeof Flags> = {
  title: 'Components/Flags/Documentation',
  component: Flags,
};

export default meta;
type Story = StoryObj<typeof Flags>;

export const Basic: Story = {
  render: BasicExample,
};

export const AriaLabel: Story = {
  render: AriaLabelExample,
};
