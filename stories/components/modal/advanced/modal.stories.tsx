import type { Meta, StoryObj } from '@storybook/react';

import ModalWithSelectExample from './examples/modal_with_select';
import OpenModalDynamicallyExample from './examples/modal_open_dynamically';
import ModalPreventFocusExample from './examples/modal_prevent_focus';
import ModaliFrameExample from './examples/modal_iframe';
import ModalIconExample from './examples/modal_with_int_icon';
import OutsideClickExample from './examples/outside_click';

const meta: Meta = {
  title: 'Components/Modal/Advanced',
};

export default meta;

export const ModalWithSelect: StoryObj = {
  render: ModalWithSelectExample,
};

export const OpenModalDynamically: StoryObj = {
  render: OpenModalDynamicallyExample,
};

export const ModalPreventFocus: StoryObj = {
  render: ModalPreventFocusExample,
};

export const ModaliFrame: StoryObj = {
  render: ModaliFrameExample,
};

export const ModalIcon: StoryObj = {
  render: ModalIconExample,
};

export const OutsideClick: StoryObj = {
  render: OutsideClickExample,
};
