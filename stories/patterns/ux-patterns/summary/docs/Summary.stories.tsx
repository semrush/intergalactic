import type { Meta, StoryObj } from '@storybook/react-vite';

import DefaultSummaryExample from './examples/default-summary-example';
import SummaryWithErrorExample from './examples/summary-with-error';
import SummaryWithMinitrendsExample from './examples/summary-with-minitrend';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Summary',
};

export const DefaultSummary: StoryObj = {
  render: DefaultSummaryExample,
};

export const SummaryWithError: StoryObj = {
  render: SummaryWithErrorExample,
};

export const SummaryWithMinitrends: StoryObj = {
  render: SummaryWithMinitrendsExample,
};

export default meta;
