import type { Meta, StoryObj } from '@storybook/react-vite';

import { WithErrorTest } from './__tests__/with-error.test';
import ModalWidthVariantsExample from './examples/modal-width-variants';
import FeedbackRatingWithIllustrationAndNoticeExample from './examples/with-custom-illustration-and-notice';
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

export const ModalWidthVariants: StoryObj = {
  render: ModalWidthVariantsExample,
};

export default meta;
