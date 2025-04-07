import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker from '@semcore/color-picker';


import BasicWithouPaletterManagerExample from './examples/base-no-palette-manager';
import LabelAndColorExpandedExample from './examples/label-and-color-expanded';
import ColorPickerPropsExample from './examples/color-picker-props';
import ColorsAndPaletterManagerPropsExample from './examples/colors-and-palette-manager-colors-props';
import PropsExample from './examples/input-color-and-items-props';
import TriggersExample from './examples/triggers';




const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Tests',
  component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const BasicWithouPaletterManager: Story = {
  render: BasicWithouPaletterManagerExample,
};

export const Props: Story = {
    render: PropsExample,
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