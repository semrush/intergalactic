import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import FocusInAllComponentsStory from './tests/focus-in-all-components';
import FocusStylesInSomeInputsStory from './tests/focus-styles-in-some-inputs';

const meta: Meta = {
  title: 'Patterns/Core/Tests',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusStylesInSomeInputs: Story = {
  render: () => <FocusStylesInSomeInputsStory />,
};

export const FocusInAllComponents: Story = {
  render: () => <FocusInAllComponentsStory />,
};
