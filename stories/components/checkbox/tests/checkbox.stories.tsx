import Checkbox from '@semcore/ui/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

import GroupsExample from './examples/groups';
import StatesExample, { defaultExampleProps } from './examples/states';
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Tests',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;
const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  state: {
    control: { type: 'select' },
    options: ['normal', 'invalid'],
  },
  theme: {
    control: { type: 'select' },
    options: ['yellow', 'violet', 'pink'],
  },
  checked: {
    control: { type: 'boolean' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  indeterminate: {
    control: { type: 'boolean' },
  },
  color: {
    control: { type: 'select' },
    options: [undefined, 'violet'],
  },
} as const;
export const States: StoryObj<typeof defaultExampleProps> = {
  render: StatesExample,
  argTypes: commonArgTypes,
  args: defaultExampleProps,

};
export const Groups: Story = {
  render: GroupsExample,

};
