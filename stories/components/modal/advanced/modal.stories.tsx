import type { Meta, StoryObj } from '@storybook/react';

import ModalWithDatePickerExample from './examples/modal_open_dynamically';
import ModalPreventFocusExample from './examples/modal_prevent_focus';
import ModaliFrameExample from './examples/modal_iframe';


const meta: Meta = {
  title: 'Components/Modal/Advanced',
};

export default meta;

export const ModalWithDatePicker: StoryObj = {
  render: ModalWithDatePickerExample,
};

export const ModalPreventFocus: StoryObj = {
    render: ModalPreventFocusExample,
  };
  
  export const ModaliFrame: StoryObj = {
    render: ModaliFrameExample,
  };
