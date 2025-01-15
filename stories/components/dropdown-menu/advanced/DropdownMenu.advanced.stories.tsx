import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from '@semcore/dropdown-menu';

import ModalInItemExample from './examples/modal-in-dd-item';
import ModalInNestedDdItemExample from './examples/modal-in-nested-dd-item';
import ModalInDDNoticeExample from './examples/modal-in-dd-notice';
import LeftPlacementExample from './examples/left-placement';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Advanced',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const ModalInItem: Story = {
  render: ModalInItemExample,
};

export const ModalInNestedItem: Story = {
  render: ModalInNestedDdItemExample,
};

export const ModalInDDNotice: Story = {
  render: ModalInDDNoticeExample,
};

export const LeftPlacement: Story = {
  render: LeftPlacementExample,
};
