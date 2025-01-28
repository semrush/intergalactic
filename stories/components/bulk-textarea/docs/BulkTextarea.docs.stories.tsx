import type { Meta, StoryObj } from '@storybook/react';

import BulkTextarea from '@semcore/bulk-textarea';

import UsageExample from './examples/BaseExample';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Documentation',
  component: BulkTextarea,
};

export default meta;

export const BasicUsage: StoryObj<typeof BulkTextarea> = {
  render: UsageExample,
};
