import Badge from '@semcore/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeMainTypesExample from './examples/badge_main_types';
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Documentation',
  component: Badge,
};
export default meta;
type Story = StoryObj<typeof Badge>;
export const BadgeMainTypes: Story = {
  render: BadgeMainTypesExample,
  parameters: { sourceCode: 'import Badge from \'@semcore/ui/badge\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Flex gap={2}>\n        <Badge type=\'admin\' />\n        <Badge type=\'alpha\' />\n        <Badge type=\'beta\' />\n        <Badge type=\'new\' />\n        <Badge type=\'soon\' />\n      </Flex>\n      <Flex gap={2} mt={2} p=\'4px 0\' style={{ background: \'#000\' }}>\n        <Badge type=\'admin\' inverted />\n        <Badge type=\'alpha\' inverted />\n        <Badge type=\'beta\' inverted />\n        <Badge type=\'new\' inverted />\n        <Badge type=\'soon\' inverted />\n      </Flex>\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
