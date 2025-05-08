import type { Meta, StoryObj } from '@storybook/react';

import BaseTriggerEllipsisExample from './examples/base-trigger-ellipsis';
import ButtonTriggerEllipsisExample from './examples/button-trigger-ellipsis';
import LinkTriggerAndEllipsisExample from './examples/link-trigger-ellipsis';

const meta: Meta = {
  title: 'Components/BaseTrigger/Advanced',
};


export const LinkTriggerAndEllipsis: StoryObj = {
  render: LinkTriggerAndEllipsisExample,
};

export const BaseTriggerEllipsis: StoryObj = {
  render: BaseTriggerEllipsisExample,
};

export const ButtonTriggerEllipsis: StoryObj = {
  render: ButtonTriggerEllipsisExample,
};

export default meta;
