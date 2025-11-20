import Radio, { RadioGroup } from '@semcore/ui/radio';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AdditionalPropsInputTooltipExample from './examples/additional_props_for_input_tooltip';
import RadioPropsExample, { defaultProps } from './examples/radio-props';
import RadioGroupStatesExample from './examples/radiogroup_different_states';
import WithLinkInTextExample from './examples/radiogroup_example_with_link';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio/Tests',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  theme: {
    control: { type: 'select' },
    options: ['yellow-400', 'blue-400'],
  },
  state: {
    control: { type: 'select' },
    options: ['normal', 'invalid'],
  },
  color: {
    control: { type: 'select' },
    options: ['text-critical'],
  },
  checked: {
    control: { type: 'boolean' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  value: {
    control: { type: 'text' },
  },
} as const;

export const RadioProps: StoryObj<typeof defaultProps> = {
  render: RadioPropsExample,
  argTypes: commonArgTypes,
  args: defaultProps,
};

export const AdditionalPropsInputTooltip: Story = {
  render: AdditionalPropsInputTooltipExample,
};

export const RadioGroupStates: Story = {
  render: RadioGroupStatesExample,
};

export const WithLinkInText: Story = {
  render: WithLinkInTextExample,
};
