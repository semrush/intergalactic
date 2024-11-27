import type { Meta, StoryObj } from '@storybook/react';

import DefaultSummaryExample from './examples/default-summary-example';
import SummaryWithErrorExample from './examples/summary-with-error';
import SummaryWithMinitrensExample from './examples/summary-with-minitrend';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Summary',
};

export const DefaultSummary: StoryObj = {
  render: DefaultSummaryExample,
};

export const SummaryWithError: StoryObj = {
  render: SummaryWithErrorExample,
};

export const SummaryWithMinitrens: StoryObj = {
    render: SummaryWithMinitrensExample,
};

export default meta;
