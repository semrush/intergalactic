import type { Meta, StoryObj } from '@storybook/react-vite';

import GridAxisPropsExample, { defaultProps as BasicUsageProps } from './examples/d3-chart/grid-axis-props';
import HoveredTickExample, { defaultProps as HoveredTickProps } from './examples/d3-chart/hovered-tick';
import PlotAndA11yPropsExample from './examples/d3-chart/plot-props';
import ReferenceLinePropsExample from './examples/d3-chart/reference-line-props';
import TooltipDefaultFormatExample, { defaultProps as TooltipDefaultFormatProps } from './examples/d3-chart/tooltip-default-format';
import TooltipDeltaEdgeCasesExample, { defaultProps as TooltipDeltaEdgeCasesProps } from './examples/d3-chart/tooltip-delta-edge-cases';
import XAsisiRenderDelayedExample from './examples/d3-chart/xAxis-ticks-render-delayed';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/D3-Chart',
};

export default meta;

export const PlotAndA11yProps: StoryObj = {
  render: PlotAndA11yPropsExample,
};

export const GridAxisProps: StoryObj<typeof BasicUsageProps> = {
  render: GridAxisPropsExample,
  argTypes: {
    yPosition: { control: 'select', options: ['left', 'right'] },
    yHide: { control: 'boolean' },
    yTicks: { control: 'object' },
    yTickSuffix: { control: 'text' },
    yTicksHide: { control: 'boolean' },
    yTicksMultiline: { control: 'boolean' },
    yTicksPrimaryText: { control: 'boolean' },
    yShowGrid: { control: 'boolean' },
    yShowTitle: { control: 'boolean' },
    yTitle: { control: 'text' },
    yTitlePosition: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    yVerticalWritingMode: { control: 'boolean' },
    xPosition: { control: 'select', options: ['top', 'bottom'] },
    xHide: { control: 'boolean' },
    xCategories: { control: 'object' },
    xTicksHide: { control: 'boolean' },
    xTicksMultiline: { control: 'boolean' },
    xTicksPrimaryText: { control: 'boolean' },
    xShowGrid: { control: 'boolean' },
    xShowTitle: { control: 'boolean' },
    xTitle: { control: 'text' },
    xTitlePosition: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    xVerticalWritingMode: { control: 'boolean' },
  },
  args: BasicUsageProps,
};

export const ReferenceLineProps: StoryObj = {
  render: ReferenceLinePropsExample,
};

export const XAsisiRenderDelayed: StoryObj = {
  render: XAsisiRenderDelayedExample,
};

export const HoveredTick: StoryObj<typeof HoveredTickProps> = {
  render: HoveredTickExample,
  argTypes: {
    hoverType: { control: 'select', options: ['Line', 'Rect'] },
    hideTickHover: { control: 'boolean' },
    hideHoverLine: { control: 'boolean' },
    width: { control: { type: 'number' } },
    height: { control: { type: 'number' } },
  },
  args: HoveredTickProps,
};

export const TooltipDeltaEdgeCases = {
  render: TooltipDeltaEdgeCasesExample,
  argTypes: getChartArgTypes({
    deltaOverride: {
      control: 'select',
      options: ['off', 'divideByZero'],
    },
  }),
  args: TooltipDeltaEdgeCasesProps,
};

export const TooltipDefaultFormat = {
  render: TooltipDefaultFormatExample,
  argTypes: getChartArgTypes({
    titleFormat: {
      control: 'select',
      options: ['off', 'withoutWeekday', 'short', 'monthAndYear'],
    },
  }),
  args: TooltipDefaultFormatProps,
};
