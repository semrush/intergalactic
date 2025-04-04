import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker from '@semcore/color-picker';


import BasicExampleExample from './examples/ColorPickerProps-displayLabel-noPalette';
import TestExample from './examples/test';


import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Tests',
  component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const BasicExample: Story = {
  render: BasicExampleExample,
};

export const Test: Story = {
    render: TestExample,
  };

