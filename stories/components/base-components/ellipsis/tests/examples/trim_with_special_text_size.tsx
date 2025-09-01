import type { EllipsisSettings } from '@semcore/base-components';
import type BoxProps from '@semcore/flex-box';
import type TextProps from '@semcore/typography';
import { Text } from '@semcore/typography';
import React from 'react';

type TextExampleProps = {
  ellipsis?: true | EllipsisSettings;
} & TextProps & BoxProps;

const Demo = (props: TextExampleProps) => {
  return (
    <Text
      display='block'
      w={props.w}
      mb={3}
      size={props.size}
      tag='p'
      mt={0}
      style={{ outline: '1px solid red' }}
      ellipsis={props.ellipsis}
    >
      WordWord WordWord
    </Text>
  );
};

export const defaultProps: TextExampleProps = {
  ellipsis: true,
  size: 400,
  w: 100,
};

Demo.defaultProps = defaultProps;

export default Demo;
