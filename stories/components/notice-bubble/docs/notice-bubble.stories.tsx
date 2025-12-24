import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicNoticeExample, { defaultProps as BasicNoticeProps } from './examples/basic_notice';
import CompletionStateExample, { defaultProps as CompletionNoticeProps } from './examples/completion_state';
import DynamicNoticeExample, { defaultProps as DynamicNoticeProps } from './examples/dynamic_notice';
import FailureNoticeExample, { defaultProps as FailureNoticeProps } from './examples/failure_notice';
import NoConnectionNoticeExample, { defaultProps as NoConnectionNoticeBubbleProps } from './examples/no_connection_notice';
import NoConnectionNoticeWithActionExample, { defaultProps as NoConnectionActionNoticeBubbleProps } from './examples/no_connection_notice_with_action';
import NoticeInSm2Example from './examples/notice_in_sm2';
import NoticebubbleNotInPortalExample, { defaultProps as NotInPortalNoticeBubbleProps } from './examples/noticebubble_not_in_portal';
import ReloadActionExample, { defaultProps as ReloadActionNoticeBubbleProps } from './examples/reload_action';
import ReplaceLastNoticeExample, { defaultProps as ReplaceLastNoticeBubbleProps } from './examples/replace_last_notice';
import SpecialEventsNoticeExample, { defaultProps as SpecialEventsNoticeBubbleProps } from './examples/special_events_notice';
import SuccessNoticeExample, { defaultProps as SuccessNoticeBubbleProps } from './examples/success_notice';
import UndoActionExample, { defaultProps as UndoActionNoticeBubbleProps } from './examples/undo_action';

const meta: Meta = {
  title: 'Components/NoticeBubble/Documentation',
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

export const BasicNotice: StoryObj<typeof BasicNoticeProps> = {
  render: BasicNoticeExample,
  argTypes: sharedArgTypes,
  args: BasicNoticeProps,
};

export const CompletionState: StoryObj<typeof CompletionNoticeProps> = {
  render: CompletionStateExample,
  argTypes: sharedArgTypes,
  args: CompletionNoticeProps,
};

export const DynamicNotice: StoryObj<typeof DynamicNoticeProps> = {
  render: DynamicNoticeExample,
  argTypes: sharedArgTypes,
  args: DynamicNoticeProps,
};

export const FailureNotice: StoryObj<typeof FailureNoticeProps> = {
  render: FailureNoticeExample,
  argTypes: sharedArgTypes,
  args: FailureNoticeProps,
};

export const NoConnectionNotice: StoryObj<typeof NoConnectionNoticeBubbleProps> = {
  render: NoConnectionNoticeExample,
  argTypes: sharedArgTypes,
  args: NoConnectionNoticeBubbleProps,
};

export const NoConnectionNoticeWithAction: StoryObj<typeof NoConnectionActionNoticeBubbleProps> = {
  render: NoConnectionNoticeWithActionExample,
  argTypes: sharedArgTypes,
  args: NoConnectionActionNoticeBubbleProps,
};

export const NoticebubbleNotInPortal: StoryObj<typeof NotInPortalNoticeBubbleProps> = {
  render: NoticebubbleNotInPortalExample,
  argTypes: sharedArgTypes,
  args: NotInPortalNoticeBubbleProps,
};

export const ReloadAction: StoryObj<typeof ReloadActionNoticeBubbleProps> = {
  render: ReloadActionExample,
  argTypes: sharedArgTypes,
  args: ReloadActionNoticeBubbleProps,
};

export const SpecialEventsNotice: StoryObj<typeof SpecialEventsNoticeBubbleProps> = {
  render: SpecialEventsNoticeExample,
  argTypes: sharedArgTypes,
  args: SpecialEventsNoticeBubbleProps,
};

export const SuccessNotice: StoryObj<typeof SuccessNoticeBubbleProps> = {
  render: SuccessNoticeExample,
  argTypes: sharedArgTypes,
  args: SuccessNoticeBubbleProps,
};

export const ReplaceLastNotice: StoryObj<typeof ReplaceLastNoticeBubbleProps> = {
  render: ReplaceLastNoticeExample,
  argTypes: sharedArgTypes,
  args: ReplaceLastNoticeBubbleProps,
};

export const UndoAction: StoryObj<typeof UndoActionNoticeBubbleProps> = {
  render: UndoActionExample,
  argTypes: sharedArgTypes,
  args: UndoActionNoticeBubbleProps,
};

export const NoticeInSM2: StoryObj<typeof BasicNoticeProps> = {
  render: NoticeInSm2Example,
  argTypes: sharedArgTypes,
  args: BasicNoticeProps,
};
