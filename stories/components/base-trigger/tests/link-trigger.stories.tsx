import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { defaultLinkTriggerProps } from './examples/link-trigger/base';
import DifferentSizesExample, { defaultLinkTriggerSizesProps } from './examples/link-trigger/link-trigger-different-sizes';
import SelectExample, { linkTriggerSelectExampleProps } from './examples/link-trigger/with-select';
const sharedArgTypes = {
  size: {
    control: { type: 'select' },
    options: [100, 200, 300, 400, 500, 600, 700, 800, undefined],
  },
  active: { control: { type: 'boolean' } },
  empty: { control: { type: 'boolean' } },
  placeholder: { control: { type: 'text' } },
  disabled: { control: { type: 'boolean' } },
  loading: { control: { type: 'boolean' } },
  chevron: { control: { type: 'boolean' } },
  color: {
    control: { type: 'select' },
    options: ['violet', 'blue', 'text-success', undefined],
  },
} as const;
const meta: Meta = {
  title: 'Components/Base Trigger/Test/Link Trigger',
};
export default meta;
export const Base: StoryObj<typeof defaultLinkTriggerProps> = {
  render: BaseExample,
  argTypes: {
    ...sharedArgTypes,
    text: {
      control: { type: 'text' },
    },
    showAddonLeft: {
      control: { type: 'boolean' },
    },
    showAddonRight: {
      control: { type: 'boolean' },
    },
    addonLeftType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin', 'flag', 'tag'],
    },
    addonRightType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin', 'flag', 'tag'],
    },
    merged: {
      control: { type: 'boolean' },
    },
    w: {
      control: { type: 'number' },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
    ellipsis: {
      control: { type: 'select' },
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
      mapping: {
        'false': { ellipsis: false },
        'true': { ellipsis: true },
        'cropPosition:middle': { 'ellipsis:cropPosition': 'middle' },
        'cropPosition:end': { 'ellipsis:cropPosition': 'end' },
        'cropPosition:end maxLine:2': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 },
        'cropPosition:end maxLine:6': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 6 },
        'cropPosition:middle lastRequiredSymbols:3': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 3 },
        'cropPosition:middle lastRequiredSymbols:0': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 0 },
      },
    },
  },
  args: defaultLinkTriggerProps,
  parameters: { sourceCode: 'import MathPlusAltL from \'@semcore/icon/MathPlusAlt/l\';\nimport MathPlusAltM from \'@semcore/icon/MathPlusAlt/m\';\nimport Badge from \'@semcore/ui/badge\';\nimport { LinkTrigger } from \'@semcore/ui/base-trigger\';\nimport type { LinkTriggerProps } from \'@semcore/ui/base-trigger\';\nimport Counter, { type CounterProps } from \'@semcore/ui/counter\';\nimport Flags from \'@semcore/ui/flags\';\nimport Tag, { type TagSize } from \'@semcore/ui/tag\';\nimport type { NSText } from \'@semcore/ui/typography\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\ntype AddonType = \'icon\' | \'badge\' | \'counter\' | \'flag\' | \'tag\';\n\ntype BasicLinktriggerProps = LinkTriggerProps & {\n  text?: string;\n  showAddonLeft?: boolean;\n  showAddonRight?: boolean;\n  ellipsis?: NSText.EllipsisProps;\n  hintPlacement?: \'top\' | \'bottom\' | \'left\' | \'right\';\n  hintProps?: false;\n  addonLeftType?: AddonType;\n  addonRightType?: AddonType;\n  merged?: boolean;\n  loading?: boolean;\n  color?: string;\n  w?: number;\n};\n\nconst Demo = (props: BasicLinktriggerProps) => {\n  const {\n    text = \'LinkTrigger example\',\n    showAddonLeft = false,\n    showAddonRight = false,\n    disabled,\n    loading,\n    hintProps,\n    active,\n    size = 300,\n    w,\n    ellipsis,\n    hintPlacement,\n    addonLeftType = \'icon\',\n    addonRightType = \'icon\',\n    merged = false,\n  } = props;\n\n  const numSize = Number(size);\n  const IconAddon = numSize < 600 ? MathPlusAltM : MathPlusAltL;\n\n  let counterSize: CounterProps[\'size\'];\n  if (numSize >= 600) {\n    counterSize = \'l\';\n  } else if (numSize >= 300) {\n    counterSize = \'m\';\n  }\n\n  let tagSize: TagSize | undefined;\n  if (numSize >= 600) {\n    tagSize = \'xl\';\n  } else if (numSize >= 300) {\n    tagSize = \'l\';\n  } else {\n    tagSize = \'m\';\n  }\n\n  const renderAddon = (show: boolean, type: AddonType) => {\n    if (!show) return null;\n\n    switch (type) {\n      case \'badge\':\n        return <LinkTrigger.Addon><Badge type=\'new\' /></LinkTrigger.Addon>;\n      case \'counter\':\n        return <LinkTrigger.Addon><Counter size={counterSize}>17</Counter></LinkTrigger.Addon>;\n      case \'flag\':\n        return <LinkTrigger.Addon><Flags name=\'US\' /></LinkTrigger.Addon>;\n      case \'tag\':\n        return <LinkTrigger.Addon><Tag size={tagSize}>Label</Tag></LinkTrigger.Addon>;\n      case \'icon\':\n      default:\n        if (merged) return <LinkTrigger.Addon tag={IconAddon} />;\n        return <LinkTrigger.Addon><IconAddon /></LinkTrigger.Addon>;\n    }\n  };\n\n  const hasEllipsis = ellipsis !== undefined && ellipsis.ellipsis !== false;\n  const ellipsisW = hasEllipsis ? (w || (numSize < 600 ? 150 : 300)) : undefined;\n\n  let displayValue: \'inline-block\' | undefined;\n  if (ellipsis?.[\'ellipsis:maxLine\'] && ellipsis?.[\'ellipsis:maxLine\'] > 1) {\n    displayValue = \'inline-block\';\n  }\n\n  return (\n    <Text tag=\'div\' size={size}>\n      <LinkTrigger\n        size={size}\n        disabled={disabled}\n        active={active}\n        loading={loading}\n        color={props.color}\n        display={displayValue}\n        mr={4}\n      >\n        {renderAddon(showAddonLeft, addonLeftType)}\n        <LinkTrigger.Text\n          w={ellipsisW}\n          {...ellipsis}\n          hint:placement={hintPlacement}\n          hint={hintProps}\n        >\n          {text}\n        </LinkTrigger.Text>\n        {renderAddon(showAddonRight, addonRightType)}\n      </LinkTrigger>\n\n      {`${numSize} `}\n      <LinkTrigger\n        size={size}\n        loading={loading}\n        disabled={disabled}\n        active={active}\n        color={props.color}\n      >\n        {renderAddon(showAddonLeft, addonLeftType)}\n        <LinkTrigger.Text>\n          {text}\n        </LinkTrigger.Text>\n        {renderAddon(showAddonRight, addonRightType)}\n      </LinkTrigger>\n    </Text>\n  );\n};\n\nexport const defaultLinkTriggerProps: BasicLinktriggerProps = {\n  text: \'LinkTrigger example\',\n  size: 300,\n  showAddonLeft: false,\n  showAddonRight: false,\n  addonLeftType: \'icon\',\n  addonRightType: \'icon\',\n  merged: false,\n  ellipsis: { ellipsis: true },\n  loading: false,\n  w: 120,\n};\n\nDemo.defaultProps = defaultLinkTriggerProps;\n\nexport default Demo;\n' },
};
export const Select: StoryObj<typeof linkTriggerSelectExampleProps> = {
  render: SelectExample,
  argTypes: {
    ...sharedArgTypes,
    showAddonLeft: {
      control: { type: 'boolean' },
    },
    showAddonRight: {
      control: { type: 'boolean' },
    },
    addonLeftType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'flag', 'tag'],
    },
    addonRightType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'flag', 'tag'],
    },
    w: {
      control: { type: 'number' },
    },
    ellipsis: {
      control: { type: 'select' },
      options: ['false', 'true'],
      mapping: {
        false: { ellipsis: false },
        true: { ellipsis: true },
      },
    },
  },
  args: linkTriggerSelectExampleProps,
  parameters: { sourceCode: 'import MathPlusAltL from \'@semcore/icon/MathPlusAlt/l\';\nimport MathPlusAltM from \'@semcore/icon/MathPlusAlt/m\';\nimport Badge from \'@semcore/ui/badge\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport { LinkTrigger } from \'@semcore/ui/base-trigger\';\nimport type { LinkTriggerProps } from \'@semcore/ui/base-trigger\';\nimport Counter, { type CounterProps } from \'@semcore/ui/counter\';\nimport Flags from \'@semcore/ui/flags\';\nimport Select from \'@semcore/ui/select\';\nimport Tag, { type TagSize } from \'@semcore/ui/tag\';\nimport type { NSText } from \'@semcore/ui/typography\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\ntype AddonType = \'icon\' | \'badge\' | \'counter\' | \'flag\' | \'tag\';\n\ninterface Project {\n  id: number;\n  name: string;\n}\n\ntype LinkTriggerSelectDDMenuExample = LinkTriggerProps & {\n  showAddonLeft?: boolean;\n  showAddonRight?: boolean;\n  addonLeftType?: AddonType;\n  addonRightType?: AddonType;\n  ellipsis?: NSText.EllipsisProps;\n  w?: number;\n};\n\nconst Demo = (props: LinkTriggerSelectDDMenuExample) => {\n  const {\n    size = 300,\n    active,\n    empty,\n    placeholder,\n    disabled,\n    loading,\n    color,\n    showAddonLeft = false,\n    showAddonRight = false,\n    addonLeftType = \'icon\',\n    addonRightType = \'icon\',\n    ellipsis,\n    w,\n  } = props;\n\n  const [selectedProject, setSelectedProject] = React.useState<Project | undefined>();\n  const [deviceValue, setDeviceValue] = React.useState<string | null>(null);\n\n  const numSize = Number(size);\n  const IconAddon = numSize < 600 ? MathPlusAltM : MathPlusAltL;\n\n  let counterSize: CounterProps[\'size\'];\n  if (numSize >= 600) {\n    counterSize = \'l\';\n  } else if (numSize >= 300) {\n    counterSize = \'m\';\n  }\n\n  let tagSize: TagSize | undefined;\n  if (numSize >= 600) {\n    tagSize = \'xl\';\n  } else if (numSize >= 300) {\n    tagSize = \'l\';\n  } else {\n    tagSize = \'m\';\n  }\n\n  const renderAddon = (show: boolean, type: AddonType) => {\n    if (!show) return null;\n\n    switch (type) {\n      case \'badge\':\n        return <LinkTrigger.Addon><Badge type=\'new\' /></LinkTrigger.Addon>;\n      case \'counter\':\n        return <LinkTrigger.Addon><Counter size={counterSize}>17</Counter></LinkTrigger.Addon>;\n      case \'flag\':\n        return <LinkTrigger.Addon><Flags name=\'US\' /></LinkTrigger.Addon>;\n      case \'tag\':\n        return <LinkTrigger.Addon><Tag size={tagSize}>Label</Tag></LinkTrigger.Addon>;\n      case \'icon\':\n      default:\n        return <LinkTrigger.Addon><IconAddon /></LinkTrigger.Addon>;\n    }\n  };\n\n  const hasEllipsis = ellipsis !== undefined && ellipsis.ellipsis !== false;\n  const ellipsisW = hasEllipsis ? (w || (numSize < 600 ? 150 : 300)) : undefined;\n\n  const handleSelect = (id: number) => {\n    setSelectedProject(() => projects.find((project) => project.id === id));\n  };\n\n  return (\n    <Flex gap={4} alignItems=\'flex-start\' direction=\'column\'>\n      {/* Pattern 1: Select with tag={LinkTrigger} */}\n      <Select\n        tag={LinkTrigger}\n        options={devices}\n        data-test-id=\'base-trigger-as-tag-in-select\'\n        aria-label=\'base addon\'\n        size={size}\n        active={active}\n        empty={empty}\n        placeholder={placeholder}\n        disabled={disabled}\n        loading={loading}\n        color={color}\n      >\n        {renderAddon(showAddonLeft, addonLeftType)}\n        {renderAddon(showAddonRight, addonRightType)}\n      </Select>\n\n      {/* Pattern 2: Select with Select.Trigger and LinkTrigger.Text with getTriggerProps */}\n      <Select\n        value={selectedProject?.id}\n        onChange={handleSelect}\n        placeholder={placeholder}\n      >\n        {({ getTriggerProps }) => (\n          <>\n            <Select.Trigger\n              tag={LinkTrigger}\n              active={active}\n              empty={empty}\n              disabled={disabled}\n              loading={loading}\n              color={color}\n              size={size}\n            >\n              {renderAddon(showAddonLeft, addonLeftType)}\n              <LinkTrigger.Text\n                tag={Text}\n                fontWeight={400}\n                w={ellipsisW}\n                {...ellipsis}\n                ellipsis:observeChildrenMutations\n              >\n                {selectedProject?.name ?? (getTriggerProps().placeholder as string)}\n              </LinkTrigger.Text>\n              {renderAddon(showAddonRight, addonRightType)}\n            </Select.Trigger>\n            <Select.Popper aria-label=\'Projects\'>\n              <Select.List>\n                {projects.map((project) => (\n                  <Select.Option key={project.id} value={project.id}>\n                    {project.name}\n                  </Select.Option>\n                ))}\n              </Select.List>\n            </Select.Popper>\n          </>\n        )}\n      </Select>\n\n      {/* Pattern 3: Select with in wMax in Select Trigger and ellipsis in Link trigger */}\n      <Select\n        value={deviceValue}\n        onChange={setDeviceValue}\n        placeholder={placeholder}\n\n      >\n        <Select.Trigger\n          tag={LinkTrigger}\n          wMax={ellipsisW}\n          active={active}\n          disabled={disabled}\n          loading={loading}\n          color={color}\n          size={size}\n        >\n          {renderAddon(showAddonLeft, addonLeftType)}\n          <LinkTrigger.Text\n            fontWeight={600}\n            {...ellipsis}\n            ellipsis:observeChildrenMutations\n          >\n            {deviceValue}\n          </LinkTrigger.Text>\n          {renderAddon(showAddonRight, addonRightType)}\n        </Select.Trigger>\n        <Select.Popper aria-label=\'\'>\n          <Select.List>\n            {devices.map((option) => (\n              <Select.Option value={option.value} key={option.value}>\n                {option.children}\n              </Select.Option>\n            ))}\n          </Select.List>\n        </Select.Popper>\n      </Select>\n    </Flex>\n  );\n};\n\nconst devices = [\'Desktop\', \'Mobile\', \'Tablet\'].map((item) => ({\n  value: item,\n  children: item,\n}));\n\nconst projects: Project[] = [\n  { id: 1, name: \'Semrush\' },\n  { id: 2, name: \'Google\' },\n];\n\nexport const linkTriggerSelectExampleProps: LinkTriggerSelectDDMenuExample = {\n  size: 300,\n  placeholder: \'Select SEO option\',\n  color: undefined,\n  showAddonLeft: false,\n  showAddonRight: false,\n  addonLeftType: \'icon\',\n  addonRightType: \'icon\',\n  ellipsis: { ellipsis: true },\n  w: 140,\n};\n\nDemo.defaultProps = linkTriggerSelectExampleProps;\n\nexport default Demo;\n' },
};
export const DifferentSizes: StoryObj<typeof defaultLinkTriggerSizesProps> = {
  render: DifferentSizesExample,
  argTypes: {
    ...sharedArgTypes,
    addonLeft: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'flag', 'tag'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'flag', 'tag', 'none'],
    },
    ellipsis: { control: { type: 'boolean' } },
  },
  args: defaultLinkTriggerSizesProps,
  parameters: { sourceCode: 'import MathPlusAltL from \'@semcore/icon/MathPlusAlt/l\';\nimport MathPlusAltM from \'@semcore/icon/MathPlusAlt/m\';\nimport Badge from \'@semcore/ui/badge\';\nimport { LinkTrigger } from \'@semcore/ui/base-trigger\';\nimport Counter, { type CounterProps } from \'@semcore/ui/counter\';\nimport Flags from \'@semcore/ui/flags\';\nimport Tag, { type TagSize } from \'@semcore/ui/tag\';\nimport { Text } from \'@semcore/ui/typography\';\nimport React from \'react\';\n\nconst Demo = (props: LinkTriggerSizesProps) => {\n  const w = 150;\n  const sizes = [\n    800,\n    700,\n    600,\n    500,\n    400,\n    300,\n    200,\n    100,\n  ] as const;\n  const text = \'The quick brown fox jumps over the lazy dog\';\n\n  return (\n    <>\n      {sizes.map((size) => {\n        let counterSize: CounterProps[\'size\'];\n        if (size >= 600) {\n          counterSize = \'l\';\n        } else if (size >= 300) {\n          counterSize = \'m\';\n        }\n\n        let tagSize: TagSize;\n        if (size >= 600) {\n          tagSize = \'xl\';\n        } else if (size >= 300) {\n          tagSize = \'l\';\n        } else {\n          tagSize = \'m\';\n        }\n\n        return (\n          <Text key={size} tag=\'div\' size={size} mb={4}>\n            {`${size} `}\n            <LinkTrigger\n              mr={4}\n              active={props.active}\n              disabled={props.disabled}\n              loading={props.loading}\n              color={props.color}\n              size={size}\n            >\n              {props.addonLeft === \'icon\' && (\n                <LinkTrigger.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</LinkTrigger.Addon>\n              )}\n              {props.addonLeft === \'badge\' && (\n                <LinkTrigger.Addon>\n                  <Badge type=\'new\' />\n                </LinkTrigger.Addon>\n              )}\n              {props.addonLeft === \'counter\' && (\n                <LinkTrigger.Addon>\n                  <Counter size={counterSize}>\n                    17\n                  </Counter>\n                </LinkTrigger.Addon>\n              )}\n              {props.addonLeft === \'tag\' && (\n                <LinkTrigger.Addon>\n                  <Tag size={tagSize}>Label</Tag>\n                </LinkTrigger.Addon>\n              )}\n              {props.addonLeft === \'flag\' && (\n                <LinkTrigger.Addon>\n                  <Flags name=\'US\' />\n                </LinkTrigger.Addon>\n              )}\n              <LinkTrigger.Text\n                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}\n                ellipsis={props.ellipsis ? true : undefined}\n\n              >\n                {text}\n              </LinkTrigger.Text>\n              {props.addonRight === \'icon\' && (\n                <LinkTrigger.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</LinkTrigger.Addon>\n              )}\n              {props.addonRight === \'badge\' && (\n                <LinkTrigger.Addon>\n                  <Badge type=\'new\' />\n                </LinkTrigger.Addon>\n              )}\n              {props.addonRight === \'counter\' && (\n                <LinkTrigger.Addon>\n                  <Counter size={counterSize}>\n                    17\n                  </Counter>\n                </LinkTrigger.Addon>\n              )}\n              {props.addonRight === \'tag\' && (\n                <LinkTrigger.Addon>\n                  <Tag size={tagSize}>Label</Tag>\n                </LinkTrigger.Addon>\n              )}\n              {props.addonRight === \'flag\' && (\n                <LinkTrigger.Addon>\n                  <Flags name=\'US\' />\n                </LinkTrigger.Addon>\n              )}\n            </LinkTrigger>\n          </Text>\n        );\n      })}\n    </>\n  );\n};\n\ntype LinkTriggerSizesProps = {\n  addonLeft: \'icon\' | \'badge\' | \'counter\' | \'tag\' | \'flag\';\n  addonRight: \'icon\' | \'badge\' | \'counter\' | \'tag\' | \'flag\' | \'none\';\n  ellipsis: boolean;\n  active: boolean;\n  disabled: boolean;\n  loading: boolean;\n  color: string | undefined;\n};\n\nexport const defaultLinkTriggerSizesProps: LinkTriggerSizesProps = {\n  addonLeft: \'icon\',\n  addonRight: \'badge\',\n  ellipsis: true,\n  active: false,\n  disabled: false,\n  loading: false,\n  color: undefined,\n};\n\nDemo.defaultProps = defaultLinkTriggerSizesProps;\n\nexport default Demo;\n' },
};
