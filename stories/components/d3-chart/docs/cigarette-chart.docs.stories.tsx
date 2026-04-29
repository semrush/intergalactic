import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/cigarette-chart/basic-usage';
import ClickInteractionExample from './examples/cigarette-chart/click-interaction';
import CustomA11yExample from './examples/cigarette-chart/custom-a11y';
import LayoutsExample from './examples/cigarette-chart/layouts';
import NoValuesExample from './examples/cigarette-chart/no-values';
import SkeletonExample from './examples/cigarette-chart/skeleton';
import TooltipTypeExample from './examples/cigarette-chart/tooltip-type';
const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Cigarette-Chart',
};
export default meta;
export const ClickInteraction: StoryObj = {
  render: ClickInteractionExample,
};
export const CustomA11y: StoryObj = {
  render: CustomA11yExample,
};
export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
export const Layouts: StoryObj = {
  render: LayoutsExample,
};
export const NoValues: StoryObj = {
  render: NoValuesExample,
};
export const TooltipType: StoryObj = {
  render: TooltipTypeExample,
};
export const Skeleton: StoryObj = {
  render: SkeletonExample,
};
