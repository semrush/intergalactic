import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticeAdvancedExample, { defaultProps } from './examples/notice';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Notice',
};

export const NoticeAdvanced: StoryObj<typeof defaultProps> = {
  render: NoticeAdvancedExample,
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

export default meta;
