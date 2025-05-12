import type { Meta, StoryObj } from '@storybook/react';

import Link from '@semcore/link';

import IconsInLinksExample from './examples/icons_in_links';
import LinkHintExample from './examples/link-hint';


const meta: Meta<typeof Link> = {
  title: 'Components/Link/Tests',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const IconsInLinks: Story = {
  render: IconsInLinksExample,
};

export const LinkHint: Story = {
  render: LinkHintExample,
};
