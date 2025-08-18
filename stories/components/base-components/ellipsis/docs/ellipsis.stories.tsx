import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TrimMiddleExample from './examples/trim_middle';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Base-Components/Ellipsis/Docs',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const TrimMiddle1: Story = {
  render: TrimMiddleExample,
};
