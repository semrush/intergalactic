import Counter from '@semcore/ui/counter';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import AllThemesExample from './examples/all-themes';
import CounterExample, { defaultProps as CounterDefProps } from './examples/counter';
const meta: Meta<typeof Counter> = {
  title: 'Components/Counter/Tests',
  component: Counter,
};
export default meta;
export const AllThemes: StoryObj = {
  name: 'All themes',
  render: AllThemesExample,
  parameters: { sourceCode: 'import { Box, Flex } from \'@semcore/ui/base-components\';\nimport Counter from \'@semcore/ui/counter\';\nimport React from \'react\';\n\nconst SIZES = [\'s\', \'m\', \'l\'] as const;\n\nconst THEMES_ON_LIGHT = [\'info\', \'warning\', \'danger\'] as const;\n\nexport default function AllThemes() {\n  return (\n    <Flex gap={8} alignItems=\'flex-start\' flexWrap=\'wrap\'>\n      <Flex direction=\'column\' gap={4}>\n        {SIZES.map((size) => (\n          <Flex key={size} gap={4} flexWrap alignItems=\'center\'>\n            <Counter key={`${size}-default`} size={size}>\n              42\n            </Counter>\n            {THEMES_ON_LIGHT.map((theme) => (\n              <Counter key={`${size}-${theme}`} size={size} theme={theme}>\n                42\n              </Counter>\n            ))}\n          </Flex>\n        ))}\n      </Flex>\n      <Box\n        p={4}\n        style={{\n          background: \'var(--intergalactic-bg-primary-invert)\',\n          borderRadius: \'var(--intergalactic-surface-rounded, 6px)\',\n          width: \'fit-content\',\n        }}\n      >\n        <Flex direction=\'column\' gap={4}>\n          {SIZES.map((size) => (\n            <Flex key={`invert-${size}`}>\n              <Counter size={size}>42</Counter>\n            </Flex>\n          ))}\n        </Flex>\n      </Box>\n    </Flex>\n  );\n}\n' },
};
export const CounterBase: StoryObj<typeof CounterDefProps> = {
  render: CounterExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    theme: {
      control: { type: 'select' },
      options: ['warning', 'danger', 'info', 'bg-primary-neutral', ''],
    },
  },
  args: CounterDefProps,
  parameters: { sourceCode: 'import Counter from \'@semcore/ui/counter\';\nimport type { CounterProps } from \'@semcore/ui/counter\';\nimport React from \'react\';\n\nconst Demo = (props: CounterProps) => {\n  return (\n    <>\n      <Counter size={props.size} theme={props.theme}>\n        42\n      </Counter>\n    </>\n  );\n};\n\nexport const defaultProps: CounterProps = {\n  size: \'m\',\n  theme: undefined,\n};\n\nDemo.defaultProps = defaultProps;\n\nexport default Demo;\n' },
};
