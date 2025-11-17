import type { BoxProps } from '@semcore/ui/base-components';
import Skeleton from '@semcore/ui/skeleton';
import type { SkeletonProps, SkeletonTextProps } from '@semcore/ui/skeleton';
import React from 'react';

type ExampleProps = SkeletonTextProps & SkeletonProps & BoxProps;
const Demo = (props: ExampleProps) => {
  return (
    <>
      <div style={{ background: 'blue' }}>
        <Skeleton h={100} theme={props.theme} duration={props.duration}>
          <Skeleton.Text h={50} amount={props.amount} />
          <Skeleton.Text w={props.width} />
        </Skeleton>
      </div>
    </>
  );
};

export const defaultProps: ExampleProps = {
  theme: 'dark',
  duration: 0,
  amount: undefined,
  width: '60%',
};

Demo.defaultProps = defaultProps;

export default Demo;
