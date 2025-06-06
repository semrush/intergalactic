import type { Meta, StoryObj } from '@storybook/react';
import ModalTestExample from './examples/modal';
import ModalStatesExample from './examples/modal-duration';
import ModalNestedExample from './examples/modal-nested';

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
