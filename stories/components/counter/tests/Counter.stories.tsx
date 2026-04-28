import Counter from '@semcore/ui/counter';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import CounterExample, { defaultProps as CounterDefProps } from './examples/counter';
const meta: Meta<typeof Counter> = {
  title: 'Components/Counter/Tests',
  component: Counter,
};
export default meta;
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
