import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticeBigIllustrationExample from './examples/notice_big_illustration';
import NoticeMediumIllustrationExample from './examples/notice_medium_illustration';
import NoticeStatesExample from './examples/notice_with_different_states';

const meta: Meta = {
  title: 'Components/Notice/Tests',
};
export default meta;

export const NoticeMediumIllustration: StoryObj = {
  render: NoticeMediumIllustrationExample,
};

export const NoticeBigIllustration: StoryObj = {
  render: NoticeBigIllustrationExample,
};

export const NoticeStates: StoryObj = {
  render: NoticeStatesExample,
};
