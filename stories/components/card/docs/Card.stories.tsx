import Card from '@semcore/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/basic_example';
import type { TableInCardProps } from './examples/card_layout_for_tables';
import CardLayoutForTablesExample, { tableInCardDefaultProps } from './examples/card_layout_for_tables';
import ComplexExample from './examples/complex_example';
import EllipsisExample from './examples/ellipsis';
const meta: Meta<typeof Card> = {
  title: 'Components/Card/Documentation',
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;
export const Basic: Story = {
  render: BasicExample,
  parameters: { sourceCode: 'import SettingsM from \'@semcore/icon/Settings/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport Button from \'@semcore/ui/button\';\nimport Card from \'@semcore/ui/card\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst tooltipContent =\n  \'When drawing comparisons between different classes of animals, an alternative unit is sometimes used for organisms: body length per second.\';\n\nconst Demo = () => (\n  <Card tag=\'section\' aria-labelledby=\'card-title\'>\n    <Card.Header>\n      <Flex justifyContent=\'space-between\' alignItems=\'center\'>\n        <Card.Title\n          innerHint={tooltipContent}\n          innerHintAriaLabel=\'About fastest animals\'\n          tag=\'h3\'\n          id=\'card-title\'\n        >\n          Fastest animals\n        </Card.Title>\n        <Button addonLeft={SettingsM} use=\'tertiary\' theme=\'muted\' aria-label=\'Settings\' />\n      </Flex>\n      <Card.Description>\n        This is a list of the fastest animals in the world, by types of animal.\n      </Card.Description>\n    </Card.Header>\n    <Card.Body>\n      <Text size={200}>\n        The peregrine falcon is the fastest bird, and the fastest member of the animal kingdom, with\n        a diving speed of over 300 km/h (190 mph). The fastest land animal is the cheetah.\n      </Text>\n    </Card.Body>\n  </Card>\n);\n\nexport default Demo;\n' },
};
export const Complex: Story = {
  render: ComplexExample,
  parameters: { sourceCode: 'import Close from \'@semcore/icon/Close/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport { LinkTrigger } from \'@semcore/ui/base-trigger\';\nimport Button from \'@semcore/ui/button\';\nimport Card from \'@semcore/ui/card\';\nimport Select from \'@semcore/ui/select\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst tooltipContent = `Hey! Don\'t forget to place some useful information here.`;\nconst options = [\'Mobile\', \'Desktop\', \'Tablet\'].map((value) => ({\n  value,\n  children: value,\n}));\n\nconst Demo = () => (\n  <Card>\n    <Card.Header>\n      <Flex alignItems=\'center\' justifyContent=\'space-between\'>\n        <Card.Title innerHint={tooltipContent} innerHintAriaLabel=\'About this card\' tag=\'h3\'>\n          Card Title\n        </Card.Title>\n        <Flex alignItems=\'center\' gap={2}>\n          <Text size={200} color=\'text-secondary\'>\n            Updated: Tue, Jun 1, 2021\n          </Text>\n          <Button addonLeft={Close} use=\'tertiary\' theme=\'muted\' aria-label=\'Hide widget\' />\n        </Flex>\n      </Flex>\n      <Card.Description tag=\'div\'>\n        <Select\n          tag={LinkTrigger}\n          options={options}\n          placeholder=\'Select device\'\n          aria-label=\'Device\'\n          mr={4}\n        />\n        This is an optional additional information or insights.\n      </Card.Description>\n    </Card.Header>\n    <Card.Body>\n      <Text size={200}>Your awesome card content is placed here.</Text>\n    </Card.Body>\n  </Card>\n);\n\nexport default Demo;\n' },
};
export const Ellipsis: Story = {
  render: EllipsisExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport Card from \'@semcore/ui/card\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst tooltipContent = `Hey! Don\'t forget to place some useful information here.`;\n\nconst Demo = () => (\n  <Card w=\'50%\'>\n    <Card.Header>\n      <Text size={300} tag=\'h3\' m={0} display=\'flex\'>\n        <Card.Title\n          ellipsis={true}\n          hintAfter={tooltipContent}\n          hintAfterAriaLabel=\'About this long text\'\n        >\n          Long title which should show ellipsis when there isn\'t enough space.\n        </Card.Title>\n      </Text>\n      <Card.Description ellipsis={true}>\n        Very long description which should show ellipsis when there isn\'t enough space.\n      </Card.Description>\n    </Card.Header>\n    <Card.Body>\n      <Text tag=\'div\' w=\'100%\' size={200} ellipsis={true}>\n        Long body text which should show ellipsis when there isn\'t enough space.\n      </Text>\n    </Card.Body>\n  </Card>\n);\nexport default Demo;\n' },
};
export const CardLayoutForTables: StoryObj<TableInCardProps> = {
  render: CardLayoutForTablesExample,
  args: {
    ...tableInCardDefaultProps,
  },
  argTypes: {
    use: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', undefined],
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['card', 'default'],
    },
    compact: {
      control: {
        type: 'select',
      },
      options: [true, undefined],
    },
  },
  parameters: { sourceCode: 'import Card from \'@semcore/ui/card\';\nimport type { DataTableProps } from \'@semcore/ui/data-table\';\nimport { DataTable } from \'@semcore/ui/data-table\';\nimport React from \'react\';\n\nexport const tableInCardDefaultProps: TableInCardProps = {\n  variant: \'card\',\n  use: undefined,\n  compact: undefined,\n};\n\nconst Demo = (props: TableInCardProps) => (\n  <Card>\n    <Card.Header>\n      <Card.Title tag=\'h3\'>Card Title</Card.Title>\n    </Card.Header>\n    <Card.Body pt={0} px={0} pb={1}>\n      <DataTable\n        data={data}\n        aria-label=\'Table in card\'\n        variant={props.variant}\n        use={props.use}\n        compact={props.compact}\n        columns={[\n          { name: \'keyword\', children: \'Keyword\' },\n          { name: \'kd\', children: \'KD,%\' },\n          { name: \'cpc\', children: \'CPC\' },\n          { name: \'vol\', children: \'Vol.\' },\n        ]}\n      />\n    </Card.Body>\n  </Card>\n);\n\nexport type TableInCardProps = {\n  variant?: DataTableProps<typeof data, any, any>[\'variant\'];\n  use?: DataTableProps<typeof data, any, any>[\'use\'];\n  compact?: DataTableProps<typeof data, any, any>[\'compact\'];\n};\n\nDemo.defaultProps = tableInCardDefaultProps;\n\nconst data = [\n  {\n    keyword: \'ebay buy\',\n    kd: \'77.8\',\n    cpc: \'$1.25\',\n    vol: \'32,500,000\',\n  },\n  {\n    keyword: \'www.ebay.com\',\n    kd: \'11.2\',\n    cpc: \'$3.4\',\n    vol: \'65,457,920\',\n  },\n  {\n    keyword: \'www.ebay.com\',\n    kd: \'10\',\n    cpc: \'$0.65\',\n    vol: \'47,354,640\',\n  },\n  {\n    keyword: \'ebay buy\',\n    kd: \'-\',\n    cpc: \'$0\',\n    vol: \'n/a\',\n  },\n  {\n    keyword: \'ebay buy\',\n    kd: \'75.89\',\n    cpc: \'$0\',\n    vol: \'21,644,290\',\n  },\n];\n\nexport default Demo;\n' },
};
