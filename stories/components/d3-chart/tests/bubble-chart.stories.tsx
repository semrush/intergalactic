import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/bubble-chart/basic-usage';
import type { defaultProps as UsageProps } from './examples/bubble-chart/bubble-chart-on-click';
import BubbleChartOnClickExample from './examples/bubble-chart/bubble-chart-on-click';
import OnClickBubbleExample from './examples/bubble-chart/on-click-in-bubble';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bubble-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: BasicUsageProps,
};
export const OnClickBubble: StoryObj = {
  render: OnClickBubbleExample,
  parameters: { sourceCode: 'import { Plot, Bubble, XAxis, YAxis } from \'@semcore/ui/d3-chart\';\nimport { Text } from \'@semcore/ui/typography\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const MARGIN = 40;\n  const LEFT_MARGIN = 60;\n  const BOTTOM_MARGIN = 60;\n  const width = 500;\n  const height = 300;\n\n  const xScale = scaleLinear()\n    .range([LEFT_MARGIN, width - MARGIN])\n    .domain([-4, 14]);\n\n  const yScale = scaleLinear()\n    .range([height - BOTTOM_MARGIN, MARGIN])\n    .domain([-4, 14]);\n\n  const onClickHandler = () => {\n    console.log(\'I call on mount\');\n  };\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks />\n        <YAxis.Grid />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n      </XAxis>\n      <Bubble x=\'x\' y=\'y\' value=\'value\'>\n        {data.map((point, index) => (\n          <Bubble.Circle\n            key={index}\n            index={index}\n            onClick={() => onClickHandler()}\n          />\n        ))}\n        <Bubble.Tooltip>\n          {({ index }) => ({\n            children: (\n              <>\n                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>\n                <Text tag=\'div\'>X axis: {data[index].x}</Text>\n                <Text tag=\'div\'>Y axis: {data[index].y}</Text>\n                <Text tag=\'div\'>Value: {data[index].value}</Text>\n              </>\n            ),\n          })}\n        </Bubble.Tooltip>\n      </Bubble>\n\n    </Plot>\n  );\n};\n\nconst data = [\n  { x: 1, y: 2, value: 200 },\n  { x: 5, y: 6, value: 400 },\n  { x: 6, y: 7, value: 600 },\n  { x: 8, y: 9, value: 800 },\n  { x: 10, y: 11, value: 1000 },\n  { x: 6, y: 8, value: 900 },\n  { x: 7, y: 6, value: 700 },\n  { x: 8, y: 4, value: 500 },\n  { x: 9, y: 2, value: 300 },\n  { x: 10, y: 1, value: 100 },\n];\n\nexport default Demo;\n' },
};
export const BubbleChartOnClick: StoryObj<typeof UsageProps> = {
  render: BubbleChartOnClickExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: BasicUsageProps,
  parameters: { sourceCode: 'import { Chart } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\ntype BaseExampleProps = {\n  showLegend?: boolean;\n};\nconst Demo = (props: BaseExampleProps) => {\n  const { showLegend } = props;\n  const onClickHandler = () => {\n    console.log(\'Clicked bubble chart\');\n  };\n  return (\n    <>\n      { /* @ts-ignore: the value is not statically known, but it\'s valid at runtime */}\n      <Chart.Bubble\n        data={data}\n        plotWidth={500}\n        plotHeight={200}\n        onClickBubble={onClickHandler}\n        aria-label=\'Bubble chart\'\n        showLegend={showLegend}\n      />\n    </>\n  );\n};\n\nconst data = [\n  { x: 2, y: 3, value: 5040, label: \'label 1\' },\n  { x: 1, y: 9, value: 40, label: \'label 2\' },\n  { x: 6, y: 2, value: 45634, label: \'label 3\' },\n  { x: 4, y: 7, value: 245, label: \'label 4\' },\n  { x: 9, y: 5, value: 7462, label: \'label 5\' },\n];\n\nexport const defaultProps: BaseExampleProps = {\n  showLegend: false,\n};\n\nexport default Demo;\n' },
};
