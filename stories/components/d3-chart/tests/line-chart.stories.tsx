import type { Meta, StoryObj } from '@storybook/react';

import LineExample from './examples/line-chart/line';
import BasicUsageExample from './examples/line-chart/basic-usage';
import CurveExample from './examples/line-chart/curve';
import DotsDisplayFunctionExample from './examples/line-chart/dots-display-function';
import LegendAndSymbolsForDotExample from './examples/line-chart/legend-and-symbols-for-dots';
import LineWithAreaExample from './examples/line-chart/line-with-area';
import TimeExample from './examples/line-chart/time';
import TooltipExample from './examples/line-chart/tooltip';
import LineAreWithEmptyExample from './examples/line-chart/line-area-with-empty';
import HiddenHoverPropExample from './examples/line-chart/disable-hover-line';


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