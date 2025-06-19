import type { Meta, StoryObj } from '@storybook/react-vite';

import HeaderContentExample from './examples/header-tests/header-content';
import MultiLevelExample from './examples/header-tests/multi-level-header';
import MultiLevelStickyExample from './examples/header-tests/multi-level-header-sticky';
import MultiLevelSortingExample from './examples/header-tests/multi-level-sorting';
import MultiLevelInteractiveExample from './examples/header-tests/multi-level-with-interactive';
import SecondaryHeaderExample from './examples/header-tests/secondary-header';
import SecondarySortingExample from './examples/header-tests/secondary-sorting';
import SortingSizeExample from './examples/header-tests/sorting-changing-size';
import SortingInteractiveHeaderExample from './examples/header-tests/sorting-with-interactive';
import InteractiveHeaderExample from './examples/header-tests/table-with-1tf-and diff-elements';

const meta: Meta = {
  title: 'Components/DataTable/Tests/Header',
};

export default meta;
type Story = StoryObj;

export const SecondaryHeader: Story = {
  render: SecondaryHeaderExample,
};

export const SortingInteractiveHeader: Story = {
  render: SortingInteractiveHeaderExample,
};

export const SortingSize: Story = {
  render: SortingSizeExample,
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
