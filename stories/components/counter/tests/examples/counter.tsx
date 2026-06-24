import Counter from '@semcore/ui/counter';
import type { NSCounter } from '@semcore/ui/counter';
import React from 'react';

const Demo = (props: NSCounter.Props) => {
  return (
    <>
      <Counter size={props.size} theme={props.theme}>
        42
      </Counter>
    </>
  );
};

export const defaultProps: NSCounter.Props = {
  size: 'm',
  theme: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
