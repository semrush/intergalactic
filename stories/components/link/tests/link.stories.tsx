import Link from '@semcore/ui/link';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_usage';
import LinkHintExample from './examples/link-hint';
import LinkInsideTheContentWithVisibleExample from './examples/link_inside_the_content-with_enable_visited';

const meta: Meta<typeof Link> = {
  title: 'Components/Link/Tests',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    href: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: [100, 200, 300, 400, 500, 600, 700, 800],
    },
    inline: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    active: {
      control: { type: 'boolean' },
    },
    enableVisited: {
      control: { type: 'boolean' },
    },
    noWrap: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'text' },
    },
    showAddonLeft: {
      control: { type: 'boolean' },
    },
    showAddonRight: {
      control: { type: 'boolean' },
    },
    showAddonLeftLink2: {
      control: { type: 'boolean' },
    },
    showAddonRightLink2: {
      control: { type: 'boolean' },
    },
    w: {
      control: { type: 'number' },
    },
    title: {
      control: { type: 'text' },
    },
  },
  args: BasicUsageProps,
};

export const LinkHint: Story = {
  render: LinkHintExample,
};

export const LinkInsideTheContentWithVisible: Story = {
  render: LinkInsideTheContentWithVisibleExample,
};
