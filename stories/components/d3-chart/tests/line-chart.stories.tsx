import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/line-chart/basic-usage';
import HiddenHoverPropExample from './examples/line-chart/disable-hover-line';
import LineAreWithEmptyExample from './examples/line-chart/line-area-with-empty';
import LinesExample from './examples/line-chart/lines';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Line-Chart',
};
export default meta;
export const HiddenHoverProp: StoryObj = {
  render: HiddenHoverPropExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport { Plot, Line, XAxis, YAxis, HoverLine, minMax } from \'@semcore/ui/d3-chart\';\nimport { Text } from \'@semcore/ui/typography\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const MARGIN = 40;\n  const width = 500;\n  const height = 300;\n\n  const xScale = scaleLinear()\n    .range([MARGIN, width - MARGIN])\n    .domain(minMax(data, \'x\'));\n\n  const yScale = scaleLinear()\n    .range([height - MARGIN, MARGIN])\n    .domain([0, 10]);\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks />\n        <YAxis.Grid />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n      </XAxis>\n      <HoverLine.Tooltip\n        x=\'x\'\n        wMin={100}\n        hideHoverLine={(xIndex) => xIndex !== null && xIndex >= 5}\n      >\n        {({ xIndex }) => ({\n          children: xIndex !== null\n            ? (\n                <>\n                  <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>\n                  <Flex justifyContent=\'space-between\'>\n                    <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>\n                    <Text bold>{data[xIndex].y}</Text>\n                  </Flex>\n                </>\n              )\n            : (\n                <></>\n              ),\n        })}\n      </HoverLine.Tooltip>\n      <Line x=\'x\' y=\'y\' />\n    </Plot>\n  );\n};\n\nconst data = Array.from({ length: 20 }, (_, i) => ({\n  x: i,\n  y: (i % 5) + 2,\n}));\n\nexport default Demo;\n' },
};
export const LineAreWithEmpty: StoryObj = {
  render: LineAreWithEmptyExample,
  parameters: { sourceCode: 'import { Chart, Plot, YAxis, XAxis, Line, minMax } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear, scaleBand } from \'d3-scale\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const MARGIN = 40;\n  const width = 500;\n  const height = 300;\n\n  const xScale = scaleLinear()\n    .range([MARGIN, width - MARGIN])\n    .domain(minMax(data, \'x\'));\n\n  const yScale = scaleLinear()\n    .range([height - MARGIN, MARGIN])\n    .domain([0, 10]);\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks />\n        <YAxis.Grid />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n      </XAxis>\n      <Line x=\'x\' y=\'y\' duration={0}>\n        <Line.Area y0=\'y0\' y1=\'y1\' />\n        <Line.Null />\n      </Line>\n    </Plot>\n  );\n};\n\nconst data = Array(20)\n  .fill({})\n  .map((d, i) => {\n    const y = i > 8 && i < 16 ? Math.abs(Math.sin(Math.exp(i))) * 10 : null;\n\n    return {\n      x: i,\n      y,\n      y0: y ? y - 2 : null,\n      y1: y ? y + 2 : null,\n    };\n  });\n\nexport default Demo;\n' },
};
export const Lines: StoryObj = {
  render: LinesExample,
  parameters: { sourceCode: 'import { Plot, Line, XAxis, YAxis, minMax } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const MARGIN = 40;\n  const width = 500;\n  const height = 300;\n\n  const xScale = scaleLinear()\n    .range([MARGIN, width - MARGIN])\n    .domain(minMax(data, \'x\'));\n\n  const yScale = scaleLinear()\n    .range([height - MARGIN, MARGIN])\n    .domain([0, 10]);\n\n  return (\n    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>\n      <YAxis>\n        <YAxis.Ticks />\n        <YAxis.Grid />\n      </YAxis>\n      <XAxis>\n        <XAxis.Ticks />\n      </XAxis>\n      <Line x=\'x\' y=\'y1\' duration={0} color=\'yellow\'>\n        <Line.Dots display />\n      </Line>\n\n      <Line x=\'x\' y=\'y2\' duration={0} transparent={true}>\n        <Line.Dots display />\n      </Line>\n\n      <Line x=\'x\' y=\'y3\' duration={0} color=\'red\' hide>\n        <Line.Dots display />\n      </Line>\n    </Plot>\n  );\n};\n\nconst data = Array(20)\n  .fill({})\n  .map((d, i) => {\n    const y1 = Math.abs(Math.sin(Math.exp(i))) * 10;\n    const y2 = Math.abs(Math.cos(Math.exp(i))) * 10;\n    const y3 = Math.abs(Math.cos(Math.exp(i))) * 5;\n    return {\n      x: i,\n      y1: i === 2 || i === 3 ? null : y1,\n      y2: y2,\n      y3: y3,\n    };\n  });\n\nexport default Demo;\n' },
};
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: BasicUsageProps,
};
