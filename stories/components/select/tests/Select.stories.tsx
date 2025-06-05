import Select from '@semcore/select';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import FocusExample from './examples/focus_interaction';
import OnChangeInputSearchExample from './examples/on_change_input_search';
import OnVisibleExample from './examples/on_visible';

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
