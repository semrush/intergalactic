import Select from '@semcore/select';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import FocusExample from './examples/focus_interaction';
import OnChangeInputSearchExample from './examples/on_change_input_search';
import OnVisibleExample from './examples/on_visible';
import OptionsExample from './examples/options';
import TriggerExample from './examples/trigger';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Test',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Options: Story = {
  render: OptionsExample,
};

export const Trigger: Story = {
  render: TriggerExample,
};

export const BasicSelectFocusIteracrion: Story = {
  render: FocusExample,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const OnChangeInputSearch: Story = {
  render: OnChangeInputSearchExample,
};
