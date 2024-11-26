import type { Meta, StoryObj } from '@storybook/react';

import ConfirmationModalEx from './examples/confirmation-modal-example';

const meta: Meta = {
  title: 'Patterns/UX Patterns/ConfirmationModal',
};

export default meta;

export const ConfirmationModal: StoryObj = {
  render: ConfirmationModalEx,
};
