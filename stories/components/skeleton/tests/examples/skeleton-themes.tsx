import type { BoxProps } from '@semcore/ui/base-components';
import Skeleton from '@semcore/ui/skeleton';
import type { NSSkeleton } from '@semcore/ui/skeleton';
import React from 'react';

type ExampleProps = NSSkeleton.Props & NSSkeleton.Text.Props & BoxProps;
const Demo = (props: ExampleProps) => {
  return (
    <>
      <div style={{ background: 'blue' }}>
        <Skeleton h={100} theme={props.theme} duration={props.duration}>
          <Skeleton.Text h={50} amount={props.amount} />
          <Skeleton.Text w={props.w} />
        </Skeleton>
      </div>
    </>
  );
};

export const defaultProps: ExampleProps = {
  theme: 'dark',
  duration: 0,
  amount: undefined,
  w: '60%',
};

Demo.defaultProps = defaultProps;

export default Demo;
