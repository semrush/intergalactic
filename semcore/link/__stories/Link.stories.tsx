import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Badge1 from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Link from '@semcore/link';
import FormatText from '@semcore/format-text';
import ShopifyColoredM from '@semcore/icon/color/ShopifyColored/m';
import ShopifyColoredL from '@semcore/icon/color/ShopifyColored/l';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const SimpleLink: Story = {
  args: {
    children: 'Link',
    size: 'm',
    onClick: fn(),
    use: 'primary',
  },
};

export const Addons: Story = {
  render: () => {
    return (
      <FormatText size={'l'}>
        <Link ml={4} href='#' size={300}>
          <Link.Addon>
            <CheckM />
          </Link.Addon>
          <Link.Text>Link</Link.Text>
          <Link.Addon>
            <ShopifyColoredM />
          </Link.Addon>
        </Link>
      </FormatText>
    );
  },
};

export const Colors: Story = {
  render: () => {
    return (
      <div>
        <Link color='text-critical' href='#' size={300}>
          Critical link
        </Link>
        <br />
        <br />
        <Link color='text-success' href='#' size={300}>
          Success link
        </Link>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <FormatText size={'l'}>
        <Link ml={4} href='#' size={300} disabled>
          <Link.Text>Disabled link</Link.Text>
          <Link.Addon>
            <ShopifyColoredL />
          </Link.Addon>
        </Link>
      </FormatText>
    );
  },
};
