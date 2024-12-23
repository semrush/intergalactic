import type { Meta, StoryObj } from '@storybook/react';

import BulkTextarea from '@semcore/bulk-textarea';

import UsageExample from './examples/BaseExample';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Documentation',
  component: BulkTextarea,
};

export default meta;

export const BasicUsage: StoryObj<typeof BulkTextarea> = {
  args: {
    ofRows: 30,
    size: 'm',
    rowsDelimiters: [','],
    minRows: 2,
    maxRows: 10,
    validateOn: ['blur', 'enterNextRow'],
    pasteProps: {
      delimiter: '\n',
      skipEmptyRows: true,
    },
  },
  render: UsageExample,
};
