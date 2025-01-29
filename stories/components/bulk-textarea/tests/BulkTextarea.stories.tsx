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
    maxLines: 30,
    size: 'm',
    linesDelimiters: [','],
    readonly: false,
    disabled: false,
    placeholder: 'Placeholder',
    minRows: 2,
    maxRows: 10,
    validateOn: [
      // 'blur',
      'blurLine',
    ],
    pasteProps: {
      delimiter: '\n',
      skipEmptyLines: true,
      lineProcessing: (line: string) => {
        return line.replace(/http:\/\//, '');
      },
    },
    lineProcessing: (line: string) => {
      return line.replace(/http:\/\//, '');
    },
  },
  render: BaseExample,
};
