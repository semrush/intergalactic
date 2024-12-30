import type { Meta, StoryObj } from '@storybook/react';

import UndoActionExample from './examples/undo_action';

const meta: Meta = {
  title: 'Components/NoticeBubble/Tests',
};
export default meta;

export const UndoAction: StoryObj = {
  render: UndoActionExample,
};
