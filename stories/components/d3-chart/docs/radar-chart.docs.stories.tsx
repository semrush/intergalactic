import type { Meta, StoryObj } from '@storybook/react';

import BackgroundColorExample from './examples/radar-chart/background-color';
import BasicUsageExample from './examples/radar-chart/basic-usage';
import CircleExample from './examples/radar-chart/circle';
import ColorExample from './examples/radar-chart/color';
import LabelCustomExample from './examples/radar-chart/label-custom';
import LabelLongExample from './examples/radar-chart/label-long';
import LegendAndPatternFillExample from './examples/radar-chart/legend-and-pattern-fill';
import RotatedExample from './examples/radar-chart/rotated';
import ScaleExample from './examples/radar-chart/scale';
import TooltipExample from './examples/radar-chart/tooltip';
import TickSizeExample from './examples/radar-chart/tick-size';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Radar-Chart',
};

export default meta;

export const BackgroundColor: StoryObj = {
  render: BackgroundColorExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const Circle: StoryObj = {
  render: CircleExample,
};

export const Color: StoryObj = {
  render: ColorExample,
};

export const LabelCustom: StoryObj = {
  render: LabelCustomExample,
};

export const LabelLong: StoryObj = {
  render: LabelLongExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};

export const Rotated: StoryObj = {
  render: RotatedExample,
};

export const Scale: StoryObj = {
  render: ScaleExample,
};

export const Tooltip: StoryObj = {
  render: TooltipExample,
};

export const TickSize: StoryObj = {
  render: TickSizeExample,
};