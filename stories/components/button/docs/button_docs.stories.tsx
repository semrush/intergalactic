import type { NSButton } from '@semcore/ui/button';
import Button from '@semcore/ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonAccessibilityTest } from './__tests__/ButtonAccessibility.test';
import AddonsExample from './examples/addons';
import ButtonAccessibilityExample from './examples/button_accessibility';
import ButtonLinkExample from './examples/button_link';
import ButtonWithIconExample from './examples/button_with_icon';
import ButtonLoadingExample from './examples/button_with_loading';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<NSButton.Component> = {
  title: 'Components/Button/Documentation',
  component: Button,
};

export default meta;
type Story = StoryObj<NSButton.Component>;

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
  play: playWrapper(ButtonAccessibilityTest),
};

export const ButtonWithLoadingState: Story = {
  render: ButtonLoadingExample,
};
