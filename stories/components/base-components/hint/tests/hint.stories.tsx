import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import HintExample, { defaultProps } from './examples/base-example-props';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Base-Components/Hint/Tests',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Hint: StoryObj<typeof defaultProps> = {
  render: HintExample,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'left', 'right', 'bottom'],
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
