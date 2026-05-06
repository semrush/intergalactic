import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticeOnSecondaryBackgroundExample from './examples/notice-on-secondary-background';

const meta: Meta = {
  title: 'Components/Notice/Advanced',
};

export default meta;

export const NoticeOnSecondaryBackground: StoryObj = {
  name: 'Notice On Secondary Background',
  render: NoticeOnSecondaryBackgroundExample,
};
