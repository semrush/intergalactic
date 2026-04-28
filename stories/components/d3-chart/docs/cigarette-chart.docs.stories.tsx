import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/cigarette-chart/basic-usage';
import ClickInteractionExample from './examples/cigarette-chart/click-interaction';
import CustomA11yExample from './examples/cigarette-chart/custom-a11y';
import LayoutsExample from './examples/cigarette-chart/layouts';
import NoValuesExample from './examples/cigarette-chart/no-values';
import SkeletonExample from './examples/cigarette-chart/skeleton';
import TooltipTypeExample from './examples/cigarette-chart/tooltip-type';
const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Cigarette-Chart',
};
export default meta;
export const ClickInteraction: StoryObj = {
  render: ClickInteractionExample,
  parameters: { sourceCode: 'import { Chart } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nimport CigaretteMockData from \'../../../__mocks__/cigarette\';\n\nfunction Demo() {\n  const handleClick = (key: string) => {\n    console.log(\'click\', key);\n  };\n\n  return (\n    <Chart.Cigarette\n      data={data}\n      plotWidth={400}\n      plotHeight={28}\n      onClick={handleClick}\n      aria-label=\'Cigarette chart\'\n    />\n  );\n}\n\nconst data = CigaretteMockData.Default;\n\nexport default Demo;\n' },
};
export const CustomA11y: StoryObj = {
  render: CustomA11yExample,
  parameters: { sourceCode: 'import type { PlotSummarizerConfig } from \'@semcore/ui/d3-chart\';\nimport { Chart } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nimport CigaretteMockData from \'../../../__mocks__/cigarette\';\n\nconst a11yAltTextConfig: PlotSummarizerConfig = {\n  valuesFormatter: (value: unknown) => {\n    const numericValue = typeof value === \'number\' ? value : Number(value);\n    const percent = ((numericValue / sum) * 100).toFixed(2);\n    return `${numericValue} (${percent}%)`;\n  },\n};\n\nfunction Demo() {\n  return (\n    <Chart.Cigarette\n      data={data}\n      plotWidth={400}\n      plotHeight={28}\n      showLegend={true}\n      a11yAltTextConfig={a11yAltTextConfig}\n      aria-label=\'Cigarette chart\'\n    />\n  );\n}\n\nconst data = CigaretteMockData.Default;\n\nconst sum = Object.values(data).reduce((acc, item) => acc + item, 0);\n\nexport default Demo;\n' },
};
export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
  parameters: { sourceCode: 'import { Chart } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nimport CigaretteMockData from \'../../../__mocks__/cigarette\';\n\nfunction Demo() {\n  return (\n    <Chart.Cigarette data={data} plotWidth={400} plotHeight={28} aria-label=\'Cigarette chart\' />\n  );\n}\n\nconst data = CigaretteMockData.Default;\n\nexport default Demo;\n' },
};
export const Layouts: StoryObj = {
  render: LayoutsExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport { Chart } from \'@semcore/ui/d3-chart\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nimport CigaretteMockData from \'../../../__mocks__/cigarette\';\n\nfunction Demo() {\n  return (\n    <Flex gap={15} flexWrap={true}>\n      <Chart.Cigarette\n        data={data}\n        plotWidth={280}\n        plotHeight={28}\n        header={(\n          <Text size={500} bold mb={2}>\n            Total value\n          </Text>\n        )}\n        showLegend={true}\n        tooltipTitle=\'Some title for tooltip\'\n        showTotalInTooltip={true}\n        aria-label=\'Cigarette chart\'\n      />\n\n      <Chart.Cigarette\n        data={data}\n        plotWidth={44}\n        plotHeight={200}\n        invertAxis={false}\n        header={(\n          <Text size={500} bold>\n            Total value\n          </Text>\n        )}\n        showLegend={true}\n        aria-label=\'Cigarette chart\'\n      />\n    </Flex>\n  );\n}\n\nconst data = CigaretteMockData.Default;\n\nexport default Demo;\n' },
};
export const NoValues: StoryObj = {
  render: NoValuesExample,
  parameters: { sourceCode: 'import type { interpolateValue } from \'@semcore/ui/d3-chart\';\nimport { Chart } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nimport CigaretteMockData from \'../../../__mocks__/cigarette\';\n\nfunction Demo() {\n  return (\n    <Chart.Cigarette\n      data={data}\n      plotWidth={400}\n      plotHeight={28}\n      showLegend={true}\n      aria-label=\'Cigarette chart\'\n    />\n  );\n}\n\n// @ts-ignore\nconst data = CigaretteMockData.EdgeCase as Record<string, number | typeof interpolateValue>;\n\nexport default Demo;\n' },
};
export const TooltipType: StoryObj = {
  render: TooltipTypeExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport { Chart } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nimport CigaretteMockData from \'../../../__mocks__/cigarette\';\n\nfunction Demo() {\n  return (\n    <Flex gap={10} flexWrap={true}>\n      <Chart.Cigarette\n        data={data}\n        plotWidth={400}\n        plotHeight={28}\n        showPercentValueInTooltip\n        aria-label=\'Cigarette chart\'\n      />\n      <Chart.Cigarette\n        data={data}\n        plotWidth={400}\n        plotHeight={28}\n        tooltipViewType=\'single\'\n        showPercentValueInTooltip\n        aria-label=\'Cigarette chart\'\n      />\n    </Flex>\n  );\n}\n\nconst data = CigaretteMockData.Default;\n\nexport default Demo;\n' },
};
export const Skeleton: StoryObj = {
  render: SkeletonExample,
  parameters: { sourceCode: 'import Skeleton from \'@semcore/ui/skeleton\';\nimport React from \'react\';\n\nfunction Demo() {\n  return (\n    <Skeleton>\n      <Skeleton.Text height={24} />\n    </Skeleton>\n  );\n}\n\nexport default Demo;\n' },
};
