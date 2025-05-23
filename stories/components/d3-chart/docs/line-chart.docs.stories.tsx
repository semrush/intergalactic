import type { Meta, StoryObj } from '@storybook/react';

import LineExample from './examples/line-chart/line';
import BasicUsageExample from './examples/line-chart/basic-usage';
import CurveExample from './examples/line-chart/curve';
import DotsDisplayFunctionExample from './examples/line-chart/dots-display-function';
import HoverLineExample from './examples/line-chart/hover-line';
import InterpolationExample from './examples/line-chart/interpolation';
import LegendAndSymbolsForDotExample from './examples/line-chart/legend-and-symbols-for-dots';
import LineWithAreaExample from './examples/line-chart/line-with-area';
import TimeExample from './examples/line-chart/time';
import TooltipExample from './examples/line-chart/tooltip';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Line-Chart',
};

export default meta;

export const Line: StoryObj = {
  render: LineExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const Curve: StoryObj = {
  render: CurveExample,
};

export const DotsDisplayFunction: StoryObj = {
  render: DotsDisplayFunctionExample,
};

export const HoverLine: StoryObj = {
  render: HoverLineExample,
};

export const Interpolation: StoryObj = {
  render: InterpolationExample,
};

export const LegendAndSymbolsForDot: StoryObj = {
  render: LegendAndSymbolsForDotExample,
};

export const LineWithArea: StoryObj = {
  render: LineWithAreaExample,
};

export const Time: StoryObj = {
  render: TimeExample,
};

export const Tooltip: StoryObj = {
  render: TooltipExample,
};