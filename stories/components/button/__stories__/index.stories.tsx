import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from '@semcore/button';

import AddonsExample from './docs-examples/addons';
import ButtonAccessibilityExample from './docs-examples/button_accessibility';
import ButtonLinkExample from './docs-examples/button_link';
import ButtonWithIconExample from './docs-examples/button_with_icon';
import ButtonLoadingExample from './docs-examples/button_with_loading';

import ButtonExample from './components/Basic';
import ButtonSizesExample from './components/ButtonSizes';

import { ButtonAccessibilityTest } from '../__tests__/ButtonAccessibility.test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SimpleButton: Story = {
  render: ButtonExample,
};

export const Addons: Story = {
  render: AddonsExample,
};

export const Sizes: Story = {
  render: ButtonSizesExample,
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
