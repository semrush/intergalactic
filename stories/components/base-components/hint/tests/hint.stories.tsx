import type { Meta, StoryObj } from '@storybook/react-vite';

import HintExample, { defaultProps } from './examples/base-example-props';

const meta: Meta = {
  title: 'Components/Base Components/Hint/Tests',
};

export default meta;

export const Hint: StoryObj<typeof defaultProps> = {
  render: HintExample,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end'],
    },
    timeout: {
      control: { type: 'number' },
    },
    visible: {
      control: { type: 'boolean' },
    },
    defaultVisible: {
      control: { type: 'boolean' },
    },
  },
  args: defaultProps,
};
