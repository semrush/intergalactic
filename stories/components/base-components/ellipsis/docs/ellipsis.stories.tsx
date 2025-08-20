import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';
import MultipleUseExample from './examples/multiple-use';
import UseEllipsisHookExample from './examples/use-ellipsis-hook';

const meta: Meta = {
  title: 'Components/Base-Components/Ellipsis/Docs',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const MultipleUse: StoryObj = {
  render: MultipleUseExample,
};

export const UseEllipsisHook: StoryObj = {
  render: UseEllipsisHookExample,
};

export default meta;
