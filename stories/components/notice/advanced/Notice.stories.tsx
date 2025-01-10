import type { Meta, StoryObj } from '@storybook/react';

import NoticeMediumIllustrationExample from './examples/notice_medium_illustration';
import NoticeSmallIllustrationExample from './examples/notice_small_illustration';
import NoticeBigIllustrationExample from './examples/notice_big_illustration';
import NoticeStatesExample from './examples/notice_with_different_states';

const meta: Meta = {
  title: 'Components/Notice/Advanced',
};
export default meta;

export const NoticeMediumIllustration: StoryObj = {
  render: NoticeMediumIllustrationExample,
};

export const NoticeSmallIllustration: StoryObj = {
  render: NoticeSmallIllustrationExample,
};

export const NoticeBigIllustration: StoryObj = {
  render: NoticeBigIllustrationExample,
};

export const NoticeStates: StoryObj = {
    render: NoticeStatesExample,
  };
