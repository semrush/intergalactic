import type { Meta, StoryObj } from '@storybook/react-vite';

import SyncTooltipsExample from './examples/sync_tooltips';

const meta: Meta = {
  title: 'Components/d3Charts/Advanced/Sync tooltips',
};

export default meta;

export const SyncTooltips: StoryObj = {
  render: SyncTooltipsExample,
};
