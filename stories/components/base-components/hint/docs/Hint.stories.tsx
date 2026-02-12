import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './__tests__/hoverbtn.test';
import { Link } from './__tests__/hoverlink.test';
import BasicUsageExample from './examples/basic-usage';
import TimeoutExample from './examples/timeout';
import { playWrapper } from '../../../../utils/playWrapper';
const meta: Meta = {
  title: 'Components/Base Components/Hint/Docs',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
  play: playWrapper(Button),
};

export const Timeout: StoryObj = {
  render: TimeoutExample,
  play: playWrapper(Link),
};

export default meta;
