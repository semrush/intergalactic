import type { Meta, StoryObj } from '@storybook/react-vite';

import PillsAddonLogicExample from './examples/pills/pills-addon-logic';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Feature Highlight/Tests/Pills',
};

export const PillsAddonLogic: StoryObj = {
  render: PillsAddonLogicExample,
};

export default meta;
