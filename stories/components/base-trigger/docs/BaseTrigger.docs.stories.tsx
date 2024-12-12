import type { Meta } from '@storybook/react';

import LinkTriggerExample from './examples/linktrigger';

import { LinkTriggerTest } from './__tests__/linktrigger.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta = {
  title: 'Components/BaseTrigger/Documentation',
};

export const LinkTrigger = {
  render: LinkTriggerExample,
  play: playWrapper(LinkTriggerTest),
};

export default meta;
