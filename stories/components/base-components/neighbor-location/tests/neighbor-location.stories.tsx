import type { Meta, StoryObj } from '@storybook/react-vite';

import WrappingTestExample, { defaultWrappingTestProps } from './examples/wraping-test-combination';

const meta: Meta = {
  title: 'Components/Base Components/NeighborLocation/Tests',
};

export default meta;

export const WrappingTest: StoryObj<typeof defaultWrappingTestProps> = {
  render: WrappingTestExample,
  argTypes: {
    size: { control: { type: 'select' }, options: ['m', 'l'] },
  },
  args: defaultWrappingTestProps,
};
