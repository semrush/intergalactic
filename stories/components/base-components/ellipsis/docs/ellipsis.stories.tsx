import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import MultipleUseExample from './examples/multiple_use';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Base-Components/Ellipsis/Docs',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const MultipleUse: Story = {
  render: MultipleUseExample,
};
