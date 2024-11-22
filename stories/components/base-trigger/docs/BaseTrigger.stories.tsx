import type { Meta, StoryObj } from '@storybook/react';

import BaseTrigger from '@semcore/base-trigger';
import LinkTriggerExample from './examples/linktrigger';

const meta: Meta<typeof LinkTrigger> = {
  title: 'Components/BaseTrigger/Documentation',
  component: BaseTrigger,
};

export default meta;
type Story = StoryObj<typeof BaseTrigger>;

export const LinkTrigger: Story = {
  render: LinkTriggerExample,
};