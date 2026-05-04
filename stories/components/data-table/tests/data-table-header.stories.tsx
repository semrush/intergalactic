import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseOneLevelHeaderExample, { baseDefaultProps } from './examples/header-tests/base-one-level-header-props';
import type { OneLevelHeaderBaseProps } from './examples/header-tests/base-one-level-header-props';
import LongHeaderEllipsisExample, { longHeaderEllipsisProps } from './examples/header-tests/long-header-ellipsis';
import type { LongHeaderEllipsisProps } from './examples/header-tests/long-header-ellipsis';
import MultiLevelBodersExample from './examples/header-tests/multi-level-borders';
import MultiLevelNonInteractivePropsExample, {
  multiLevelNonInteractiveProps,
} from './examples/header-tests/multi-level-header-non-interactive';
import type { MultiLevelNonInteractiveProps } from './examples/header-tests/multi-level-header-non-interactive';
import MultiLevelInteractivePropsExample, {
  multiLevelInteractiveProps,
} from './examples/header-tests/multi-level-with-interactive';
import type { MultiLevelInteractiveProps } from './examples/header-tests/multi-level-with-interactive';
import OneLevelInteractiveHeaderExample, { oneLevelInteractiveExampleProps } from './examples/header-tests/one-level-interactive-header';
import type { OneLevelInteractiveExampleProps } from './examples/header-tests/one-level-interactive-header';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Header',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const BaseOneLevelHeader: StoryObj<OneLevelHeaderBaseProps> = {
  render: BaseOneLevelHeaderExample,
  args: {
    ...baseDefaultProps,
  },
};

export const OneLevelInteractiveHeader: StoryObj<OneLevelInteractiveExampleProps> = {
  render: OneLevelInteractiveHeaderExample,
  args: {
    ...oneLevelInteractiveExampleProps,
  },
};

export const MultiLevelNonInteractivePropsStory: StoryObj<MultiLevelNonInteractiveProps> = {
  render: MultiLevelNonInteractivePropsExample,
  args: {
    ...multiLevelNonInteractiveProps,
  },
};

export const MultiLevelInteractivePropsStory: StoryObj<MultiLevelInteractiveProps> = {
  render: MultiLevelInteractivePropsExample,
  args: {
    ...multiLevelInteractiveProps,
    sideIndents: 'wide',
  },
};

export const LongHeaderEllipsis: StoryObj<LongHeaderEllipsisProps> = {
  render: LongHeaderEllipsisExample,
  args: {
    ...longHeaderEllipsisProps,
    sideIndents: 'wide',
  },
};

export const MultiLevelBorders: Story = {
  render: MultiLevelBodersExample,
};
