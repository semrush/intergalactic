import Badge from '@semcore/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeBgExample, { defaultExampleBadgeProps } from './examples/badge-bg-colors';
import BadgeI18nExample from './examples/badge_i18n_example';
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Tests',
  component: Badge,
};
export default meta;
type Story = StoryObj<typeof Badge>;
export const BadgeBg: StoryObj<typeof defaultExampleBadgeProps> = {
  render: BadgeBgExample,
  argTypes: {
    type: { control: 'select', options: ['admin', 'alpha', 'beta', 'new', 'soon'] },
    inverted: { control: 'boolean' },
    bg: {
      control: { type: 'select' },
      options: ['mist', 'cyan', 'red', 'orange', 'green', 'white', 'violet-400'],
    },
    color: {
      control: { type: 'select' },
      options: ['white', 'gray20', 'green', 'text-primary', 'text-primary-invert'],
    },
    pt: {
      control: { type: 'number' },
    },
    w: {
      control: { type: 'number' },
    },
    h: {
      control: { type: 'number' },
    },
    m: {
      control: { type: 'number' },
    },
  },
  args: defaultExampleBadgeProps,
  parameters: { sourceCode: 'import Badge from \'@semcore/ui/badge\';\nimport type { BadgeProps } from \'@semcore/ui/badge\';\nimport type { BoxProps } from \'@semcore/ui/base-components\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport React from \'react\';\n\ntype ExampleBadgeProps = BadgeProps & BoxProps;\n\nconst Demo = (props: ExampleBadgeProps) => {\n  return (\n    <Flex gap={2}>\n      <Badge\n        inverted={props.inverted}\n        type={props.type}\n        bg={props.bg}\n        color={props.color}\n        // @ts-ignore\n        w={props.w}\n        // @ts-ignore\n        h={props.h}\n        // @ts-ignore\n        pt={props.pt}\n        // @ts-ignore\n        m={props.m}\n      >\n        Badge Test\n      </Badge>\n    </Flex>\n  );\n};\n\nexport const defaultExampleBadgeProps: ExampleBadgeProps = {\n  type: undefined,\n  bg: undefined,\n  color: undefined,\n  w: undefined,\n  h: undefined,\n  pt: undefined,\n  m: undefined,\n  inverted: undefined,\n};\n\nDemo.defaultProps = defaultExampleBadgeProps;\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Badge from \'@semcore/ui/badge\';\nimport type { BadgeProps } from \'@semcore/ui/badge\';\nimport type { BoxProps } from \'@semcore/ui/base-components\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport React from \'react\';\n\ntype ExampleBadgeProps = BadgeProps & BoxProps;\n\nconst Demo = (props: ExampleBadgeProps) => {\n  return (\n    <Flex gap={2}>\n      <Badge\n        inverted={props.inverted}\n        type={props.type}\n        bg={props.bg}\n        color={props.color}\n        // @ts-ignore\n        w={props.w}\n        // @ts-ignore\n        h={props.h}\n        // @ts-ignore\n        pt={props.pt}\n        // @ts-ignore\n        m={props.m}\n      >\n        Badge Test\n      </Badge>\n    </Flex>\n  );\n};\n\nexport const defaultExampleBadgeProps: ExampleBadgeProps = {\n  type: undefined,\n  bg: undefined,\n  color: undefined,\n  w: undefined,\n  h: undefined,\n  pt: undefined,\n  m: undefined,\n  inverted: undefined,\n};\n\nDemo.defaultProps = defaultExampleBadgeProps;\nexport default Demo;\n' },
};
export const BadgeI18nInteractive: Story = {
  render: BadgeI18nExample,
  parameters: { sourceCode: 'import Badge from \'@semcore/ui/badge\';\nimport { Box, Flex } from \'@semcore/ui/base-components\';\nimport { I18nProvider } from \'@semcore/ui/core/lib/utils/enhances/WithI18n\';\nimport Select from \'@semcore/ui/select\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst options = [\n  \'en\',\n  \'de\',\n  \'es\',\n  \'fr\',\n  \'it\',\n  \'nl\',\n  \'pl\',\n  \'pt\',\n  \'sv\',\n  \'vi\',\n  \'tr\',\n  \'zh\',\n  \'ja\',\n  \'ko\',\n].map((o) => ({\n  value: o,\n  children: o,\n}));\n\nconst Demo = () => {\n  const [lang, setLang] = React.useState(\'en\');\n\n  return (\n    <div>\n      <Box mb={4}>\n        <Text size={200} tag=\'label\' htmlFor=\'select-lang-badge\' mr={2}>\n          Language\n        </Text>\n        <Select id=\'select-lang-badge\' options={options} value={lang} onChange={setLang} />\n      </Box>\n\n      <I18nProvider value={lang}>\n        <Box>\n          <Text mb={2}>Current locale: {lang}</Text>\n          <Flex gap={2}>\n            <Badge type=\'admin\' />\n            <Badge type=\'alpha\' />\n            <Badge type=\'beta\' />\n            <Badge type=\'new\' />\n            <Badge type=\'soon\' />\n          </Flex>\n          <Flex gap={2} mt={2} p=\'4px 0\' style={{ background: \'#000\' }}>\n            <Badge type=\'admin\' inverted />\n            <Badge type=\'alpha\' inverted />\n            <Badge type=\'beta\' inverted />\n            <Badge type=\'new\' inverted />\n            <Badge type=\'soon\' inverted />\n          </Flex>\n        </Box>\n      </I18nProvider>\n    </div>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Badge from \'@semcore/ui/badge\';\nimport { Box, Flex } from \'@semcore/ui/base-components\';\nimport { I18nProvider } from \'@semcore/ui/core/lib/utils/enhances/WithI18n\';\nimport Select from \'@semcore/ui/select\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst options = [\n  \'en\',\n  \'de\',\n  \'es\',\n  \'fr\',\n  \'it\',\n  \'nl\',\n  \'pl\',\n  \'pt\',\n  \'sv\',\n  \'vi\',\n  \'tr\',\n  \'zh\',\n  \'ja\',\n  \'ko\',\n].map((o) => ({\n  value: o,\n  children: o,\n}));\n\nconst Demo = () => {\n  const [lang, setLang] = React.useState(\'en\');\n\n  return (\n    <div>\n      <Box mb={4}>\n        <Text size={200} tag=\'label\' htmlFor=\'select-lang-badge\' mr={2}>\n          Language\n        </Text>\n        <Select id=\'select-lang-badge\' options={options} value={lang} onChange={setLang} />\n      </Box>\n\n      <I18nProvider value={lang}>\n        <Box>\n          <Text mb={2}>Current locale: {lang}</Text>\n          <Flex gap={2}>\n            <Badge type=\'admin\' />\n            <Badge type=\'alpha\' />\n            <Badge type=\'beta\' />\n            <Badge type=\'new\' />\n            <Badge type=\'soon\' />\n          </Flex>\n          <Flex gap={2} mt={2} p=\'4px 0\' style={{ background: \'#000\' }}>\n            <Badge type=\'admin\' inverted />\n            <Badge type=\'alpha\' inverted />\n            <Badge type=\'beta\' inverted />\n            <Badge type=\'new\' inverted />\n            <Badge type=\'soon\' inverted />\n          </Flex>\n        </Box>\n      </I18nProvider>\n    </div>\n  );\n};\n\nexport default Demo;\n' },
};
