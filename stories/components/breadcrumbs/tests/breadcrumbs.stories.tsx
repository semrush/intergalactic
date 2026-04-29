import type Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EdgeCasesExample from './examples/edge-cases';
import ItemTruncationExample, { breadcrumbsExampleProps } from './examples/item-truncation';
import WithUpdateValuesExample from './examples/with-update-values';
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Tests',
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;
export const ItemTruncation: StoryObj<typeof breadcrumbsExampleProps> = {
  render: ItemTruncationExample,
  argTypes: {
    active: {
      control: { type: 'boolean' },
    },
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: breadcrumbsExampleProps,
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport type { BreadcrumbsItemProps } from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\ntype BreadcrumbsExampleProps = {\n  hintPlacement?: \'top\' | \'bottom\' | \'left\' | \'right\';\n  hintProps?: false;\n} & BreadcrumbsItemProps;\n\nconst Demo = (props: BreadcrumbsExampleProps) => (\n  <>\n    <Breadcrumbs w={600}>\n      <Breadcrumbs.Item\n        hint={props.hintProps}\n        hint:placement={props.hintPlacement}\n      >\n        With Hint Props Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum\n        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias\n        nulla odio quis recusandae sed, sequi ut!\n      </Breadcrumbs.Item>\n      <Breadcrumbs.Item wMax={150}>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum\n        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias\n        nulla odio quis recusandae sed, sequi ut!\n      </Breadcrumbs.Item>\n      <Breadcrumbs.Item wMax={150} active={props.active}>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum\n        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias\n        nulla odio quis recusandae sed, sequi ut!\n      </Breadcrumbs.Item>\n    </Breadcrumbs>\n\n  </>\n\n);\n\nexport const breadcrumbsExampleProps: BreadcrumbsExampleProps = {\n  active: true,\n};\n\nDemo.defaultProps = breadcrumbsExampleProps;\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport type { BreadcrumbsItemProps } from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\ntype BreadcrumbsExampleProps = {\n  hintPlacement?: \'top\' | \'bottom\' | \'left\' | \'right\';\n  hintProps?: false;\n} & BreadcrumbsItemProps;\n\nconst Demo = (props: BreadcrumbsExampleProps) => (\n  <>\n    <Breadcrumbs w={600}>\n      <Breadcrumbs.Item\n        hint={props.hintProps}\n        hint:placement={props.hintPlacement}\n      >\n        With Hint Props Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum\n        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias\n        nulla odio quis recusandae sed, sequi ut!\n      </Breadcrumbs.Item>\n      <Breadcrumbs.Item wMax={150}>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum\n        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias\n        nulla odio quis recusandae sed, sequi ut!\n      </Breadcrumbs.Item>\n      <Breadcrumbs.Item wMax={150} active={props.active}>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum\n        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias\n        nulla odio quis recusandae sed, sequi ut!\n      </Breadcrumbs.Item>\n    </Breadcrumbs>\n\n  </>\n\n);\n\nexport const breadcrumbsExampleProps: BreadcrumbsExampleProps = {\n  active: true,\n};\n\nDemo.defaultProps = breadcrumbsExampleProps;\nexport default Demo;\n' },
};
export const EdgeCases: Story = {
  render: EdgeCasesExample,
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\nconst Demo = () => (\n  <>\n    <Breadcrumbs>\n      <Breadcrumbs.Item active data-testid=\'one-active\'>One active</Breadcrumbs.Item>\n      <Breadcrumbs.Item active data-testid=\'second-active\'>Second active</Breadcrumbs.Item>\n    </Breadcrumbs>\n\n    <Breadcrumbs separator=\'LinkExternalM\'>\n      <Breadcrumbs.Item data-testid=\'first-cust-separator\'>first</Breadcrumbs.Item>\n      <Breadcrumbs.Item data-testid=\'second-cust-separator\'>second</Breadcrumbs.Item>\n      <Breadcrumbs.Item data-testid=\'active-cust-separator\' active>active</Breadcrumbs.Item>\n      <Breadcrumbs.Item data-testid=\'style-cust-separator\' style={{ opacity: 0.3 }}>custom style</Breadcrumbs.Item>\n    </Breadcrumbs>\n  </>\n\n);\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\nconst Demo = () => (\n  <>\n    <Breadcrumbs>\n      <Breadcrumbs.Item active data-testid=\'one-active\'>One active</Breadcrumbs.Item>\n      <Breadcrumbs.Item active data-testid=\'second-active\'>Second active</Breadcrumbs.Item>\n    </Breadcrumbs>\n\n    <Breadcrumbs separator=\'LinkExternalM\'>\n      <Breadcrumbs.Item data-testid=\'first-cust-separator\'>first</Breadcrumbs.Item>\n      <Breadcrumbs.Item data-testid=\'second-cust-separator\'>second</Breadcrumbs.Item>\n      <Breadcrumbs.Item data-testid=\'active-cust-separator\' active>active</Breadcrumbs.Item>\n      <Breadcrumbs.Item data-testid=\'style-cust-separator\' style={{ opacity: 0.3 }}>custom style</Breadcrumbs.Item>\n    </Breadcrumbs>\n  </>\n\n);\nexport default Demo;\n' },
};
export const WithUpdateValues: Story = {
  render: WithUpdateValuesExample,
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport Button from \'@semcore/ui/button\';\nimport React, { useState } from \'react\';\n\nconst Demo = () => {\n  const [name, setName] = useState(\'Name\');\n\n  return (\n    <div style={{ display: \'flex\', flexDirection: \'column\', gap: \'1rem\' }}>\n      <Breadcrumbs>\n        <Breadcrumbs.Item href=\'/\'>Home</Breadcrumbs.Item>\n        <Breadcrumbs.Item wMax={150} active ellipsis:observeChildrenMutations>\n          {name}\n        </Breadcrumbs.Item>\n      </Breadcrumbs>\n      <div>Actual name: {name}</div>\n      <Button onClick={() => setName(`Name ${Math.random()}`)}>\n        Update breadcrumb item name\n      </Button>\n    </div>\n  );\n};\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport Button from \'@semcore/ui/button\';\nimport React, { useState } from \'react\';\n\nconst Demo = () => {\n  const [name, setName] = useState(\'Name\');\n\n  return (\n    <div style={{ display: \'flex\', flexDirection: \'column\', gap: \'1rem\' }}>\n      <Breadcrumbs>\n        <Breadcrumbs.Item href=\'/\'>Home</Breadcrumbs.Item>\n        <Breadcrumbs.Item wMax={150} active ellipsis:observeChildrenMutations>\n          {name}\n        </Breadcrumbs.Item>\n      </Breadcrumbs>\n      <div>Actual name: {name}</div>\n      <Button onClick={() => setName(`Name ${Math.random()}`)}>\n        Update breadcrumb item name\n      </Button>\n    </div>\n  );\n};\nexport default Demo;\n' },
};
