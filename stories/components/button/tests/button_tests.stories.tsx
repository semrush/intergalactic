import type { Meta, StoryObj } from '@storybook/react';

import IconInButtonLinkExample from './examples/icon_in_buttonLink';
import IconInButtonExample from './examples/icon_in_buttons';

const meta: Meta = {
  title: 'Components/Button/Tests',
};

export default meta;
type Story = StoryObj;

export const IconInButton: Story = {
  render: IconInButtonExample,
};

export const IconInButtonLink: Story = {
  render: IconInButtonLinkExample,
};
