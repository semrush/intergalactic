import type { Meta, StoryObj } from '@storybook/react-vite';

import type { defaultProps as BaseTriggerExampleProps } from './examples/base-trigger-ellipsis';
import BaseTriggerEllipsisExample from './examples/base-trigger-ellipsis';
import type { defaultProps as ButtonTriggerExampleProps } from './examples/button-trigger-ellipsis';
import ButtonTriggerEllipsisExample from './examples/button-trigger-ellipsis';
import type { defaultProps as FilterTriggerExampleProps } from './examples/filter-trigger-ellipsis';
import FilterTriggerEllipsisExample from './examples/filter-trigger-ellipsis';
import FilterTriggerSelectWithEllipsisExample from './examples/filter-trigger-select-with-ellipsis';
import FilterTriggerWithCounterExample from './examples/filter-trigger_with_counter';
import type { defaultProps as LinkTriggerExampleProps } from './examples/link-trigger-ellipsis';
import LinkTriggerEllipsisExample from './examples/link-trigger-ellipsis';

const meta: Meta = {
  title: 'Components/Base Trigger/Advanced',
};

const commonArgTypes = {
  hintProps: {
    control: 'select',
    options: ['default', 'false'],
    mapping: {
      default: undefined,
      false: false,
    },
  },
  hintPlacement: {
    control: { type: 'select' },
    options: ['top', 'bottom', 'left', 'right'],
  },
} as const;
export const LinkTriggerEllipsis: StoryObj<typeof LinkTriggerExampleProps> = {
  render: LinkTriggerEllipsisExample,
  argTypes: {
    ...commonArgTypes,
  },
};

export const BaseTriggerEllipsis: StoryObj<typeof BaseTriggerExampleProps> = {
  render: BaseTriggerEllipsisExample,
  argTypes: {
    ...commonArgTypes,
  },
};

export const FilterTriggerSelectWithEllipsis: StoryObj = {
  render: FilterTriggerSelectWithEllipsisExample,
};

export const ButtonTriggerEllipsis: StoryObj<typeof ButtonTriggerExampleProps> = {
  render: ButtonTriggerEllipsisExample,
  argTypes: {
    ...commonArgTypes,
  },
};

export const FilterTriggerEllipsis: StoryObj<typeof FilterTriggerExampleProps> = {
  render: FilterTriggerEllipsisExample,
  argTypes: {
    ...commonArgTypes,
  },
};

export const FilterTriggerWithCounter: StoryObj = {
  render: FilterTriggerWithCounterExample,
};

export default meta;
