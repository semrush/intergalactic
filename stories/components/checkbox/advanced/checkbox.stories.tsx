import Checkbox from '@semcore/ui/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AriaLabelPropsDrillingExample from './examples/aria_label_props_drilling';
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Advanced',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const AriaLabelPropsDrilling: Story = {
  render: AriaLabelPropsDrillingExample,
  parameters: { sourceCode: 'import Checkbox from \'@semcore/ui/checkbox\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <div id=\'mylabel\'>apples</div>\n      <Checkbox aria-label=\'fruit\' aria-describedby=\'mylabel\'>\n        <Checkbox.Value>\n          <Checkbox.Value.Control data-testid=\'checkbox_input_tag\' />\n          <Checkbox.Value.CheckMark />\n        </Checkbox.Value>\n      </Checkbox>\n    </>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Checkbox from \'@semcore/ui/checkbox\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <div id=\'mylabel\'>apples</div>\n      <Checkbox aria-label=\'fruit\' aria-describedby=\'mylabel\'>\n        <Checkbox.Value>\n          <Checkbox.Value.Control data-testid=\'checkbox_input_tag\' />\n          <Checkbox.Value.CheckMark />\n        </Checkbox.Value>\n      </Checkbox>\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
