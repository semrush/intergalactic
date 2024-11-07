import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '../src';

import { SingletonWithTooltip } from './examples/tooltip-in-select';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Singleton: Story = {
  render: SingletonWithTooltip,
};
