import type { Meta, StoryObj } from '@storybook/react';

import Button from '@semcore/button';

import AddonsExample from './examples/addons';
import ButtonAccessibilityExample from './examples/button_accessibility';
import ButtonLinkExample from './examples/button_link';
import ButtonWithIconExample from './examples/button_with_icon';
import ButtonLoadingExample from './examples/button_with_loading';

import { ButtonAccessibilityTest } from './__tests__/ButtonAccessibility.test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Documentation',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Addons: Story = {
  render: AddonsExample,
};

export const IconOnlyButton: Story = {
  render: ButtonWithIconExample,
};

export const ButtonLikeALink: Story = {
  render: ButtonLinkExample,
};

export const ButtonWithNoVisibleText: Story = {
  render: ButtonAccessibilityExample,
  play: ButtonAccessibilityTest,
};

export const ButtonWithLoadingState: Story = {
  render: ButtonLoadingExample,
};
