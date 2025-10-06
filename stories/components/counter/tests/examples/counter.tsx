import Counter from '@semcore/ui/counter';
import type { CounterProps } from '@semcore/ui/counter';
import React from 'react';

const Demo = (props: CounterProps) => {
  return (
    <>
      <Counter size={props.size} theme={props.theme}>
        42
      </Counter>
    </>
  );
};

export const defaultProps: CounterProps = {
  size: 'm',
  theme: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
