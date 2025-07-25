import type { Meta, StoryObj } from '@storybook/react-vite';

import ModalTestExample from './examples/modal';
import ModalStatesExample from './examples/modal-duration';
import ModalNestedExample from './examples/modal-nested';
import ModalWithoutFocusableExample from './examples/modal-without-focusable';

const meta: Meta = {
  title: 'Components/Modal/Tests',
};

export default meta;

export const ModalTest: StoryObj = {
  render: ModalTestExample,
};

export const ModalStates: StoryObj = {
  render: ModalStatesExample,
};

export const ModalNested: StoryObj = {
  render: ModalNestedExample,
};

export const ModalWithoutFocusable: StoryObj = {
  render: ModalWithoutFocusableExample,
};
