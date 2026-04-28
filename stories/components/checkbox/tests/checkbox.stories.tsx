import Checkbox from '@semcore/ui/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

import GroupsExample from './examples/groups';
import StatesExample, { defaultExampleProps } from './examples/states';
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Tests',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;
const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  state: {
    control: { type: 'select' },
    options: ['normal', 'invalid'],
  },
  theme: {
    control: { type: 'select' },
    options: ['yellow', 'violet', 'pink'],
  },
  checked: {
    control: { type: 'boolean' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  indeterminate: {
    control: { type: 'boolean' },
  },
  color: {
    control: { type: 'select' },
    options: [undefined, 'violet'],
  },
} as const;
export const States: StoryObj<typeof defaultExampleProps> = {
  render: StatesExample,
  argTypes: commonArgTypes,
  args: defaultExampleProps,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport Checkbox from \'@semcore/ui/checkbox\';\nimport type { NSCheckbox } from \'@semcore/ui/checkbox\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\ntype CheckboxExampleProps = NSCheckbox.Props & { color?: \'string\'; autoFocus: boolean };\nconst Demo = (props: CheckboxExampleProps) => {\n  return (\n    <Flex m={5} data-test-id=\'checkbox\'>\n      <Flex gap={2} direction=\'column\' m={5}>\n        <Text size={100}>default</Text>\n        <Checkbox\n          size={props.size}\n          disabled={props.disabled}\n          theme={props.theme}\n          state={props.state}\n          indeterminate={props.indeterminate}\n          checked={props.checked}\n        >\n          <Checkbox.Value autoFocus={props.autoFocus} />\n          <Checkbox.Text color={props.color}>This isLabel</Checkbox.Text>\n        </Checkbox>\n      </Flex>\n\n    </Flex>\n  );\n};\n\nexport const defaultExampleProps: CheckboxExampleProps = {\n  size: \'m\',\n  color: undefined,\n  state: \'normal\',\n  theme: undefined,\n  checked: undefined,\n  disabled: undefined,\n  indeterminate: undefined,\n  autoFocus: false,\n};\n\nDemo.defaultProps = defaultExampleProps;\nexport default Demo;\n' },
};
export const Groups: Story = {
  render: GroupsExample,
  parameters: { sourceCode: 'import Checkbox from \'@semcore/ui/checkbox\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst fieldsetStyle = { border: \'none\' };\nconst ulStyle = { margin: 0, padding: 0 };\nconst liStyle = { listStyle: \'none\', margin: 0 };\n\nconst Demo = () => {\n  const [checked, setChecked] = React.useState([false, false, false]);\n\n  const handleItemChange = React.useCallback(\n    (index: number) => (value: boolean) => {\n      setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));\n    },\n    [setChecked],\n  );\n\n  return (\n    <>\n      <fieldset style={fieldsetStyle} data-testid=\'m\'>\n        <Text tag=\'legend\' size={200} mb={3}>\n          List of options\n        </Text>\n        <ul style={ulStyle}>\n          {checked.map((value, index) => (\n            <li key={index} style={liStyle}>\n              <Checkbox\n                mb={3}\n                key={index}\n                checked={value}\n                onChange={handleItemChange(index)}\n                label={`Option ${index + 1}`}\n              />\n            </li>\n          ))}\n        </ul>\n      </fieldset>\n\n      <fieldset style={fieldsetStyle} data-testid=\'l\'>\n        <Text tag=\'legend\' size={200} mb={3}>\n          List of options\n        </Text>\n        <ul style={ulStyle}>\n          {checked.map((value, index) => (\n            <li key={index} style={liStyle}>\n              <Checkbox\n                size=\'l\'\n                mb={3}\n                key={index}\n                checked={value}\n                onChange={handleItemChange(index)}\n                label={`Option ${index + 1}`}\n              />\n            </li>\n          ))}\n        </ul>\n      </fieldset>\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
