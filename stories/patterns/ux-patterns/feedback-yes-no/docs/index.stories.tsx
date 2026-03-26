import type { Meta, StoryObj } from '@storybook/react-vite';

import FeedbackYesNoExample from './examples/feedback-yes-no-example';

const meta: Meta = {
  title: 'Patterns/UX Patterns/FeedbackYesNo',
};

export const FeedbackYesNo: StoryObj = {
  render: FeedbackYesNoExample,
};

export default meta;
