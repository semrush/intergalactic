import type { EllipsisSettings, BoxProps } from '@semcore/ui/base-components';
import type { TextProps } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type TextExampleProps = {
  ellipsis?: true | EllipsisSettings;
} & TextProps & BoxProps;

const Demo: React.FC<TextExampleProps> = (props) => {
  return (
    <Text
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
