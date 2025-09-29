import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import FocusInAllComponentsStory from './tests/focus-in-all-components';
import FocusStylesInAllInputsStory from './tests/focus-styles-in-all-inputs';

const meta: Meta = {
  title: 'Patterns/Core/Tests',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusStylesInAllInputs: Story = {
  render: () => <FocusStylesInAllInputsStory />,
};

export const FocusInAllComponents: Story = {
  render: () => <FocusInAllComponentsStory />,
};
