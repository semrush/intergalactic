import type { Meta, StoryObj } from '@storybook/react';

import FeedbackRatingWithTitleAndSubtitleExample from './examples/with-title-and-subtitle';
import FeedbackRatingWithTitleExample from './examples/with_title';

const meta: Meta = {
  title: 'Patterns/UX Patterns/FeedbackRating/Tests',
};

export const FeedbackRatingWithTitleAndSubtitle: StoryObj = {
  render: FeedbackRatingWithTitleAndSubtitleExample,
};

export const FeedbackRatingWithTitle: StoryObj = {
    render: FeedbackRatingWithTitleExample,
  };

export default meta;
