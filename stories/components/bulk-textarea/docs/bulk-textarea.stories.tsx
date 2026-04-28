import BulkTextarea from '@semcore/ui/bulk-textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';
const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Documentation',
  component: BulkTextarea,
};
export default meta;
export const BasicUsage: StoryObj<typeof BulkTextarea> = {
  render: BasicUsageExample,
  parameters: { sourceCode: 'import { Box, Flex } from \'@semcore/ui/base-components\';\nimport BulkTextarea from \'@semcore/ui/bulk-textarea\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst validateRow = (line: string, lines: string[]) => {\n  let isValid = true;\n  let errorMessage = \'\';\n\n  if (line.includes(\']\')) {\n    isValid = false;\n    errorMessage = \'Please remove one error value\';\n  } else if (line.includes(\'[\')) {\n    isValid = false;\n    errorMessage = \'Please fix this value = another error\';\n  }\n\n  return {\n    isValid,\n    errorMessage,\n  };\n};\n\nconst lineProcessing = (line: string) => {\n  return line.replace(/http:\\/\\//, \'\');\n};\n\nconst Demo = () => {\n  const [value, setValue] = React.useState(\'\');\n\n  return (\n    <Box>\n      <BulkTextarea\n        w={400}\n        value={value}\n        onChange={setValue}\n        lineValidation={validateRow}\n        maxLines={10}\n        size=\'l\'\n        linesDelimiters={[\',\']}\n        readonly={false}\n        disabled={false}\n        placeholder=\'Enter or paste a list using comma or Enter\'\n        minRows={2}\n        maxRows={10}\n        validateOn={[\'blur\']}\n        pasteProps={{\n          delimiter: \'\\n\',\n          skipEmptyLines: true,\n          lineProcessing,\n        }}\n        lineProcessing={lineProcessing}\n      >\n        <Flex alignItems=\'center\' justifyContent=\'flex-start\' mb={2} gap={1}>\n          <Text tag=\'label\' size={300} id=\'keywords-label\'>\n            Favourite movies\n          </Text>\n          <BulkTextarea.Counter />\n        </Flex>\n        <BulkTextarea.InputField\n          aria-labelledby=\'keywords-label\'\n          commonErrorMessage=\'Please enter correct movie names.\'\n        />\n        <Flex alignItems=\'center\' justifyContent=\'space-between\' mt={2}>\n          <BulkTextarea.ErrorsNavigation />\n          <BulkTextarea.ClearAll />\n        </Flex>\n      </BulkTextarea>\n    </Box>\n  );\n};\n\nexport default Demo;\n' },
};
