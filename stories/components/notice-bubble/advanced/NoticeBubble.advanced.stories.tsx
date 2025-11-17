import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticeInSm2Example, { defaultProps as BasicNoticeProps } from './examples/notice_in_sm2';

const meta: Meta = {
  title: 'Components/NoticeBubble/Advanced',
};
export default meta;

const sharedArgTypes = {
  initialAnimation: {
    control: { type: 'boolean' },
  },
  duration: {
    control: { type: 'number' },
  },
  type: {
    control: { type: 'select' },
    options: ['info', 'warning', 'none'],
  },
  focusLock: {
    control: { type: 'boolean' },
  },
} as const;

export const NoticeInSM2: StoryObj<typeof BasicNoticeProps> = {
  render: NoticeInSm2Example,
  argTypes: sharedArgTypes,
  args: BasicNoticeProps,
};
