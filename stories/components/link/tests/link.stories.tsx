import type { Meta, StoryObj } from '@storybook/react';

import Link from '@semcore/link';

import IconsInLinksExample from './examples/icons_in_links';
import LinkHintExample from './examples/link-hint';
import LinkInsideTheContentWithVisibleExample from './examples/link_inside_the_content-with_enable_visited';
import SizesExample from './examples/sizes';


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

export const Sizes: Story = {
  render: SizesExample,
};


export const LinkInsideTheContentWithVisible: Story = {
  render: LinkInsideTheContentWithVisibleExample,
};