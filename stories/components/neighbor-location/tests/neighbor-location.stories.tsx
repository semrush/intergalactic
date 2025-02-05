import type { Meta, StoryObj } from '@storybook/react';

import WrappingTestExample from './examples/wraping-test-combination';

const meta: Meta = {
  title: 'Components/NeighborLocation/Tests',
};

export default meta;

export const WrappingTest: StoryObj = {
  render: WrappingTestExample,
};
