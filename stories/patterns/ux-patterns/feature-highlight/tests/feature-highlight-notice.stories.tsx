import type { Meta, StoryObj } from '@storybook/react-vite';

import NoticeExample from './examples/notice/notice-with-props';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Feature Highlight/Tests/Notice',
};

export const Notice: StoryObj = {
  render: NoticeExample,

};

export default meta;
