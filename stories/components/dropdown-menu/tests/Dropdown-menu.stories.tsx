import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DropdownBasePropsExample, { defaultDropDownPropsExample } from './examples/dropdown-base-props';
import ListItemsTypeExample from './examples/list_item_types';
import MultiselectPropsExample, { defaultDropDownMultiselectPropsExample } from './examples/multiselect-props';
import OnVisibleExample from './examples/on-visible';
import OnVisible2ndExample from './examples/on-visible-2nd';
import SelectablePropsExample, { defaultDropDownSelectablePropsExample } from './examples/selectable-props';
import WithFocusableTriggerExample from './examples/with-focusable-in-trigger';
import WithSearchExample from './examples/with-search';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Tests',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const WithFocusableTrigger: Story = {
  render: WithFocusableTriggerExample,
};

export const ListItemsType: Story = {
  render: ListItemsTypeExample,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const SelectableProps: StoryObj<typeof defaultDropDownSelectablePropsExample> = {
  render: SelectablePropsExample,
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
  args: defaultDropDownSelectablePropsExample,
};

export const MultiselectProps: StoryObj<typeof defaultDropDownMultiselectPropsExample> = {
  render: MultiselectPropsExample,
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
  args: defaultDropDownMultiselectPropsExample,
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

export const WithSearch: Story = {
  render: WithSearchExample,
};

export const OnVisible2nd: Story = {
  render: OnVisible2ndExample,
};
