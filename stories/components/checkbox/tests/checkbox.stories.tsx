import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from '@semcore/checkbox';

import StatesExample from './examples/states';
import GroupsExample from './examples/groups';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Tests',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const States: Story = {
  render: StatesExample,
};

export const Groups: Story = {
  render: GroupsExample,
};
