import type { Meta, StoryObj } from '@storybook/react';

import BulkTextarea from '@semcore/bulk-textarea';

import SizesAndStatesExample from './examples/sizes-states';
import ValidationBlurExample from './examples/validate-blur-base-example';
import NoCommonErrorBlurLineExample from './examples/no-common-error-blur-line';
import ValidationBlurLineExample from './examples/validate-blurRow-base-example';
import WithNewValueOnHandleChangeExample from './examples/with-new-value-on-handleChange';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Tests',
  component: BulkTextarea,
};

export default meta;

export const NoCommonErrorBlur: StoryObj<typeof BulkTextarea> = {
  render: NoCommonErrorBlurLineExample,
};

export const SizesAndStates: StoryObj<typeof BulkTextarea> = {
  render: SizesAndStatesExample,
};

export const WithNewValueOnHandleChange: StoryObj<typeof BulkTextarea> = {
  render: WithNewValueOnHandleChangeExample,
};

export const ValidationBlur: StoryObj<typeof BulkTextarea> = {
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
      delimiter: /[\n,]/,
      skipEmptyLines: false,
      lineProcessing: (line: string) => {
        return line.replace(/http:\/\//, '');
      },
    },
    lineProcessing: (line: string) => {
      return line.replace(/http:\/\//, '');
    },
  },
  render: ValidationBlurExample,
};

export const ValidationBlurLine: StoryObj<typeof BulkTextarea> = {
  args: {
    maxLines: 30,
    size: 'l',
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
  render: ValidationBlurLineExample,
};
