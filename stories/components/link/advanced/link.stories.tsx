import Link from '@semcore/ui/link';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllStatesExample from './examples/all_states';

const meta: Meta<typeof Link> = {
  title: 'Components/Link/Documentation',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const AllStates: Story = {
  render: AllStatesExample,
};
