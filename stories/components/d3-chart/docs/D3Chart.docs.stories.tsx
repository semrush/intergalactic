import type { Meta, StoryObj } from '@storybook/react';

import StackedGroupedBarExample from './examples/StacjedGroupedBar';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation',
};

export default meta;

export const StackedGroupedBar: StoryObj = {
  render: StackedGroupedBarExample,
};
