import BulkTextarea from '@semcore/ui/bulk-textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Documentation',
  component: BulkTextarea,
};

export default meta;

export const BasicUsage: StoryObj<typeof BulkTextarea> = {
  render: BasicUsageExample,
};
