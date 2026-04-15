import Modal from '@semcore/ui/modal';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_usage';
import ModalNestedExample from './examples/modal-nested';
import type { defaultProps as WithTableAndEllipsisProps } from './examples/with-table-and-ellipsis';
import WithTableAndEllipsisExample from './examples/with-table-and-ellipsis';
import WithTableLinkAndEllipsisExample from './examples/with-table-link-and-ellipsis';
import type { defaultProps as WithTableLinkAndEllipsisProps } from './examples/with-table-link-and-ellipsis';
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Tests',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

const commonArgTypes = {
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
} as const;

export const WithTableAndEllipsis: StoryObj<typeof WithTableAndEllipsisProps> = {
  render: WithTableAndEllipsisExample,
  argTypes: commonArgTypes,
  args: BasicUsageProps,
};

export const WithTableLinkAndEllipsis: StoryObj<typeof WithTableLinkAndEllipsisProps> = {
  render: WithTableLinkAndEllipsisExample,
  argTypes: commonArgTypes,
  args: BasicUsageProps,
};

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: commonArgTypes,
  args: BasicUsageProps,
};

export const ModalNested: StoryObj = {
  render: ModalNestedExample,
};
