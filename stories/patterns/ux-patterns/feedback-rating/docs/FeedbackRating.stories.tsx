import type { Meta, StoryObj } from '@storybook/react';

import FeedbackRatingFormExample from './examples/feedback_rating_form';

const meta: Meta = {
  title: 'Patterns/UX Patterns/FeedbackRating/Documentation',
};

export const FeedbackRatingForm: StoryObj = {
  render: FeedbackRatingFormExample,
};

export default meta;
