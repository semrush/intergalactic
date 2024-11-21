import type { Meta, StoryObj } from '@storybook/react';

import BasicNoticeExample from './examples/basic_notice';
import CompletionStateExample from './examples/completion_state';
import DynamicNoticeExample from './examples/dynamic_notice';
import FailureNoticeExample from './examples/failure_notice';
import NoConnectionNoticeExample from './examples/no_connection_notice';
import NoConnectionNoticeWithActionExample from './examples/no_connection_notice_with_action';
import NoticebubbleNotInPortalExample from './examples/noticebubble_not_in_portal';
import ReloadActionExample from './examples/reload_action';
import SpecialEventsNoticeExample from './examples/special_events_notice';
import SuccessNoticeExample from './examples/success_notice';
import UndoActionExample from './examples/undo_action';

const meta: Meta = {
  title: 'Components/NoticeBubble/Documentation',
};
export default meta;

export const BasicNotice: StoryObj = {
  render: BasicNoticeExample,
};

export const CompletionState: StoryObj = {
  render: CompletionStateExample,
};

export const DynamicNotice: StoryObj = {
  render: DynamicNoticeExample,
};

export const FailureNotice: StoryObj = {
  render: FailureNoticeExample,
};

export const NoConnectionNotice: StoryObj = {
  render: NoConnectionNoticeExample,
};

export const NoConnectionNoticeWithAction: StoryObj = {
  render: NoConnectionNoticeWithActionExample,
};

export const NoticebubbleNotInPortal: StoryObj = {
  render: NoticebubbleNotInPortalExample,
};

export const ReloadAction: StoryObj = {
  render: ReloadActionExample,
};

export const SpecialEventsNotice: StoryObj = {
  render: SpecialEventsNoticeExample,
};

export const SuccessNotice: StoryObj = {
  render: SuccessNoticeExample,
};

export const UndoAction: StoryObj = {
  render: UndoActionExample,
};
