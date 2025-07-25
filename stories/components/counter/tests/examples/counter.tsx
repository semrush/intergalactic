import Counter from '@semcore/counter';
import type { CounterProps } from '@semcore/counter';
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
