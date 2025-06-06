import type { Meta, StoryObj } from '@storybook/react';

import InlineEdit from '@semcore/inline-edit';

import EditableTagExample from './examples/editable_tag';
import PseudoNetworkInteractionExample from './examples/pseudo_network_interaction';
import SimpleUseExample from './examples/simple_use';

const meta: Meta<typeof InlineEdit> = {
  title: 'Components/InlineEdit/Documentation',
  component: InlineEdit,
};

export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const SimpleUse: Story = {
  render: SimpleUseExample,
};

export const EditableTag: Story = {
  render: EditableTagExample,
};

export const PseudoNetworkInteraction: Story = {
  render: PseudoNetworkInteractionExample,
};
