import type { Meta, StoryObj } from '@storybook/react-vite';

import FeedbackYesNoExample from './docs/examples/docs/feedback-yes-no-example';

const meta: Meta = {
  title: 'Patterns/UX Patterns/FeedbackYesNo',
};

export const FeedbackRatingForm: StoryObj = {
  render: FeedbackYesNoExample,
};

export default meta;
