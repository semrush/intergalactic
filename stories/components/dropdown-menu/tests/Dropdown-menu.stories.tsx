import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

import WidthExample from './examples/dd-width';
import WithDividerExample from './examples/dd-with-divider';
import DropdownBasePropsExample, { defaultDropDownPropsExample } from './examples/dropdown-base-props';
import ListItemsTypeExample from './examples/list_item_types';
import OnVisibleExample from './examples/on-visible';
import OnVisible2ndExample from './examples/on-visible-2nd';
import SizesMultiselectExample from './examples/sizes-multiselect';
import SizesSelectableExample from './examples/sizes-selectable';
import WithFocusableTriggerExample from './examples/with-focusable-in-trigger';
import WithSearchExample from './examples/with-search';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Tests',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const WithDivider: Story = {
  render: WithDividerExample,
};

export const WithFocusableTrigger: Story = {
  render: WithFocusableTriggerExample,
};

export const ListItemsType: Story = {
  render: ListItemsTypeExample,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const SizesSelectable: Story = {
  render: SizesSelectableExample,
};

export const SizesMultiselect: Story = {
  render: SizesMultiselectExample,
};

export const DropdownBaseProps: StoryObj<typeof defaultDropDownPropsExample> = {
  render: DropdownBasePropsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    selected: {
      control: { type: 'boolean' },
    },
    visible: {
      control: { type: 'boolean' },
    },
    stretch: {
      control: { type: 'select' },
      options: ['min', 'fixed', false],
    },
    disablePortal: {
      control: { type: 'select' },
      options: ['min', 'fixed', false],
    },
    locale: {
      control: { type: 'select' },
      options: ['ko', 'pl'],
    },

  },
  args: defaultDropDownPropsExample,
};

export const Width: Story = {
  render: WidthExample,
};

export const WithSearch: Story = {
  render: WithSearchExample,
};

export const OnVisible2nd: Story = {
  render: OnVisible2ndExample,
};
