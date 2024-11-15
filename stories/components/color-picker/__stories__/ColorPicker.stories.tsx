import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

import CustomTriggerExample from './docs-examples/custom_trigger';
import InputValidationExample from './docs-examples/input_validation';
import PalettemanagerExample from './docs-examples/palettemanager';
import SeveralWaysToUseComponentExample from './docs-examples/several_ways_to_use_component';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const BasicExample: Story = {
  render: () => {
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='main-theme-color'>
          Main theme color
        </Text>
        <ColorPicker>
          <ColorPicker.Trigger mt={2} id='main-theme-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
    );
  },
};

export const CustomTrigger: Story = {
  render: CustomTriggerExample,
};

export const InputValidation: Story = {
  render: InputValidationExample,
};

export const Palettemanager: Story = {
  render: PalettemanagerExample,
};

export const SeveralWaysToUseComponent: Story = {
  render: SeveralWaysToUseComponentExample,
};
