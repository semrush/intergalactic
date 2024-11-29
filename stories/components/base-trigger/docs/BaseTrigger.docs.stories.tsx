import type { Meta } from '@storybook/react';

import LinkTriggerExample from './examples/linktrigger';

const meta: Meta<typeof LinkTrigger> = {
  title: 'Components/BaseTrigger/Documentation',
};

// const meta: Meta<typeof BaseTriggerExample> = {
//   title: 'Components/BaseTrigger/Documentation'
// };

export const LinkTrigger = {
  render: LinkTriggerExample,
};

export default meta;
