import type { Meta } from '@storybook/react';

import BaseTriggerExample from './examples/base-trigger';
import LinkTriggerAndEllipsisExample from './examples/LinkTriggerAndEllipsis';

const meta: Meta<typeof BaseTrigger> = {
  title: 'Components/BaseTrigger/Advanced',
};

export const BaseTrigger = {
  render: BaseTriggerExample,
};

export const LinkTriggerAndEllipsis = {
  render: LinkTriggerAndEllipsisExample,
};

export default meta;
