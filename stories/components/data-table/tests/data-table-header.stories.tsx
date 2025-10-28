import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseOneLevelHeaderExample, { baseDefaultProps } from './examples/header-tests/base-one-level-header-props';
import type { OneLevelHeaderBaseProps } from './examples/header-tests/base-one-level-header-props';
import HeaderContentExample from './examples/header-tests/header-content';
import MultiLevelExample from './examples/header-tests/multi-level-header';
import MultiLevelNonInteractivePropsExample, { multiLevelNonInteractiveProps } from './examples/header-tests/multi-level-header-non-interactive';
import type { MultiLevelNonInteractiveProps } from './examples/header-tests/multi-level-header-non-interactive';
import MultiLevelSortingExample from './examples/header-tests/multi-level-sorting';
import MultiLevelInteractiveExample from './examples/header-tests/multi-level-with-interactive';
import OneLevelSortingPropsExample, { oneLevelHeaderSortingProps } from './examples/header-tests/one-level-header-sorting-props';
import type { OneLevelHeaderSortingProps } from './examples/header-tests/one-level-header-sorting-props';
import SecondaryHeaderExample from './examples/header-tests/secondary-header';
import SecondarySortingExample from './examples/header-tests/secondary-sorting';
import SortingDefaultUndefinedExample from './examples/header-tests/sorting-default-undefined';
import SortingInteractiveHeaderExample from './examples/header-tests/sorting-with-interactive';
import InteractiveHeaderExample from './examples/header-tests/table-with-1tf-and diff-elements';

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

export const SecondaryHeader: Story = {
  render: SecondaryHeaderExample,
};

export const SortingDefaultUndefined: Story = {
  render: SortingDefaultUndefinedExample,
};

export const SortingInteractiveHeader: Story = {
  render: SortingInteractiveHeaderExample,
};

export const OneLevelSortingProps: StoryObj<OneLevelHeaderSortingProps> = {
  render: OneLevelSortingPropsExample,
  args: {
    ...oneLevelHeaderSortingProps,
  },
};

export const MultiLevelNonInteractivePropsStory: StoryObj<MultiLevelNonInteractiveProps> = {
  render: MultiLevelNonInteractivePropsExample,
  args: {
    ...multiLevelNonInteractiveProps,
  },
};

export const MultiLevelInteractive: Story = {
  render: MultiLevelInteractiveExample,
};

export const SecondarySorting: Story = {
  render: SecondarySortingExample,
};

export const InteractiveHeader: Story = {
  render: InteractiveHeaderExample,
};

export const HeaderContent: Story = {
  render: HeaderContentExample,
};

export const MultiLevelSorting: Story = {
  render: MultiLevelSortingExample,
};

export const MultiLevelBorders: Story = {
  render: MultiLevelExample,
};
