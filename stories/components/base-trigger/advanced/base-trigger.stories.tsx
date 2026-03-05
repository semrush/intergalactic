import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseTriggerEllipsisExample from './examples/base-trigger-ellipsis';
import ButtonTriggerEllipsisExample from './examples/button-trigger-ellipsis';
import FilterTriggerEllipsisExample from './examples/filter-trigger-ellipsis';
import FilterTriggerSelectWithEllipsisExample from './examples/filter-trigger-select-with-ellipsis';
import FilterTriggerWithCounterExample from './examples/filter-trigger_with_counter';
import LinkTriggerAndEllipsisExample from './examples/link-trigger-ellipsis';

const meta: Meta = {
  title: 'Components/Base Trigger/Advanced',
};

export const LinkTriggerAndEllipsis: StoryObj = {
  render: LinkTriggerAndEllipsisExample,
};

export const BaseTriggerEllipsis: StoryObj = {
  render: BaseTriggerEllipsisExample,
};

export const FilterTriggerSelectWithEllipsis: StoryObj = {
  render: FilterTriggerSelectWithEllipsisExample,
};

export const ButtonTriggerEllipsis: StoryObj = {
  render: ButtonTriggerEllipsisExample,
};

export const FilterTriggerEllipsis: StoryObj = {
  render: FilterTriggerEllipsisExample,
};

export const FilterTriggerWithCounter: StoryObj = {
  render: FilterTriggerWithCounterExample,
};

export default meta;
