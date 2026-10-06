import Skeleton from '@semcore/ui/skeleton';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ChartSkeletonsExample, { defaultChartSkeletonProps } from './examples/chart-skeletons';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton/Tests',
  component: Skeleton,
};

export default meta;

const chartSkeletonArgTypes = {
  theme: {
    control: { type: 'select' },
    options: ['default', 'invert'],
    description: 'Skeleton theme',
  },
  duration: {
    control: { type: 'number' },
    description: 'Pulse animation duration, ms (0 freezes the animation for screenshots)',
  },
  hidden: {
    control: { type: 'boolean' },
    description: 'Renders nothing when true',
  },
  locale: {
    control: { type: 'select' },
    options: ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'sv', 'tr', 'vi', 'zh'],
    description: 'Locale of the aria-label text',
  },
  observeParentSize: {
    control: { type: 'boolean' },
    description: 'Recalculates skeleton size via ResizeObserver on the parent',
  },
  type: {
    control: { type: 'select' },
    options: ['linear', 'monotone'],
    description: 'Curve interpolation — Line and Area chart skeletons only',
  },
  layout: {
    control: { type: 'select' },
    options: ['horizontal', 'vertical'],
    description: 'Orientation — Bar and Histogram chart skeletons only',
  },
  halfsize: {
    control: { type: 'boolean' },
    description: 'Semi donut — Donut chart skeleton only',
  },
  amount: {
    control: { type: 'number' },
    description: 'Number of Skeleton.Text lines in the control group',
  },
  textWidth: {
    control: { type: 'text' },
    description: 'Width of the last Skeleton.Text line in the control group',
  },
  invertedBackground: {
    control: { type: 'boolean' },
    description: 'Puts everything on the inverted background to compare contrast',
  },
  parentWidth: {
    control: { type: 'number' },
    description: 'Width of the parent box around each skeleton',
  },
  w: { control: { type: 'number' }, description: 'Box prop: width override' },
  h: { control: { type: 'number' }, description: 'Box prop: height override' },
  m: { control: { type: 'number' }, description: 'Box prop: margin' },
  p: { control: { type: 'number' }, description: 'Box prop: padding' },
} as const;

export const ChartSkeletons: StoryObj<typeof defaultChartSkeletonProps> = {
  render: ChartSkeletonsExample,
  argTypes: chartSkeletonArgTypes,
  args: defaultChartSkeletonProps,
};
