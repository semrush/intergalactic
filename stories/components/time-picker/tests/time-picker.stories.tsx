import TimePicker from '@semcore/ui/time-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DifferentCasesExample, { defaultProps as baseExampleProps2 } from './examples/different_cases';
import InteractiveExamplesComponent, { defaultProps as interactiveExampleProps } from './examples/interactive_examples';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker/Tests',
  component: TimePicker,
};

export default meta;

export const DifferentCases: StoryObj<typeof baseExampleProps2> = {
  render: DifferentCasesExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
    is12Hour: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    value: {
      control: { type: 'text' },
      description: 'Time in the hh:mm format',
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Default value if `value` property is not provided',
    },
    step: {
      control: { type: 'number' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    locale: {
      control: 'select',
      options: ['en', 'ru', 'de', 'es', 'fr', 'ja', 'ko', 'zh'],
      description: 'Locale for i18n',
    },
  },
  args: baseExampleProps2,
};

export const InteractiveExamples: StoryObj<typeof interactiveExampleProps> = {
  render: InteractiveExamplesComponent,
  argTypes: {
    size: {
      control: 'select',
      options: ['m', 'l'],
      description: 'Control size',
    },
    is12Hour: {
      control: 'boolean',
      description: '12-hour time format',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    state: {
      control: 'select',
      options: ['normal', 'invalid', 'valid'],
      description: 'Component state',
    },
    step: {
      control: 'number',
      description: 'Step for dropdown values',
    },
    showOnChange: {
      control: 'boolean',
      description: 'Show controlled component example with onChange',
    },
    showValidation: {
      control: 'boolean',
      description: 'Show form validation example',
    },
  },
  args: interactiveExampleProps,
};
