import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import LinkExample from './examples/link_in_box_ellipsis';
import TrimWithTextSizeExample from './examples/trim_with_special_text_size';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Base-Components/Ellipsis/Tests',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Link: Story = {
  render: LinkExample,
};

export const TrimWithTextSize: Story = {
  render: TrimWithTextSizeExample,
};
