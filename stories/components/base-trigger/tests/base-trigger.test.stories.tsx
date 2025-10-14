import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseTriggerExample from './examples/base-trigger-all-states';
import ButtonTriggerExample from './examples/button-trigger/neighbor-location';
import ButtonTriggerLoadingExample from './examples/button-trigger-loading';
import FilterTriggerExample from './examples/filter-trigger-all-states';
import LinkTriggerExample from './examples/link-trigger-all-states';
import LinkTriggerLoadingExample from './examples/link-trigger-loading';
import LinkTriggerSelectExample from './examples/link-trigger-with-select';

const meta: Meta = {
  title: 'Components/BaseTrigger/Test',
};

export const BaseTrigger: StoryObj = {
  render: BaseTriggerExample,
};

export const LinkTrigger: StoryObj = {
  render: LinkTriggerExample,
};

export const LinkTriggerLoading: StoryObj = {
  render: LinkTriggerLoadingExample,
};

export const LinkTriggerSelect: StoryObj = {
  render: LinkTriggerSelectExample,
};

export const ButtonTrigger: StoryObj = {
  render: ButtonTriggerExample,
};

export const FilterTrigger: StoryObj = {
  render: FilterTriggerExample,
};

export const ButtonTriggerLoading: StoryObj = {
  render: ButtonTriggerLoadingExample,
};

export default meta;
