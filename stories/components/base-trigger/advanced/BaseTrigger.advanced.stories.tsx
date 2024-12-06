import type { Meta } from '@storybook/react';

import BaseTriggerExample from './examples/base-trigger';

const meta: Meta<typeof BaseTrigger> = {
  title: 'Components/BaseTrigger/Advanced',
};

export const BaseTrigger = {
  render: BaseTriggerExample,
};

export default meta;
