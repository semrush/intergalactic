import type { Meta, StoryObj } from '@storybook/react';

import BulkTextarea from '@semcore/bulk-textarea';

import SizesAndStatesExample from './examples/sizes-states';
import BaseExample from './examples/validate-blur-base-example';


const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Tests',
  component: BulkTextarea,
};

export default meta;

export const SizesAndStates: StoryObj<typeof BulkTextarea> = {
  render: SizesAndStatesExample,
};

export const BasicUsage: StoryObj<typeof BulkTextarea> = {
    args: {
        ofRows: 30,
        size: 'm',
        rowsDelimiters: [','],
        readonly: false,
        disabled: false,
        placeholder: 'Placeholder',
        minRows: 2,
        maxRows: 10,
        validateOn: [
          // 'blur',
          'blurRow',
        ],
        pasteProps: {
          delimiter: '\n',
          skipEmptyRows: true,
          rowProcessing: (row) => {
            return row.replace(/http:\/\//, '[]');
          },
        },
        rowProcessing: (row) => {
          return row.replace(/http:\/\//, '[]');
        },
      },
    render: BaseExample,
  };
  