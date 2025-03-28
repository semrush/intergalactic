import type { Meta, StoryObj } from '@storybook/react';

import BaseTriggerExample from './examples/base-trigger-all-states';
import LinkTriggerExample from './examples/link-trigger-all-states';
import LinkTriggerLoadingExample from './examples/link-trigger-loading';
import ButtonTriggerExample from './examples/button-trigger-all-states';
import ButtonTriggerLoadingExample from './examples/button-trigger-loading';
import FilterTriggerExample from './examples/filter-trigger-all-states';

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
