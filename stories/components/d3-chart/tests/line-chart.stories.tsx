import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/line-chart/basic-usage';
import CurveExample from './examples/line-chart/curve';
import HiddenHoverPropExample from './examples/line-chart/disable-hover-line';
import DotsDisplayFunctionExample from './examples/line-chart/dots-display-function';
import LegendAndSymbolsForDotExample from './examples/line-chart/legend-and-symbols-for-dots';
import LineExample from './examples/line-chart/line';
import LineAreWithEmptyExample from './examples/line-chart/line-area-with-empty';
import LineWithAreaExample from './examples/line-chart/line-with-area';
import TimeExample from './examples/line-chart/time';
import TooltipExample from './examples/line-chart/tooltip';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Line-Chart',
};

export default meta;

export const HiddenHoverProp: StoryObj = {
  render: HiddenHoverPropExample,
};

export const LineAreWithEmpty: StoryObj = {
  render: LineAreWithEmptyExample,
};

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
