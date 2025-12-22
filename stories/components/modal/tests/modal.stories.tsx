import Modal from '@semcore/ui/modal';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_usage';
import ModalNestedExample from './examples/modal-nested';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Tests',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    content: {
      control: { type: 'text' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    duration: {
      control: { type: 'number' },
    },
    closable: {
      control: { type: 'boolean' },
    },
    disablePreventScroll: {
      control: { type: 'boolean' },
    },
    ghost: {
      control: { type: 'boolean' },
    },
    w: {
      control: { type: 'number' },
    },
    locale: {
      control: { type: 'text' },
    },
  },
  args: BasicUsageProps,
};

export const ModalNested: StoryObj = {
  render: ModalNestedExample,
};
