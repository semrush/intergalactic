import Slider from '@semcore/ui/slider';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicPropsExample, { defaultProps } from './examples/basic_usage';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Tests',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const BasicProps: StoryObj<typeof defaultProps> = {
  args: defaultProps,
  argTypes: {
    value: {
      control: { type: 'number' },
    },
    defaultValue: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showKnob: {
      control: { type: 'boolean' },
    },
    showBar: {
      control: { type: 'boolean' },
    },
  },
  render: BasicPropsExample,
};
