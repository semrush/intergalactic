import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/radial-tree-chart/basic';
import BasicUsageExample from './examples/radial-tree-chart/basic-usage';
import CustomSvgInCenterExample from './examples/radial-tree-chart/custom-svg-in-center';
import EdgeCasesExample from './examples/radial-tree-chart/edge-cases';
import MulticolorAndA11yExample from './examples/radial-tree-chart/multicolor-and-accessibility';
import MultilineTextExample from './examples/radial-tree-chart/multiline-text';
const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Radial-Tree-Chart',
};
export default meta;
export const Basic: StoryObj = {
  render: BasicExample,
  parameters: { sourceCode: 'import LikeM from \'@semcore/icon/Like/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport { Plot, RadialTree } from \'@semcore/ui/d3-chart\';\nimport Select from \'@semcore/ui/select\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nimport RadialMockData from \'../../../__mocks__/radial\';\n\nconst Demo = () => {\n  const width = 500;\n  const height = 500;\n  const [genre, setGenre] = React.useState<string | null>(data[0].key);\n\n  return (\n    <Flex direction=\'column\' gap={2}>\n      <label htmlFor=\'genre-select\'>Movie of what genre to pick today?</label>\n      <Select\n        id=\'genre-select\'\n        options={data.map(({ label, key }) => ({ value: key, children: label }))}\n        value={genre}\n        onChange={setGenre}\n      />\n      <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>\n        <RadialTree activeKey={genre} onActiveKeyChange={setGenre}>\n          <RadialTree.Radian>\n            <RadialTree.Radian.Label />\n            <RadialTree.Radian.Line />\n            <RadialTree.Radian.Cap />\n            <RadialTree.Radian.Icon tag={LikeM} />\n          </RadialTree.Radian>\n          <RadialTree.Title>Movies</RadialTree.Title>\n        </RadialTree>\n      </Plot>\n    </Flex>\n  );\n};\n\nconst data = RadialMockData.Movies;\n\nexport default Demo;\n' },
};
export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
  parameters: { sourceCode: 'import { Plot, RadialTree } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nimport RadialMockData from \'../../../__mocks__/radial\';\n\nconst Demo = () => {\n  const width = 500;\n  const height = 500;\n\n  return (\n    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>\n      <RadialTree color=\'chart-palette-order-9\'>\n        <RadialTree.Radian>\n          <RadialTree.Radian.Label />\n          <RadialTree.Radian.Line />\n          <RadialTree.Radian.Cap />\n          <RadialTree.Radian.Icon />\n        </RadialTree.Radian>\n        <RadialTree.Title>Sleeping</RadialTree.Title>\n      </RadialTree>\n    </Plot>\n  );\n};\n\nconst data = RadialMockData.Default;\n\nexport default Demo;\n' },
};
export const CustomSvgInCenter: StoryObj = {
  render: CustomSvgInCenterExample,
  parameters: { sourceCode: 'import { Plot, RadialTree } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nimport RadialMockData from \'../../../__mocks__/radial\';\n\nconst Demo = () => {\n  const width = 500;\n  const height = 500;\n\n  return (\n    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>\n      <RadialTree centralMargin={85} color=\'blue-400\'>\n        <RadialTree.Radian>\n          <RadialTree.Radian.Label />\n          <RadialTree.Radian.Line />\n          <RadialTree.Radian.Cap />\n          <RadialTree.Radian.Icon />\n        </RadialTree.Radian>\n        <circle r={60} cx={width / 2} cy={height / 2} fill=\'#008FF8\' />\n        <RadialTree.Title color=\'white\'>Sleeping</RadialTree.Title>\n      </RadialTree>\n    </Plot>\n  );\n};\n\nconst data = RadialMockData.Default;\n\nexport default Demo;\n' },
};
export const EdgeCases: StoryObj = {
  render: EdgeCasesExample,
  parameters: { sourceCode: 'import { RadialTreeChartSkeleton } from \'@semcore/ui/skeleton\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return <RadialTreeChartSkeleton />;\n};\n\nexport default Demo;\n' },
};
export const MulticolorAndA11y: StoryObj = {
  render: MulticolorAndA11yExample,
  parameters: { sourceCode: 'import LikeM from \'@semcore/icon/Like/m\';\nimport { Plot, RadialTree } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nimport RadialMockData from \'../../../__mocks__/radial\';\n\nconst Demo = () => {\n  const width = 500;\n  const height = 500;\n\n  return (\n    <Plot\n      data={data}\n      scale={[scaleLinear(), scaleLinear()]}\n      width={width}\n      height={height}\n      patterns\n    >\n      <RadialTree>\n        <RadialTree.Radian>\n          <RadialTree.Radian.Label />\n          <RadialTree.Radian.Line />\n          <RadialTree.Radian.Cap />\n          <RadialTree.Radian.Icon tag={LikeM} />\n        </RadialTree.Radian>\n        <RadialTree.Title>Movies</RadialTree.Title>\n      </RadialTree>\n    </Plot>\n  );\n};\n\nconst data = RadialMockData.MoviesWithPaletteColor;\n\nexport default Demo;\n' },
};
export const MultilineText: StoryObj = {
  render: MultilineTextExample,
  parameters: { sourceCode: 'import { Plot, RadialTree } from \'@semcore/ui/d3-chart\';\nimport { scaleLinear } from \'d3-scale\';\nimport React from \'react\';\n\nimport RadialMockData from \'../../../__mocks__/radial\';\n\nconst Demo = () => {\n  const width = 500;\n  const height = 500;\n\n  const textSize = 12;\n  const lineHeight = textSize * 1.2;\n  const textLines = [\'Lorem ipsum\', \'dolor\', \'sit amet\'];\n\n  return (\n    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>\n      <RadialTree color=\'chart-palette-order-9\' textSize={textSize}>\n        <RadialTree.Radian>\n          <RadialTree.Radian.Label />\n          <RadialTree.Radian.Line />\n          <RadialTree.Radian.Cap />\n          <RadialTree.Radian.Icon />\n        </RadialTree.Radian>\n        <RadialTree.Title textSize={lineHeight} color=\'chart-palette-order-9\'>\n          {textLines.map((line, lineIndex) => (\n            <tspan\n              key={line}\n              x={width / 2}\n              y={height / 2 + (-(textLines.length - 1) / 2 + lineIndex) * lineHeight}\n            >\n              {line}\n            </tspan>\n          ))}\n        </RadialTree.Title>\n      </RadialTree>\n    </Plot>\n  );\n};\n\nconst data = RadialMockData.MultilineText;\n\nexport default Demo;\n' },
};
