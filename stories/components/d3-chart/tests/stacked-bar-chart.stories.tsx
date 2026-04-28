import type { Meta, StoryObj } from '@storybook/react-vite';

import StackBarPropsExample, { defaultProps as StackBarPropsDefaultProps } from './examples/stacked-bar-chart/stack-bar-props-cases';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Stacked-Bar-Chart',
};
export default meta;
export const StackBarProps: StoryObj = {
  render: StackBarPropsExample,
  argTypes: {
    barColor1: {
      control: { type: 'select' },
      options: ['#3498db', 'yellow'],
    },
    barColor2: {
      control: { type: 'select' },
      options: ['#3bdb30ff', 'pink'],
    }, barColor3: {
      control: { type: 'select' },
      options: ['#db309fff', 'violet'],
    },
    barRadius: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    barHMin: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    barTransparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: StackBarPropsDefaultProps,
  parameters: { sourceCode: 'import { Plot, YAxis, XAxis, StackBar } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear, scaleBand } from \'d3-scale\';\nimport React from \'react\';\n\ninterface StackBarPropsStoryProps {\n  barColor1?: string;\n  barColor2?: string;\n  barColor3?: string;\n  barRadius?: number;\n  barHMin?: number;\n  barTransparent?: boolean;\n  maxBarSize?: number;\n  duration?: number;\n}\n\nconst Demo = (props: StackBarPropsStoryProps = {}) => {\n  const {\n    barColor1,\n    barColor2,\n    barColor3,\n    barRadius,\n    barHMin,\n    barTransparent = false,\n    maxBarSize,\n    duration = 0,\n  } = props;\n\n  const MARGIN = 40;\n  const width = 500;\n  const height = 300;\n\n  const data = [\n    { time: 0, stack1: 1, stack2: 4, stack3: 3 },\n    { time: 1, stack1: 2, stack2: 3, stack3: 4 },\n    { time: 2, stack1: 1, stack2: 4, stack3: 5 },\n    { time: 3, stack1: 3, stack2: 2, stack3: 6 },\n    { time: 4, stack1: 2, stack2: 4, stack3: 4 },\n    { time: 5, stack1: 3, stack2: 4, stack3: 3 },\n    { time: 6, stack1: 4, stack2: 1, stack3: 5 },\n    { time: 7, stack1: 2, stack2: 5, stack3: 3 },\n    { time: 8, stack1: 2, stack2: 6, stack3: 5 },\n    { time: 9, stack1: 5, stack2: 5, stack3: 3 },\n  ];\n\n  const xScale = scaleBand()\n    .range([MARGIN, width - MARGIN])\n    .domain(data.map((d) => String(d.time)))\n    .paddingInner(0.4)\n    .paddingOuter(0.2);\n\n  const yScale = scaleLinear()\n    .range([height - MARGIN, MARGIN])\n    .domain([0, 15]);\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks />\n        <YAxis.Grid />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n      </XAxis>\n      <StackBar x=\'time\' maxBarSize={maxBarSize}>\n        <StackBar.Bar\n          y=\'stack1\'\n          color={barColor1}\n          duration={duration}\n          r={barRadius}\n          hMin={barHMin}\n          transparent={barTransparent}\n        />\n        <StackBar.Bar\n          y=\'stack2\'\n          color={barColor2}\n          duration={duration}\n          r={barRadius}\n          hMin={barHMin}\n          transparent={barTransparent}\n        />\n        <StackBar.Bar\n          y=\'stack3\'\n          color={barColor3}\n          duration={duration}\n          r={barRadius}\n          hMin={barHMin}\n          transparent={barTransparent}\n        />\n      </StackBar>\n    </Plot>\n  );\n};\n\nexport const defaultProps: StackBarPropsStoryProps = {\n  duration: 0,\n  barColor1: \'yellow\',\n  barColor2: \'blue\',\n  barColor3: \'violet\',\n  barRadius: undefined,\n  barHMin: undefined,\n  barTransparent: undefined,\n};\n\nDemo.defaultProps = defaultProps;\n\nexport default Demo;\n' },
};
