import type { Meta, StoryObj } from '@storybook/react';

import BaseTriggerExample from './examples/base-trigger';
import LinkTriggerAndEllipsisExample from './examples/LinkTriggerAndEllipsis';

const meta: Meta = {
  title: 'Components/BaseTrigger/Advanced',
};

export const BaseTrigger : StoryObj  = {
  render: BaseTriggerExample,
};

export const LinkTriggerAndEllipsis : StoryObj = {
  render: LinkTriggerAndEllipsisExample,
};

export default meta;
