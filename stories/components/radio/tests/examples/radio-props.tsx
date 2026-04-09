import { Flex } from '@semcore/ui/base-components';
import Radio from '@semcore/ui/radio';
import type { NSRadio } from '@semcore/ui/radio';
import React from 'react';

type ExampleProps = NSRadio.Props & {
  color?: string;
};

const Demo = (props: ExampleProps) => {
  return (
    <Flex direction='column' gap={2}>
      <Radio size={props.size} theme={props.theme} state={props.state} disabled={props.disabled} checked={props.checked} value={props.value}>
        <Radio.Value />
        <Radio.Text color={props.color}>Text</Radio.Text>
      </Radio>
    </Flex>
  );
};

export const defaultProps: ExampleProps = {
  size: 'm',
  theme: undefined,
  state: undefined,
  disabled: false,
  color: undefined,
  value: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
