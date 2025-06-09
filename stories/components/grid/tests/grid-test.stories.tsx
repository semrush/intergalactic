import type { Meta, StoryObj } from '@storybook/react-vite';

import AutoSpanExample from './examples/auto-span';
import SpanNumberExample from './examples/span-number';

const meta: Meta = {
  title: 'Components/Grid/Tests',
};

export const SpanNumber: StoryObj = {
  render: SpanNumberExample,
};

export const AutoSpan: StoryObj = {
  render: AutoSpanExample,
};

export default meta;
