import type { Meta, StoryObj } from '@storybook/react';

import SpanNumberExample from './examples/span-number';
import AutoSpanExample from './examples/auto-span';

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
