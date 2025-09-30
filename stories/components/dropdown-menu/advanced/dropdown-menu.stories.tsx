import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectSelectorTest } from './__tests__/project-selector.test';
import InputTagsTriggerExample from './examples/input_tags_trigger';
import LeftPlacementExample from './examples/left-placement';
import ModalInItemExample from './examples/modal-in-dd-item';
import ModalInDDNoticeExample from './examples/modal-in-dd-notice';
import ModalInNestedDdItemExample from './examples/modal-in-nested-dd-item';
import ProjectSelectorExample from './examples/project-selector';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Advanced',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const InputTagsTrigger: Story = {
  render: InputTagsTriggerExample,
};

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

export const ProjectSelector: Story = {
  render: ProjectSelectorExample,
  play: playWrapper(ProjectSelectorTest),
};
