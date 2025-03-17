import type { Meta, StoryObj } from '@storybook/react';

import Link from '@semcore/link';

import ColorLinksExample from './examples/color_links';
import LinkAddonExample from './examples/link_addon';
import LinkAsButtonExample from './examples/link_as_button';
import LinkDisabledExample from './examples/link_disabled';
import LinkInsideTheContentExample from './examples/link_inside_the_content';
import LinkWithoutTextExample from './examples/link_without_text';
import LinkWithEllipsisExample from './examples/links_with_ellipsis';

const meta: Meta<typeof Link> = {
  title: 'Components/Link/Documentation',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const ColorLinks: Story = {
  render: ColorLinksExample,
};

export const LinkAddon: Story = {
  render: LinkAddonExample,
};

export const LinkAsButton: Story = {
  render: LinkAsButtonExample,
};

export const LinkDisabled: Story = {
  render: LinkDisabledExample,
};

export const LinkInsideTheContent: Story = {
  render: LinkInsideTheContentExample,
};

export const LinkWithoutText: Story = {
  render: LinkWithoutTextExample,
};

export const LinkWithEllipsis: Story = {
  render: LinkWithEllipsisExample,
};
