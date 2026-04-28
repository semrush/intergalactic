import ColorPicker from '@semcore/ui/color-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { BasicExampleTest } from './__tests__/basic_example.test';
import BasicExampleExample from './examples/basic_example';
import CustomTriggerExample from './examples/custom_trigger';
import PalettemanagerExample from './examples/palettemanager';
import PredefinedPaletteExample from './examples/predefined_palette';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Documentation',
  component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const BasicExample: Story = {
  render: BasicExampleExample,
  play: playWrapper(BasicExampleTest),
};

export const CustomTrigger: Story = {
  render: CustomTriggerExample,
};

export const Palettemanager: Story = {
  render: PalettemanagerExample,
};

export const PredefinedPalette: Story = {
  render: PredefinedPaletteExample,
};
