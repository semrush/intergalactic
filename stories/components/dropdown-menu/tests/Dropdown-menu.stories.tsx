import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DropdownBasePropsExample, { defaultDropDownPropsExample } from './examples/dropdown-base-props';
import ListItemsTypeExample from './examples/list_item_types';
import MultiselectPropsExample, { defaultDropDownMultiselectPropsExample } from './examples/multiselect-props';
import NestedMenuPropsExample, { defaultNestedMenuPropsExample } from './examples/nested-menu-props';
import OnVisibleExample from './examples/on-visible';
import OnVisible2ndExample from './examples/on-visible-2nd';
import SelectablePropsExample, { defaultDropDownSelectablePropsExample } from './examples/selectable-props';
import WithContentOnPageExample from './examples/test-with-content-on-page';
import WithFocusableTriggerExample from './examples/with-focusable-in-trigger';
import WithSearchExample from './examples/with-search';
import WithEllipsisExample, { defaultProps as defaultWithEllipsisProps } from './examples/with_ellipsis';
import WithHintOnMovedReferenceExample from './examples/with_hint_on_moved_reference';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Tests',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
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
  }, disabledAll: {
    control: { type: 'boolean' },
  },
} as const;

export const WithFocusableTrigger: Story = {
  render: WithFocusableTriggerExample,
};

export const WithContentOnPage: Story = {
  render: WithContentOnPageExample,
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
    ...commonArgTypes,
    disabledFirstItem: {
      control: { type: 'boolean' },
    },
    disabledSecondItem: {
      control: { type: 'boolean' },
    },
    disabledLastItem: {
      control: { type: 'boolean' },
    },
  },
  args: defaultDropDownSelectablePropsExample,
};

export const MultiselectProps: StoryObj<typeof defaultDropDownMultiselectPropsExample> = {
  render: MultiselectPropsExample,
  argTypes: {
    ...commonArgTypes,
    disabledFirstItem: {
      control: { type: 'boolean' },
    },
  },
  args: defaultDropDownMultiselectPropsExample,
};

export const DropdownBaseProps: StoryObj<typeof defaultDropDownPropsExample> = {
  render: DropdownBasePropsExample,
  argTypes: {
    ...commonArgTypes,

    disabledSave: {
      control: { type: 'boolean' },
    },
    disabledRename: {
      control: { type: 'boolean' },
    },
    disabledDownload: {
      control: { type: 'boolean' },
    },
    disabledDelete: {
      control: { type: 'boolean' },
    },
    selectedSave: {
      control: { type: 'boolean' },
    },
    selectedRename: {
      control: { type: 'boolean' },
    },
    selectedDownload: {
      control: { type: 'boolean' },
    },
    selectedDelete: {
      control: { type: 'boolean' },
    },
  },
  args: defaultDropDownPropsExample,
};

export const WithSearch: Story = {
  render: WithSearchExample,
};

export const WithEllipsis: StoryObj<typeof defaultWithEllipsisProps> = {
  render: WithEllipsisExample,
  argTypes: {
    addExtraItems: {
      control: { type: 'boolean' },
      description: 'Add 5 extra menu items to enable scroll',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable selectable mode',
    },
    multiselect: {
      control: { type: 'boolean' },
      description: 'Enable multiselect mode (requires selectable to be true)',
    },
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
  },
  args: defaultWithEllipsisProps,
};

export const OnVisible2nd: Story = {
  render: OnVisible2ndExample,
};

export const NestedMenuProps: StoryObj<typeof defaultNestedMenuPropsExample> = {
  render: NestedMenuPropsExample,
  argTypes: {
    ...commonArgTypes,
    disabledNestedAdd: {
      control: { type: 'boolean' },
    },
    disabledNestedDelete: {
      control: { type: 'boolean' },
    },
  },
  args: defaultNestedMenuPropsExample,
};

export const WithHintOnMovedReference: Story = {
  render: WithHintOnMovedReferenceExample,
};
