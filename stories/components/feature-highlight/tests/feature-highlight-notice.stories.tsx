import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticePropsExample, { defaultProps } from './examples/notice/notice';
import NoticeAdvancedModeExample from './examples/notice/notice-advanced-mode';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Notice',
};

export const NoticeProps: StoryObj<typeof defaultProps> = {
  render: NoticePropsExample,
  argTypes: {
    noticeText: { control: 'text' },
    showTitle: { control: 'boolean' },
    titleText: { control: 'text' },
    showActions: { control: 'boolean' },
    actionButtonText: { control: 'text' },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    iconType: {
      control: { type: 'select' },
      options: ['ai', 'mail'],
    },
    ariaLabel: { control: 'text' },
  },
  args: defaultProps,
};

export const NoticeAdvancedMode: StoryObj = {
  render: NoticeAdvancedModeExample,
};

export default meta;
