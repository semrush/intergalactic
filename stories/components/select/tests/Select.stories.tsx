import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from '@semcore/select';

import OnVisibleExample from './examples/on_visible';
import FocusExample from './examples/focus_interaction';
import OnChangeInputSearchExample from './examples/on_change_input_search';
import TriggerExample from './examples/trigger';
import OptionsExample from './examples/options';


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
