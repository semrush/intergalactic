import type { Meta, StoryObj } from '@storybook/react-vite';

import HorizontalBarPropsExample, { defaultProps as HorizontalBarPropsDefaultProps } from './examples/bar-horizontal/horizontal-bar-props';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Horizontal-Chart',
};
export default meta;
export const HorizontalBarProps: StoryObj = {
  render: HorizontalBarPropsExample,
  argTypes: {
    barColor: { control: 'color' },
    barRadius: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    barTransparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    primaryText: { control: 'boolean' },
  },
  args: HorizontalBarPropsDefaultProps,
  parameters: { sourceCode: 'import { Plot, YAxis, XAxis, HorizontalBar } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear, scaleBand } from \'d3-scale\';\nimport React from \'react\';\n\ninterface HorizontalBarPropsStoryProps {\n  barColor?: string;\n  barRadius?: number | number[];\n  barTransparent?: boolean;\n  maxBarSize?: number;\n  duration?: number;\n  primaryText?: boolean;\n}\n\nconst Demo = (props: HorizontalBarPropsStoryProps = {}) => {\n  const {\n    barColor,\n    barRadius,\n    barTransparent = false,\n    maxBarSize,\n    duration = 0,\n    primaryText = true,\n  } = props;\n\n  const MARGIN = 40;\n  const width = 400;\n  const height = 200;\n\n  const data = [\n    { category: \'Alpha\', value: 10 },\n    { category: \'Beta\', value: 5 },\n    { category: \'Gamma\', value: 8 },\n    { category: \'Delta\', value: 3 },\n    { category: \'Epsilon\', value: 12 },\n  ];\n\n  const xScale = scaleLinear()\n    .range([MARGIN, width - MARGIN])\n    .domain([0, 15]);\n\n  const yScale = scaleBand<string>()\n    .range([height - MARGIN, MARGIN])\n    .domain(data.map((d) => d.category))\n    .paddingInner(0.4)\n    .paddingOuter(0.2);\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks primaryText={primaryText} />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n        <XAxis.Grid />\n      </XAxis>\n      <HorizontalBar\n        x=\'value\'\n        y=\'category\'\n        duration={duration}\n        color={barColor}\n        r={barRadius}\n        transparent={barTransparent}\n        maxBarSize={maxBarSize}\n      />\n    </Plot>\n  );\n};\n\nexport const defaultProps: HorizontalBarPropsStoryProps = {\n  duration: 0,\n  primaryText: true,\n};\n\nDemo.defaultProps = defaultProps;\n\nexport default Demo;\n' },
};
