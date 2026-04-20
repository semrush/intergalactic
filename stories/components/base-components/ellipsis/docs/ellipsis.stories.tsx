import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic_usage';
import FilterTriggerExample from './examples/filter-trigger';
import MultipleUseExample from './examples/multiple_use';
import NoHintWithMultilineExample from './examples/no_hint_with_multiline';
import WithRequiredLastSymbolsExample from './examples/with_required_last_symbols';
import WithSearchSelectionExample from './examples/with_search_selection';

const meta: Meta = {
  title: 'Components/Base Components/Ellipsis/Docs',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const MultipleUse: StoryObj = {
  render: MultipleUseExample,
};

export const FilterTrigger: StoryObj = {
  render: FilterTriggerExample,
};

export const NoHintWithMultiline: StoryObj = {
  render: NoHintWithMultilineExample,
};

export const WithSearchSelection: StoryObj = {
  render: WithSearchSelectionExample,
};

export const WithRequiredLastSymbols: StoryObj = {
  render: WithRequiredLastSymbolsExample,
};

export default meta;
