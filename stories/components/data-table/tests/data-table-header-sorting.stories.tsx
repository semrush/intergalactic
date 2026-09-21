import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import MultiLevelExample from './examples/header-tests/multi-level-borders';
import MultiLevelSortingExample, { multiLevelSortingProps } from './examples/header-tests/sorting/multi-level-sorting';
import type { MultiLevelSortingProps } from './examples/header-tests/sorting/multi-level-sorting';
import type { OneLevelHeaderSortingProps } from './examples/header-tests/sorting/one-level-header-sorting-props';
import OneLevelSortingPropsExample, {
  oneLevelHeaderSortingProps,
} from './examples/header-tests/sorting/one-level-header-sorting-props';
import SortingDefaultUndefinedExample from './examples/header-tests/sorting/sorting-default-undefined';
import SortingWithInteractiveExample from './examples/header-tests/sorting/sorting-with-interactive';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Header/Sorting',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const SortingDefaultUndefined: Story = {
  render: SortingDefaultUndefinedExample,
};

export const SortingWithInteractive: Story = {
  render: SortingWithInteractiveExample,
};

export const OneLevelSortingProps: StoryObj<OneLevelHeaderSortingProps> = {
  render: OneLevelSortingPropsExample,
  argTypes: {
    use: { control: 'inline-radio', options: ['primary', 'secondary'] },
    sideIndents: { control: 'inline-radio', options: [undefined, 'wide'] },
    compact: { control: 'boolean' },
    loading: { control: 'boolean' },
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    h: { control: 'text' },
    wMax: { control: 'text' },
    defaultGridTemplateColumnWidth: { control: 'select', options: ['auto', 'min-content', 'max-content', '100px', '150px', '200px', '1fr'] },
  },
  args: {
    ...oneLevelHeaderSortingProps,
    use: 'primary',
  },
};

export const MultiLevelSorting: StoryObj<MultiLevelSortingProps> = {
  render: MultiLevelSortingExample,
  args: {
    ...multiLevelSortingProps,
  },
};

export const MultiLevelBorders: Story = {
  render: MultiLevelExample,
};
