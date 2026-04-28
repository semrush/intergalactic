import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as basicUsageProps } from './examples/donut-chart/basic-usage';
import DonutPropsExample, { defaultProps as donutPropsExampleProps } from './examples/donut-chart/donut-props';
import OnClickPieExample from './examples/donut-chart/on-click-pie';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Donut-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: basicUsageProps,
};
export const DonutProps = {
  render: DonutPropsExample,
  argTypes: {
    innerRadius: { control: { type: 'number', min: 0, max: 150 } },
    outerRadius: { control: { type: 'number', min: 0, max: 150 } },
    paddingAngle: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    halfsize: { control: { type: 'boolean' } },
    patterns: { control: { type: 'boolean' } },
    showLabel: { control: { type: 'boolean' } },
    showTooltip: { control: { type: 'boolean' } },
    data: { control: { type: 'object' } },
  },
  args: donutPropsExampleProps,
};
export const OnClickPie: StoryObj = {
  render: OnClickPieExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport Checkbox from \'@semcore/ui/checkbox\';\nimport { Donut, Plot } from \'@semcore/ui/d3-chart\';\nimport React from \'react\';\n\nconst data = { a: 3, b: 1, c: 2 };\n\nconst Demo = () => {\n  const [selected, setSelected] = React.useState([\'b\']);\n  const handleCheckboxToggle = React.useCallback(\n    (name: any) => () => {\n      setSelected((selected) => {\n        if (selected.includes(name)) {\n          return selected.filter((selectedName) => selectedName !== name);\n        } else {\n          return [...selected, name];\n        }\n      });\n    },\n    [setSelected],\n  );\n\n  const onClick = () => {\n    console.log(\'I call on mount\');\n  };\n\n  return (\n    <Flex mt={3} alignItems=\'flex-start\' flexWrap>\n      <Plot height={120} width={120} m=\'0 28px 24px 0\' data={data}>\n        <Donut innerRadius={30} onClick={onClick}>\n          {Object.keys(data).map((name, index) => (\n            <Donut.Pie\n              key={name}\n              dataKey={name}\n              name={`Pie ${index}`}\n              active={selected.includes(name)}\n\n            />\n          ))}\n        </Donut>\n      </Plot>\n      <Flex direction=\'column\'>\n        {Object.keys(data).map((name, index) => {\n          return (\n            <Checkbox\n              key={name}\n              id={name}\n              theme={`chart-palette-order-${index + 1}`}\n            >\n              <Checkbox.Value\n                value={name}\n                checked={selected.includes(name)}\n                onChange={handleCheckboxToggle(name)}\n              />\n              <Checkbox.Text>{`Option ${name.toUpperCase()}`}</Checkbox.Text>\n            </Checkbox>\n          );\n        })}\n      </Flex>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
};
