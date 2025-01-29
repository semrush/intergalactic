import type { Meta, StoryObj } from '@storybook/react';

import BulkTextarea from '@semcore/bulk-textarea';

import BasicUsageExample from './examples/basic-usage';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Documentation',
  component: BulkTextarea,
};

export default meta;

export const BasicUsage: StoryObj<typeof BulkTextarea> = {
  render: BasicUsageExample,
};
