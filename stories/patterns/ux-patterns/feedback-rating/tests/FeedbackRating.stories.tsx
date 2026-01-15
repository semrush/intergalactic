import type { Meta, StoryObj } from '@storybook/react-vite';

import { WithErrorTest } from './__tests__/with-error.test';
import FeedbackRatingWithIllustrationAndNoticeExample from './examples/with-custom-illustration-and-notice-component';
import WithErrorOnSendExample from './examples/with-error-on-send';
import FeedbackRatingWithTitleAndSubtitleExample from './examples/with-title-and-subtitle';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/FeedbackRating/Tests',
};

export const FeedbackRatingWithTitleAndSubtitle: StoryObj = {
  render: FeedbackRatingWithTitleAndSubtitleExample,
};

export const WithErrorOnSend: StoryObj = {
  render: WithErrorOnSendExample,
  play: playWrapper(WithErrorTest),
};

export const FeedbackRatingWithIllustrationAndNotice: StoryObj = {
  render: FeedbackRatingWithIllustrationAndNoticeExample,
};

export default meta;
