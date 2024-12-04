import type { Meta, StoryObj } from '@storybook/react';

import StackedGroupedBarExample from './examples/StackedGroupedBar';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/StackGroupBar',
};

export default meta;

export const StackedGroupedBar: StoryObj = {
  render: StackedGroupedBarExample,
};
