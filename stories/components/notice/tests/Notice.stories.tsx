import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticeBigIllustrationExample from './examples/notice_big_illustration';
import NoticeMediumIllustrationExample from './examples/notice_medium_illustration';
import NoticeSmartFullPropsExample, { defaultNoticeSmartProps } from './examples/noticesmart_full_props';

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

const noticeSmartArgTypes = {
  theme: {
    control: { type: 'select' },
    options: ['info', 'muted', 'warning', 'danger', 'success'],
  },
  media: {
    control: { type: 'inline-radio' },
    options: ['none', 'icon', 'illustration'],
    description: 'icon and illustration are mutually exclusive, so they share one control',
  },
  icon: {
    control: { type: 'select' },
    options: ['Info', 'ThumbUp', 'Question'],
    description: 'Applied when media is set to icon',
  },
  withActions: { control: { type: 'boolean' } },
  closable: { control: { type: 'boolean' } },
  hidden: { control: { type: 'boolean' } },
  title: { control: { type: 'text' }, description: 'Empty value removes the title' },
  text: { control: { type: 'text' }, description: 'Empty value removes the text' },
  w: { control: { type: 'number' }, description: 'Notice width, px' },
  duration: { control: { type: 'number' }, description: 'Animation duration, ms' },
  locale: { control: { type: 'select' }, options: ['en', 'es'] },
} as const;

export const NoticeSmartFullProps: StoryObj<typeof defaultNoticeSmartProps> = {
  render: NoticeSmartFullPropsExample,
  argTypes: noticeSmartArgTypes,
  args: defaultNoticeSmartProps,
};
