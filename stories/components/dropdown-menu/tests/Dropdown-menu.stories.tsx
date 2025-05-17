import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from '@semcore/dropdown-menu';

import OnVisibleExample from './examples/on-visible';
import OnVisible2ndExample from './examples/on-visible-2nd';
import WithSearchExample from './examples/with-search';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Tests',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const WithSearch: Story = {
  render: WithSearchExample,
};

export const OnVisible2nd: Story = {
  render: OnVisible2ndExample,
};
