import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicUsageTest } from './__tests__/basic-usage.test';
import BasicUsageExample from './examples/basic-usage';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Informer',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
  play: playWrapper(BasicUsageTest),
};

export default meta;
