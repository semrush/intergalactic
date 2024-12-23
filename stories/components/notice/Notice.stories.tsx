import type { Meta, StoryObj } from '@storybook/react';

import SmartNoticeExample from './examples/noticesmart';
import CustomNoticeExample from './examples/custom_notice';

const meta: Meta = {
  title: 'Components/Notice/Documentation',
};
export default meta;

export const SmartNotice: StoryObj = {
  render: SmartNoticeExample,
};

export const CustomNotice: StoryObj = {
  render: CustomNoticeExample,
};
