import type { Meta, StoryObj } from '@storybook/react';

import Popper from '@semcore/popper';

import ClickOutsideExample from './examples/click-outside';
import CustomTagExample from './examples/custom-tag';
import DisabledPortalExample from './examples/disabled-portal';
import EventsTriggerExample from './examples/events-trigger';
import PlacementExample from './examples/placement';
import RenderFunctionsExample from './examples/render-functions';
import ShowHideExample from './examples/show-hide';

const meta: Meta<typeof Popper> = {
  title: 'Components/Popper/Documantation',
  component: Popper,
};

export default meta;
type Story = StoryObj<typeof Popper>;

export const ClickOutside: Story = {
  render: ClickOutsideExample,
};

export const Sizes: Story = {
  render: CustomTagExample,
};

export const DisabledPortal: Story = {
    render: DisabledPortalExample,
};

export const EventsTrigger: Story = {
    render: EventsTriggerExample,
};

export const Placement: Story = {
    render: PlacementExample,
};

export const RenderFunctions: Story = {
    render: RenderFunctionsExample,
};

export const ShowHide: Story = {
    render: ShowHideExample,
};