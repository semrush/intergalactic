import BulkTextarea from '@semcore/ui/bulk-textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicPropsExample, { defaultBulkTextareaProps } from './examples/basic-props';
import BlurLineExample from './examples/blurLine-base-example';
import ControlledAndNotControlledErrorsExample, { defaultProps as controlledAndNotControlledProps } from './examples/controlled-and-not-controlled-errors';
import ControlledErrorsExample from './examples/controlled-errors';
import EmptyValueInPasteExample from './examples/empty-value-in-paste';
import EncodeOnchangeArrayExample from './examples/encode-onchange-array';
import LinesAndIndexInPastePropsExample from './examples/lines-and-index-in-paste';
import OnSubmitExample from './examples/on-submit-example';
import WithNewValueOnHandleChangeExample from './examples/with-new-value-on-handleChange';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Tests',
  component: BulkTextarea,
};
export default meta;

const sharedArgTypes = {
  size: { control: { type: 'select' }, options: ['m', 'l'] },
  state: { control: { type: 'select' }, options: ['normal', 'valid', 'invalid'] },
  showErrors: { control: { type: 'boolean' } },
  readonly: { control: { type: 'boolean' } },
  disabled: { control: { type: 'boolean' } },
  maxLines: { control: { type: 'number' } },
  minRows: { control: { type: 'number' } },
  maxRows: { control: { type: 'number' } },
  placeholder: { control: { type: 'text' } },
  autoFocus: { control: { type: 'boolean' } },
  w: { control: { type: 'number' } },
  validateOn: {
    control: { type: 'check' },
    options: ['blur', 'blurLine', 'paste'],
  },
} as const;

export const BasicProps: StoryObj = {
  render: BasicPropsExample,
  argTypes: sharedArgTypes,
  args: defaultBulkTextareaProps,
};

export const ControlledErrors: StoryObj = {
  render: ControlledErrorsExample,
};

export const ControlledAndNotControlledErrors: StoryObj = {
  render: ControlledAndNotControlledErrorsExample,
  argTypes: sharedArgTypes,
  args: controlledAndNotControlledProps,
};

export const EncodeOnchangeArray: StoryObj = {
  render: EncodeOnchangeArrayExample,
};

export const EmptyValueInPaste: StoryObj = {
  render: EmptyValueInPasteExample,
};

export const LinesAndIndexInPasteProps: StoryObj = {
  render: LinesAndIndexInPastePropsExample,
};

export const WithNewValueOnHandleChange: StoryObj = {
  render: WithNewValueOnHandleChangeExample,
};

const sharedPasteProps = {
  lineProcessing: (line: string) => line.replace(/http:\/\//, ''),
};

export const OnSubmit: StoryObj = {
  args: {
    maxLines: 30,
    size: 'm',
    linesDelimiters: [','],
    readonly: false,
    disabled: false,
    placeholder: 'Placeholder',
    minRows: 2,
    maxRows: 10,
    validateOn: ['blurLine'],
    pasteProps: {
      delimiter: /[\n,]/,
      skipEmptyLines: false,
      ...sharedPasteProps,
    },
    ...sharedPasteProps,
  },
  render: OnSubmitExample,
} as const;

export const BlurLine: StoryObj = {
  args: {
    maxLines: 30,
    size: 'l',
    linesDelimiters: [','],
    readonly: false,
    disabled: false,
    placeholder: 'Placeholder',
    minRows: 2,
    maxRows: 10,
    validateOn: ['blurLine'],
    pasteProps: {
      delimiter: '\n',
      skipEmptyLines: true,
      ...sharedPasteProps,
    },
    ...sharedPasteProps,
  },
  render: BlurLineExample,
};
