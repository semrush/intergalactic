import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import FocusStylesInAllInputs from './tests/focus-styles-in-all-inputs';

const meta: Meta = {
  title: 'Patterns/Core/Tests',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusStylesInAllInputsStory: Story = {
  render: () => <FocusStylesInAllInputs />,
};
