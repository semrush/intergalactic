import type { Meta, StoryObj } from '@storybook/react';

import { ConfirmationModalDialogTest } from './__tests__/ConfirmationModalDialog.test';
import ConfirmationModalEx from './examples/confirmation-modal-example';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/ConfirmationModal',
};

export default meta;

export const ConfirmationModal: StoryObj = {
  render: ConfirmationModalEx,
  play: playWrapper(ConfirmationModalDialogTest),
};
