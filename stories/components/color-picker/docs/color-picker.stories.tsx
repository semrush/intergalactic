import ColorPicker from '@semcore/ui/color-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { BasicExampleTest } from './__tests__/basic_example.test';
import BasicExampleExample from './examples/basic_example';
import CustomTriggerExample from './examples/custom_trigger';
import PalettemanagerExample from './examples/palettemanager';
import PredefinedPaletteExample from './examples/predefined_palette';
import { playWrapper } from '../../../utils/playWrapper';
const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Documentation',
  component: ColorPicker,
};
export default meta;
type Story = StoryObj<typeof ColorPicker>;
export const BasicExample: Story = {
  render: BasicExampleExample,
  play: playWrapper(BasicExampleTest),
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport ColorPicker, { PaletteManager } from \'@semcore/ui/color-picker\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Flex direction=\'column\'>\n      <Text tag=\'label\' size={200} htmlFor=\'main-theme-color\'>\n        Main theme color\n      </Text>\n      <ColorPicker>\n        <ColorPicker.Trigger mt={2} id=\'main-theme-color\' />\n        <ColorPicker.Popper>\n          <ColorPicker.Colors />\n          <PaletteManager>\n            <PaletteManager.Colors />\n            <PaletteManager.InputColor />\n          </PaletteManager>\n        </ColorPicker.Popper>\n      </ColorPicker>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
};
export const CustomTrigger: Story = {
  render: CustomTriggerExample,
  parameters: { sourceCode: 'import { Flex, Box } from \'@semcore/ui/base-components\';\nimport ColorPicker from \'@semcore/ui/color-picker\';\nimport Input from \'@semcore/ui/input\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const [value, setValue] = React.useState(\'#C695FF\');\n\n  return (\n    <Flex direction=\'column\' gap={2}>\n      <Text tag=\'label\' size={300} htmlFor=\'new-tag\'>\n        New tag\n      </Text>\n      <ColorPicker value={value} onChange={setValue}>\n        <Input w={300} size=\'l\'>\n          <ColorPicker.Trigger tag={Input.Addon} tabIndex={0} aria-label=\'New tag color\'>\n            <div\n              style={{\n                width: \'16px\',\n                height: \'16px\',\n                borderRadius: \'50%\',\n                border: \'1px solid var(--intergalactic-border-secondary)\',\n                backgroundColor: value,\n              }}\n            />\n          </ColorPicker.Trigger>\n          <Input.Value placeholder=\'Tag name\' id=\'new-tag\' />\n        </Input>\n        <ColorPicker.Popper>\n          <ColorPicker.Colors />\n        </ColorPicker.Popper>\n      </ColorPicker>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
};
export const Palettemanager: Story = {
  render: PalettemanagerExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport ColorPicker, { PaletteManager } from \'@semcore/ui/color-picker\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Flex direction=\'column\'>\n      <Text tag=\'label\' size={200} htmlFor=\'main-theme-color\'>\n        Main theme color\n      </Text>\n      <ColorPicker>\n        <ColorPicker.Trigger mt={2} id=\'main-theme-color\' />\n        <ColorPicker.Popper>\n          <ColorPicker.Colors />\n          <PaletteManager>\n            <PaletteManager.Colors />\n            <PaletteManager.InputColor />\n          </PaletteManager>\n        </ColorPicker.Popper>\n      </ColorPicker>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
};
export const PredefinedPalette: Story = {
  render: PredefinedPaletteExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport ColorPicker, { PaletteManager } from \'@semcore/ui/color-picker\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst Demo = () => {\n  const [value, setValue] = React.useState(\'#98848D\');\n  const [customColors, setCustomColors] = React.useState([\'#8649E6\', \'#8649E7\', \'#8649E8\']);\n\n  return (\n    <Flex direction=\'column\'>\n      <Text tag=\'label\' size={200} htmlFor=\'player-1-color\'>\n        Color\n      </Text>\n      <ColorPicker value={value} onChange={setValue}>\n        <ColorPicker.Trigger mt={2} id=\'player-1-color\' />\n        <ColorPicker.Popper>\n          <ColorPicker.Colors\n            colors={[\n              null,\n              \'#8649E1\',\n              \'#FF5733\',\n              \'#98848D\',\n              \'#8E3B29\',\n              \'#B0E727\',\n              \'#27D3E7\',\n              \'#2D747C\',\n              \'#6ad0de\',\n              \'#6E2D7C\',\n            ]}\n          />\n          <PaletteManager colors={customColors} onColorsChange={setCustomColors}>\n            <PaletteManager.Colors />\n            <PaletteManager.InputColor />\n          </PaletteManager>\n        </ColorPicker.Popper>\n      </ColorPicker>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
};
