import type { BarChartProps } from '@semcore/ui/d3-chart';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BarPropsExample, { defaultProps as BarPropsDefaultProps } from './examples/bar-chart/bars-props';
import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/bar-chart/basic-usage';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Chart',
};
export default meta;
export const BarProps: StoryObj = {
  render: BarPropsExample,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['#3498db', 'yellow'],
    },
    r: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    hMin: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    hide: { control: 'boolean' },
    transparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: BarPropsDefaultProps,
  parameters: { sourceCode: 'import { Plot, YAxis, XAxis, Bar } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear, scaleBand } from \'d3-scale\';\nimport React from \'react\';\n\ninterface BarsPropsStoryProps {\n  color?: string;\n  r?: number;\n  hMin?: number;\n  hide?: boolean;\n  transparent?: boolean;\n  maxBarSize?: number;\n  duration?: number;\n}\n\nconst Demo = (props: BarsPropsStoryProps = {}) => {\n  const MARGIN = 40;\n  const width = 400;\n  const height = 200;\n\n  const data = [\n    { time: 0, stack1: 1, stack2: 4, stack3: 3 },\n    { time: 1, stack1: 2, stack2: 3, stack3: 4 },\n    { time: 2, stack1: 1, stack2: 4, stack3: 5 },\n    { time: 3, stack1: 3, stack2: 2, stack3: 6 },\n    { time: 4, stack1: 2, stack2: 4, stack3: 4 },\n    { time: 5, stack1: 3, stack2: 4, stack3: 3 },\n    { time: 6, stack1: 4, stack2: 1, stack3: 5 },\n    { time: 7, stack1: 2, stack2: 5, stack3: 3 },\n    { time: 8, stack1: 2, stack2: 6, stack3: 5 },\n    { time: 9, stack1: 5, stack2: 5, stack3: 3 },\n  ];\n\n  const xScale = scaleBand<number>()\n    .range([MARGIN, width - MARGIN])\n    .domain(data.map((d) => d.time))\n    .paddingInner(0.4)\n    .paddingOuter(0.2);\n\n  const yScale = scaleLinear()\n    .range([height - MARGIN, MARGIN])\n    .domain([0, 15]);\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks />\n        <YAxis.Grid />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n      </XAxis>\n      <Bar\n        x=\'time\'\n        y=\'stack1\'\n        duration={props.duration}\n        color={props.color}\n        r={props.r}\n        hMin={props.hMin}\n        hide={props.hide}\n        transparent={props.transparent}\n        maxBarSize={props.maxBarSize}\n      />\n    </Plot>\n  );\n};\n\nexport const defaultProps: BarsPropsStoryProps = {\n  duration: 0,\n  color: undefined,\n  hMin: undefined,\n  hide: undefined,\n  transparent: undefined,\n  maxBarSize: undefined,\n};\n\nDemo.defaultProps = defaultProps;\n\nexport default Demo;\n' },
};
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    type: { control: 'select', options: ['stack', 'group'] },
  }),
  args: BasicUsageProps,
};
