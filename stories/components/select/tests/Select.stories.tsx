import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from '@semcore/select';

import OnVisibleExample from './examples/on_visible';
import FocusExample from './examples/focus_interaction';
import OnChangeInputSearchExample from './examples/on_change_input_search';

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

export const OnChangeInputSearch: Story = {
  render: OnChangeInputSearchExample,
};
