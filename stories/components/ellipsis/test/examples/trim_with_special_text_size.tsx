import Ellipsis from '@semcore/ellipsis';
import type { EllipsisProps } from '@semcore/ellipsis';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  return (
    <Text
      display='block'
      w={100}
      h={200}
      mb={3}
      size={400}
      tag='p'
      mt={0}
      style={{ outline: '1px solid red' }}
    >
      <Ellipsis maxLine={props.maxLine} trim={props.trim} tooltip={props.tooltip}>WordWord WordWord</Ellipsis>
    </Text>
  );
};
export const defaultProps: EllipsisProps = {
  trim: 'middle',
  tooltip: true,
  maxLine: 1,
};

Demo.defaultProps = defaultProps;

export default Demo;
