import type { Meta, StoryObj } from '@storybook/react-vite';

import SyncTooltipsExample from './examples/sync_tooltips';
const meta: Meta = {
  title: 'Components/d3Charts/Advanced/Sync tooltips',
};
export default meta;
export const SyncTooltips: StoryObj = {
  render: SyncTooltipsExample,
  parameters: { sourceCode: 'import { Box } from \'@semcore/ui/base-components\';\nimport { Chart, PlotEventEmitter } from \'@semcore/ui/d3-chart\';\nimport { scaleBand } from \'d3-scale\';\nimport React from \'react\';\n\nconst ee = new PlotEventEmitter();\n\nconst Demo = () => {\n  const plotWidth = 500;\n  const marginY = 40;\n  const range = [marginY, plotWidth - 6]; // 6 - default plotPadding\n\n  return (\n    <Box>\n      here will be charts\n\n      <Chart.Line\n        data={data1}\n        plotWidth={plotWidth}\n        plotHeight={220}\n        groupKey=\'x\'\n        aria-label=\'Line chart\'\n        eventEmitter={ee}\n        // @ts-ignore\n        xScale={scaleBand(data1.map((item) => item.x), range)}\n      />\n\n      <Chart.Bar\n        groupKey=\'x\'\n        data={data2}\n        plotWidth={plotWidth}\n        plotHeight={300}\n        aria-label=\'Bar chart\'\n        eventEmitter={ee}\n        xScale={scaleBand(data2.map((item) => item.x), range)}\n      />\n\n      <Chart.Area\n        groupKey=\'x\'\n        data={data3}\n        plotWidth={plotWidth}\n        plotHeight={180}\n        aria-label=\'Area chart\'\n        eventEmitter={ee}\n        // @ts-ignore\n        xScale={scaleBand(data3.map((item) => item.x), range)}\n      />\n    </Box>\n  );\n};\n\nexport default Demo;\n\nconst data1 = Array(10)\n  .fill({})\n  .map((d, i) => ({\n    x: i,\n    line1: Math.random() * 10,\n    line2: Math.random() * 10,\n  }));\nconst data2 = Array(10)\n  .fill({})\n  .map((d, i) => ({\n    x: i,\n    bar1: Math.random() * 10,\n    bar2: Math.random() * 10,\n  })); ;\nconst data3 = Array(10)\n  .fill({})\n  .map((d, i) => ({\n    x: i,\n    line1: Math.random() * 10,\n    line2: Math.random() * 10,\n  }));\n' },
};
