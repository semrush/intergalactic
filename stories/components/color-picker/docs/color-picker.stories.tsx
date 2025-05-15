import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker from '@semcore/color-picker';

import BasicExampleExample from './examples/basic_example';
import CustomTriggerExample from './examples/custom_trigger';
import InputValidationExample from './examples/input_validation';
import PalettemanagerExample from './examples/palettemanager';
import PredefinedPaletteExample from './examples/predefined_palette';

import { InputValidationTest } from './__tests__/input_validation.test';
import { BasicExampleTest } from './__tests__/basic_example.test';
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

export const InputValidation: Story = {
  render: InputValidationExample,
  play: playWrapper(InputValidationTest),
};

export const Palettemanager: Story = {
  render: PalettemanagerExample,
};

export const PredefinedPalette: Story = {
  render: PredefinedPaletteExample,
};
