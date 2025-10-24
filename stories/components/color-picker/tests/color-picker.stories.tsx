import ColorPicker from '@semcore/ui/color-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import BaseNoPaletteManagerExample from './examples/base-no-palette-manager';
import ColorPickerPropsExample from './examples/color-picker-props';
import ColorsAndPaletterManagerPropsExample from './examples/colors-and-palette-manager-colors-props';
import InputColorAndItemsPropsExample from './examples/input-color-and-items-props';
import LabelAndColorExpandedExample from './examples/label-and-color-expanded';
import TriggersExample from './examples/triggers';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Tests',
  component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const BaseNoPaletteManager: Story = {
  render: BaseNoPaletteManagerExample,
};

export const InputColorAndItemsProps: Story = {
  render: InputColorAndItemsPropsExample,
};

export const Triggers: Story = {
  render: TriggersExample,
};

export const LabelAndColorExpanded: Story = {
  render: LabelAndColorExpandedExample,
};

export const ColorPickerProps: Story = {
  render: ColorPickerPropsExample,
};

export const ColorsAndPaletterManagerProps: Story = {
  render: ColorsAndPaletterManagerPropsExample,
};
