import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonBaseExample, { defaultButtonProps } from './examples/button-base';
import ButtonIconOnlyExample, { defaultIconButtonProps } from './examples/button-icon-only';
import ButtonNeighborLocationExample, { defaultButtonNeighborProps } from './examples/button-neighbor-location';
import ButtonWithEllipsisExample, { defaultButtonEllipsisProps } from './examples/button-with-ellipsis';
const meta: Meta = {
  title: 'Components/Button/Tests',
};
export default meta;
const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  use: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'tertiary'],
  },
  theme: {
    control: { type: 'select' },
    options: ['info', 'success', 'brand', 'danger', 'invert'],
  },
  active: {
    control: { type: 'boolean' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  loading: {
    control: { type: 'boolean' },
  },
  style: {
    control: { type: 'select' },
    options: [undefined, { backgroundColor: '#191B23' }],
  },
} as const;
export const ButtonBase: StoryObj<typeof defaultButtonProps> = {
  render: ButtonBaseExample,
  argTypes: commonArgTypes,
  args: defaultButtonProps,
  parameters: { sourceCode: 'import VideoListM from \'@semcore/icon/VideoList/m\';\nimport Badge from \'@semcore/ui/badge\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport Button from \'@semcore/ui/button\';\nimport type { ButtonProps } from \'@semcore/ui/button\';\nimport React from \'react\';\n\ntype ExampleProps = ButtonProps & { style?: any };\nconst Demo = (props: ExampleProps) => {\n  return (\n\n    <Flex direction=\'row\' gap={2} mt={10} style={props.style}>\n      <Flex gap={2} m={2}>\n        <Button\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          loading={props.loading}\n        >\n          Button\n        </Button>\n\n        <Button\n          addonRight={VideoListM}\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          loading={props.loading}\n\n        >\n          addonRight\n        </Button>\n\n        <Button\n          addonLeft={VideoListM}\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          loading={props.loading}\n\n        >\n          addonLeft\n        </Button>\n\n        <Button\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          loading={props.loading}\n\n        >\n          <Button.Text>Button.Addon</Button.Text>\n          <Button.Addon>\n            <VideoListM />\n          </Button.Addon>\n        </Button>\n\n        <Button\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          addonLeft={VideoListM}\n          addonRight={VideoListM}\n          loading={props.loading}\n\n        >\n          addonLeftRight\n        </Button>\n        <Button\n          addonLeft={VideoListM}\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          loading={props.loading}\n\n        >\n          <Button.Text>Button with Badge</Button.Text>\n          <Button.Addon>\n            <Badge type=\'new\' />\n          </Button.Addon>\n        </Button>\n      </Flex>\n    </Flex>\n\n  );\n};\n\nexport const defaultButtonProps: ExampleProps = {\n  size: \'m\',\n  use: \'primary\',\n  theme: \'muted\',\n  hintPlacement: \'top\',\n  style: undefined, // this prop is needed for barckground to verofy some button themes (primary invert for instance)\n};\n\nDemo.defaultProps = defaultButtonProps;\nexport default Demo;\n' },
};
export const ButtonIconOnly: StoryObj<typeof defaultIconButtonProps> = {
  render: ButtonIconOnlyExample,
  argTypes: commonArgTypes,
  args: defaultIconButtonProps,
  parameters: { sourceCode: 'import VideoListM from \'@semcore/icon/VideoList/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport Button from \'@semcore/ui/button\';\nimport type { ButtonProps } from \'@semcore/ui/button\';\nimport Tooltip, { Hint } from \'@semcore/ui/tooltip\';\nimport React from \'react\';\n\ntype ExampleProps = ButtonProps & { style?: any };\nconst Demo = (props: ExampleProps) => {\n  return (\n\n    <Flex direction=\'row\' gap={2} m={15} style={props.style}>\n\n      <Flex data-test-id=\'icon-only\' gap={2} m={2}>\n        <Button\n          mr={2}\n          addonLeft={VideoListM}\n          title=\'Addon only\'\n          hintPlacement={props.hintPlacement}\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          theme={props.theme}\n          loading={props.loading}\n        />\n        <Hint\n          mr={2}\n          tag={Button}\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          addonLeft={VideoListM}\n          title=\'Hint Button Addon\'\n          hintPlacement={props.hintPlacement}\n          loading={props.loading}\n\n        />\n        <Tooltip\n          tag={Button}\n          size={props.size}\n          active={props.active}\n          disabled={props.disabled}\n          use={props.use}\n          addonLeft={VideoListM}\n          title=\'Tooltip Button Addon\'\n          hintPlacement={props.hintPlacement}\n          loading={props.loading}\n\n        />\n      </Flex>\n\n    </Flex>\n\n  );\n};\n\nexport const defaultIconButtonProps: ExampleProps = {\n  size: \'m\',\n  use: \'primary\',\n  theme: \'muted\',\n  hintPlacement: \'top\',\n  style: undefined, // this prop is needed for barckground to verofy some button themes (primary invert for instance)\n\n};\n\nDemo.defaultProps = defaultIconButtonProps;\nexport default Demo;\n' },
};
export const ButtonNeighborLocation: StoryObj<typeof defaultButtonNeighborProps> = {
  render: ButtonNeighborLocationExample,
  argTypes: commonArgTypes,
  args: defaultButtonNeighborProps,
  parameters: { sourceCode: 'import VideoListM from \'@semcore/icon/VideoList/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport Button from \'@semcore/ui/button\';\nimport type { ButtonProps } from \'@semcore/ui/button\';\nimport React from \'react\';\n\ntype ExampleProps = ButtonProps & { style?: any };\nconst Demo = (props: ExampleProps) => {\n  return (\n\n    <Flex direction=\'row\' gap={2} mt={10} style={props.style}>\n      <Flex gap={2} m={2}>\n        <Flex role=\'group\' aria-label=\'secondary buttons\'>\n          <Button\n            neighborLocation=\'right\'\n            addonRight={VideoListM}\n            size={props.size}\n            active={props.active}\n            disabled={props.disabled}\n            use={props.use}\n            theme={props.theme}\n            loading={props.loading}\n          >\n            First\n          </Button>\n          <Button\n            neighborLocation=\'both\'\n\n            size={props.size}\n            active={props.active}\n            disabled={props.disabled}\n            use={props.use}\n            theme={props.theme}\n            loading={props.loading}\n          >\n            Middle\n          </Button>\n          <Button\n            neighborLocation=\'left\'\n            addonLeft={VideoListM}\n            size={props.size}\n            active={props.active}\n            disabled={props.disabled}\n            use={props.use}\n            theme={props.theme}\n            loading={props.loading}\n          >\n            Last\n          </Button>\n        </Flex>\n      </Flex>\n    </Flex>\n\n  );\n};\n\nexport const defaultButtonNeighborProps: ExampleProps = {\n  size: \'m\',\n  use: \'primary\',\n  theme: \'muted\',\n  hintPlacement: \'top\',\n  style: undefined, // this prop is needed for barckground to verofy some button themes (primary invert for instance)\n\n};\n\nDemo.defaultProps = defaultButtonNeighborProps;\nexport default Demo;\n' },
};
const ellipsisHintArgTypes = {
  ...commonArgTypes,
  ellipsis: {
    control: 'select',
    options: ['true', 'false', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
    mapping: {
      'true': true,
      'false': false,
      'cropPosition:middle': { cropPosition: 'middle' },
      'cropPosition:end': { cropPosition: 'end' },
      'cropPosition:end maxLine:2': { cropPosition: 'end', maxLine: 2 },
      'cropPosition:end maxLine:6': { cropPosition: 'end', maxLine: 6 },
      'cropPosition:middle lastRequiredSymbols:3': { cropPosition: 'middle', lastRequiredSymbols: 3 },
      'cropPosition:middle lastRequiredSymbols:0': { cropPosition: 'middle', lastRequiredSymbols: 0 },
    },
  },
  w: {
    control: { type: 'number' },
    description: 'Width of the button text',
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
} as const;
export const ButtonWithEllipsis: StoryObj<typeof defaultButtonEllipsisProps> = {
  render: ButtonWithEllipsisExample,
  argTypes: ellipsisHintArgTypes,
  args: defaultButtonEllipsisProps,
  parameters: { sourceCode: 'import type { NSText } from \'@semcore/typography\';\nimport type { EllipsisSettings, SimpleHintPopperProps } from \'@semcore/ui/base-components\';\nimport Button from \'@semcore/ui/button\';\nimport type { ButtonProps } from \'@semcore/ui/button\';\nimport React from \'react\';\n\ntype ButtonEllipsisProps = ButtonProps & {\n  ellipsis?: NSText.EllipsisProps;\n  w?: number | string;\n  hintPlacement?: \'top\' | \'bottom\' | \'left\' | \'right\';\n  hintProps?: false;\n\n};\n\nconst Demo = (props: ButtonEllipsisProps) => {\n  return (\n    <>\n      <Button\n        size={props.size}\n        use={props.use}\n        theme={props.theme}\n        active={props.active}\n        disabled={props.disabled}\n        loading={props.loading}\n      >\n        <Button.Text\n          {...props.ellipsis}\n          w={props.w}\n          hint:placement={props.hintPlacement}\n          hint={props.hintProps}\n        >\n          Button with very long text that should be truncated with ellipsis\n        </Button.Text>\n      </Button>\n\n      <Button\n        ml={2}\n        size={props.size}\n        use={props.use}\n        theme={props.theme}\n        active={props.active}\n        disabled={props.disabled}\n        loading={props.loading}\n      >\n        <Button.Text>\n          Button without ellipsis\n        </Button.Text>\n      </Button>\n    </>\n  );\n};\n\nexport const defaultButtonEllipsisProps: ButtonEllipsisProps = {\n  ellipsis: { ellipsis: true },\n  w: 120,\n  size: \'m\',\n  use: \'secondary\',\n};\n\nDemo.defaultProps = defaultButtonEllipsisProps;\nexport default Demo;\n' },
};
