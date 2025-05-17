
import type { Meta, StoryObj } from '@storybook/react';


import InteractiveHeaderExample from './examples/header-tests/table-with-1tf-and diff-elements';
import HeaderContentExample from './examples/header-tests/header-content';
import MultiLevelSortingExample from './examples/header-tests/multi-level-sorting';
import MultiLevelStickyExample from './examples/header-tests/multi-level-header-sticky';
import MultiLevelInteractiveExample from './examples/header-tests/multi-level-with-interactive';
import SecondarySortingExample from './examples/header-tests/secondary-sorting';
import SecondaryHeaderExample from './examples/header-tests/secondary-header';
import MultiLevelExample from './examples/header-tests/multi-level-header';


const meta: Meta = {
  title: 'Components/DataTable/Tests/Header',
};

export default meta;
type Story = StoryObj;

export const SecondaryHeader: Story = {
  render: SecondaryHeaderExample,
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

export const MultiLevelSticky: Story = {
  render: MultiLevelStickyExample,
};

export const MultiLevelBorders: Story = {
  render: MultiLevelExample,
};

