import type { Meta, StoryObj } from '@storybook/react-vite';

import { getChartArgTypes } from './examples/stories_props_helper';
import BasicUsageExample, { defaultProps as ShowLegendPropExampleProps } from './examples/venn-chart/basic-usage';
import onClickVennExample from './examples/venn-chart/on-click-venn';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Venn-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: ShowLegendPropExampleProps,
};
export const onClickVenn: StoryObj = {
  render: onClickVennExample,
  parameters: { sourceCode: 'import { Plot, Venn } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const onClickHandler = () => {\n    console.log(\'I call on mount\');\n  };\n  return (\n    <Plot height={300} width={400} data={data}>\n      <Venn>\n        <Venn.Circle dataKey=\'G\' name=\'G\' onClick={() => onClickHandler()} />\n        <Venn.Circle dataKey=\'F\' name=\'F\' />\n        <Venn.Circle dataKey=\'C\' name=\'C\' />\n        <Venn.Intersection dataKey=\'G/F\' name=\'G/F\' />\n        <Venn.Intersection dataKey=\'G/C\' name=\'G/C\' />\n        <Venn.Intersection dataKey=\'F/C\' name=\'F/C\' />\n        <Venn.Intersection\n          dataKey=\'G/F/C\'\n          name=\'G/F/C\'\n          style={{\n            stroke: \'rgba(221, 255, 0, 1)\',\n            fill: \'rgba(89, 0, 255, 1)\',\n            fillOpacity: 0.3,\n          }}\n        />\n      </Venn>\n    </Plot>\n  );\n};\n\nconst data = {\n  \'G\': 200,\n  \'F\': 200,\n  \'C\': 200,\n  \'F/C\': 100,\n};\n\nexport default Demo;\n' },
};
