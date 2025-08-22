import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';
import PlacementExample from './examples/placement';
import TimeoutExample from './examples/timeout';

const meta: Meta = {
  title: 'Components/Base-Components/Hint/Docs',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const Placement: StoryObj = {
  render: PlacementExample,
};

export const Timeout: StoryObj = {
  render: TimeoutExample,
};

export default meta;
