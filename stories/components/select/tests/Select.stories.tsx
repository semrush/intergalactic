import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from '@semcore/select';
import OnVisibleExample from './examples/on_visible';
import FocusExample from './examples/focus_interaction';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Test',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const BasicSelectFocusIteracrion: Story = {
  render: FocusExample,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};
