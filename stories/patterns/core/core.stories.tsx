import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import LinkButtonLinkTextCombimationExample, { defaultProps as combinationDefaultProps } from './tests/combination-link-button-link-text';
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

export const LinkButtonLinkTextCombimation: StoryObj<typeof combinationDefaultProps> = {
  render: LinkButtonLinkTextCombimationExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [100, 200, 300, 400, 500, 600, 700, 800],
    },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    linkShowAddonLeft: {
      control: { type: 'boolean' },
    },
    linkShowAddonRight: {
      control: { type: 'boolean' },
    },
    buttonLinkShowAddonLeft: {
      control: { type: 'boolean' },
    },
    buttonLinkShowAddonRight: {
      control: { type: 'boolean' },
    },
    showIconOnlyVariants: {
      control: { type: 'boolean' },
    },
    showMultilineVariants: {
      control: { type: 'boolean' },
    },
  },
  args: combinationDefaultProps,
};

export const FocusInAllComponents: Story = {
  render: FocusInAllComponentsExample,
};
