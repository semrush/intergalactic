import type { Meta, StoryObj } from '@storybook/react-vite';

import PillsAdvancedExample, { defaultProps } from './examples/pills/pills';
import PillsAddonLogicExample from './examples/pills/pills-addon-logic';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Pills',
};

export const PillsAddonLogic: StoryObj = {
  render: PillsAddonLogicExample,
};

export const PillsAdvanced: StoryObj<typeof defaultProps> = {
  render: PillsAdvancedExample,
  argTypes: {
    firstPillText: { control: 'text' },
    secondPillText: { control: 'text' },
    thirdPillText: { control: 'text' },
    highlightedValue: {
      control: { type: 'select' },
      options: [1, 2, 3],
    },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    animatedSparkleCount: { control: 'number' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: defaultProps,
};

export default meta;
