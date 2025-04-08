import type { Meta, StoryObj } from '@storybook/react';

import FeedbackRatingWithTitleAndSubtitleExample from './examples/with-title-and-subtitle';
import WithErrorOnSendExample from './examples/with-error-on-send';

import {WithErrorTest } from './__tests__/with-error.test';
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

export default meta;
