import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkTriggerTest } from './link-trigger/__tests__/linktrigger.test';
import LinkTriggerExample from './link-trigger/examples/link-trigger';
import { playWrapper } from '../../../utils/playWrapper';
const meta: Meta = {
  title: 'Components/Base Trigger/Documentation/Link Trigger',
};
export const LinkTrigger: StoryObj = {
  render: LinkTriggerExample,
  play: playWrapper(LinkTriggerTest),
};
export default meta;
