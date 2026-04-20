import Radio from '@semcore/ui/radio';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AdditionalPropsInputExample, { defaultAdditionalInputProps } from './examples/additional_props_for_input';
import RadioGroupExampleExample, { defaultProps } from './examples/radiogroup_example';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio/Documentation',
  component: Radio,
};

export default meta;

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  theme: {
    control: { type: 'select' },
    options: ['yellow-400', 'blue-400'],
  },
  disabled: {
    control: { type: 'boolean' },
  },
} as const;

export const RadioGroupExample: StoryObj<typeof defaultProps> = {
  render: RadioGroupExampleExample,
  argTypes: commonArgTypes,
  args: defaultProps,
};

export const AdditionalPropsInput: StoryObj<typeof defaultAdditionalInputProps> = {
  render: AdditionalPropsInputExample,
  argTypes: commonArgTypes,
  args: defaultAdditionalInputProps,
};
