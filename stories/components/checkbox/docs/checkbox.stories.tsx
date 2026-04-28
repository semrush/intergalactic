import Checkbox from '@semcore/ui/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AdditionalPropsForInputExample from './examples/additional_props_for_input';
import BasicUsageExample from './examples/basic_usage';
import CheckboxWithOtherComponentsExample from './examples/checkbox_with_other_components';
import PartialSelectionExample from './examples/partial_selection';
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Documentation',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const AdditionalPropsForInput: Story = {
  render: AdditionalPropsForInputExample,
  parameters: { sourceCode: 'import Checkbox from \'@semcore/ui/checkbox\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Checkbox>\n      <Checkbox.Value>\n        <Checkbox.Value.Control data-testid=\'checkbox_input_tag\' />\n        <Checkbox.Value.CheckMark />\n      </Checkbox.Value>\n      <Checkbox.Text>Checkbox with custom properties</Checkbox.Text>\n    </Checkbox>\n  );\n};\n\nexport default Demo;\n' },
};
export const BasicUsage: Story = {
  render: BasicUsageExample,
  parameters: { sourceCode: 'import Checkbox from \'@semcore/ui/checkbox\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst fieldsetStyle = { border: \'none\' };\nconst ulStyle = { margin: 0, padding: 0 };\nconst liStyle = { listStyle: \'none\', margin: 0 };\n\nconst Demo = () => {\n  const [checked, setChecked] = React.useState([false, false, false]);\n\n  const handleItemChange = React.useCallback(\n    (index: number) => (value: boolean) => {\n      setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));\n    },\n    [setChecked],\n  );\n\n  return (\n    <fieldset style={fieldsetStyle}>\n      <Text tag=\'legend\' size={200} mb={3}>\n        List of options\n      </Text>\n      <ul style={ulStyle}>\n        {checked.map((value, index) => (\n          <li key={index} style={liStyle}>\n            <Checkbox\n              mb={3}\n              key={index}\n              checked={value}\n              onChange={handleItemChange(index)}\n              label={`Option ${index + 1}`}\n            />\n          </li>\n        ))}\n      </ul>\n    </fieldset>\n  );\n};\n\nexport default Demo;\n' },
};
export const CheckboxWithOtherComponents: Story = {
  render: CheckboxWithOtherComponentsExample,
  parameters: { sourceCode: 'import InfoM from \'@semcore/icon/Info/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport { ButtonLink } from \'@semcore/ui/button\';\nimport Checkbox from \'@semcore/ui/checkbox\';\nimport Link from \'@semcore/ui/link\';\nimport { DescriptionTooltip } from \'@semcore/ui/tooltip\';\nimport React from \'react\';\n\nfunction noop(e: React.SyntheticEvent) {\n  e.preventDefault();\n}\n\nconst Demo = () => (\n  <>\n    <Flex mb={3}>\n      <Checkbox>\n        <Checkbox.Value />\n        <Checkbox.Text size={200} display=\'flex\'>\n          Option 1\n          <DescriptionTooltip placement=\'right\'>\n            <DescriptionTooltip.Trigger\n              ml={1}\n              mt=\'-2px\'\n              tag={ButtonLink}\n              addonLeft={InfoM}\n              color=\'icon-secondary-neutral\'\n              aria-label=\'Additional info\'\n            />\n            <DescriptionTooltip.Popper aria-label=\'Additional info about checkbox item\'>\n              Place an additional information here!\n            </DescriptionTooltip.Popper>\n          </DescriptionTooltip>\n        </Checkbox.Text>\n      </Checkbox>\n    </Flex>\n\n    <Flex mb={3}>\n      <Checkbox>\n        <Checkbox.Value />\n        <Checkbox.Text size={200}>\n          Option 2\n          <Link ml={2} href=\'#\' onClick={noop}>\n            Learn more\n          </Link>\n        </Checkbox.Text>\n      </Checkbox>\n    </Flex>\n  </>\n);\n\nexport default Demo;\n' },
};
export const PartialSelection: Story = {
  render: PartialSelectionExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport Checkbox from \'@semcore/ui/checkbox\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const [checked, setChecked] = React.useState([false, false, false]);\n  const handleGroupChange = React.useCallback(\n    (value: boolean) => {\n      setChecked((checked) => checked.map(() => value));\n    },\n    [setChecked],\n  );\n  const handleItemChange = React.useCallback(\n    (index: number) => (value: boolean) => {\n      setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));\n    },\n    [setChecked],\n  );\n\n  return (\n    <>\n      <Flex>\n        <Checkbox\n          mb={3}\n          label=\'Group of options\'\n          onChange={handleGroupChange}\n          indeterminate={checked.includes(false) && checked.includes(true)}\n          checked={!checked.includes(false)}\n        />\n      </Flex>\n      {checked.map((value, index) => (\n        <Flex key={index} ml={6}>\n          <Checkbox\n            mb={3}\n            key={index}\n            checked={value}\n            onChange={handleItemChange(index)}\n            label={`Option ${index + 1}`}\n          />\n        </Flex>\n      ))}\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
