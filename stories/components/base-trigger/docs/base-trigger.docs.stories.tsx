import type { Meta, StoryObj } from '@storybook/react';

import LinkTriggerExample from './examples/link-trigger';

import { LinkTriggerTest } from './__tests__/linktrigger.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/BaseTrigger/Documentation',
};

export const LinkTrigger: StoryObj = {
  render: LinkTriggerExample,
  play: playWrapper(LinkTriggerTest),
};

export default meta;
