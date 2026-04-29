import type Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RedefiningATagExample from './examples/redefining_a_tag';
import UsageExample from './examples/usage_example';
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Documentation',
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;
export const BasicUsage: Story = {
  render: UsageExample,
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\nconst Demo = () => (\n  <Breadcrumbs aria-label=\'Truncation example\'>\n    <Breadcrumbs.Item\n      active={false}\n      href=\'#\'\n      role=\'link\'\n      ellipsis={true}\n    >\n      Ellipsis\n    </Breadcrumbs.Item>\n    <Breadcrumbs.Item\n      active={false}\n      href=\'#\'\n      role=\'link\'\n      wMax={200}\n      ellipsis={true}\n    >\n      This title is longer than a giraffe\'s neck, I bet it\'s been doing neck workouts!\n    </Breadcrumbs.Item>\n    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>\n  </Breadcrumbs>\n);\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\nconst Demo = () => (\n  <Breadcrumbs aria-label=\'Truncation example\'>\n    <Breadcrumbs.Item\n      active={false}\n      href=\'#\'\n      role=\'link\'\n      ellipsis={true}\n    >\n      Ellipsis\n    </Breadcrumbs.Item>\n    <Breadcrumbs.Item\n      active={false}\n      href=\'#\'\n      role=\'link\'\n      wMax={200}\n      ellipsis={true}\n    >\n      This title is longer than a giraffe\'s neck, I bet it\'s been doing neck workouts!\n    </Breadcrumbs.Item>\n    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>\n  </Breadcrumbs>\n);\n\nexport default Demo;\n' },
};
export const RedefiningATag: Story = {
  render: RedefiningATagExample,
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport Link from \'@semcore/ui/link\';\nimport React from \'react\';\n\nconst Demo = () => (\n  <Breadcrumbs aria-label=\'Redefining tag example\'>\n    <Breadcrumbs.Item href=\'/\'>Projects</Breadcrumbs.Item>\n    <Breadcrumbs.Item href=\'/components/breadcrumbs\'>somedomain.com</Breadcrumbs.Item>\n    <Breadcrumbs.Item tag={Link} active href=\'#\'>\n      Current page\n    </Breadcrumbs.Item>\n  </Breadcrumbs>\n);\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport Link from \'@semcore/ui/link\';\nimport React from \'react\';\n\nconst Demo = () => (\n  <Breadcrumbs aria-label=\'Redefining tag example\'>\n    <Breadcrumbs.Item href=\'/\'>Projects</Breadcrumbs.Item>\n    <Breadcrumbs.Item href=\'/components/breadcrumbs\'>somedomain.com</Breadcrumbs.Item>\n    <Breadcrumbs.Item tag={Link} active href=\'#\'>\n      Current page\n    </Breadcrumbs.Item>\n  </Breadcrumbs>\n);\n\nexport default Demo;\n' },
};
