import type { Meta, StoryObj } from '@storybook/react';

import AddingAWrapperExample from './examples/adding-a-wrapper';
import GroupedButtonExample from './examples/grouped-buttons';
import InputSelectButtonExample from './examples/grouped-input,-select,-and-button';
import InputAndButtonExample from './examples/grouped-input-and-button';
import InputAndSelectExample from './examples/grouped-input-and-select';
import CustomComponentExample from './examples/using-a-custom-component';

const meta: Meta = {
  title: 'Components/NeighborLocation/Documentation',
};

export default meta;

export const AddingAWrapper: StoryObj = {
  render: AddingAWrapperExample,
};

export const GroupedButton: StoryObj = {
  render: GroupedButtonExample,
};

export const InputSelectButton: StoryObj = {
  render: InputSelectButtonExample,
};

export const InputAndButton: StoryObj = {
  render: InputAndButtonExample,
};

export const InputAndSelect: StoryObj = {
  render: InputAndSelectExample,
};

export const CustomComponent: StoryObj = {
  render: CustomComponentExample,
};
