import type { Meta, StoryObj } from '@storybook/react';

import FeedbackYesNoExample from './examples/docs/feedback-yes-no-example';

const meta: Meta = {
  title: 'Patterns/UX Patterns/FeedbackYesNo',
};

export const FeedbackRatingForm: StoryObj = {
  render: FeedbackYesNoExample,
};

export default meta;
