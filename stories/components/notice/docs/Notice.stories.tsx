import type { Meta, StoryObj } from '@storybook/react';

import BasicNoticeExample from './examples/basic_notice';
import CustomNoticeExample from './examples/custom_notice';
import SmartNoticeExample from './examples/noticesmart';

const meta: Meta = {
  title: 'Components/Notice/Documentation',
};
export default meta;

export const BasicNotice: StoryObj = {
  render: BasicNoticeExample,
};

export const SmartNotice: StoryObj = {
  render: SmartNoticeExample,
};

export const CustomNotice: StoryObj = {
  render: CustomNoticeExample,
};
