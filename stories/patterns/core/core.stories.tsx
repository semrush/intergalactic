import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import LinkButtonLinkTextCombimationExample from './tests/combination-link-button-link-text';
import FocusInAllComponentsExample from './tests/focus-in-all-components';
import FocusStylesInSomeInputsExample from './tests/focus-styles-in-some-inputs';

const meta: Meta = {
  title: 'Patterns/Core/Tests',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusStylesInSomeInputs: Story = {
  render: FocusStylesInSomeInputsExample,
};

export const LinkButtonLinkTextCombimation: Story = {
  render: LinkButtonLinkTextCombimationExample,
};

export const FocusInAllComponents: Story = {
  render: FocusInAllComponentsExample,
};
