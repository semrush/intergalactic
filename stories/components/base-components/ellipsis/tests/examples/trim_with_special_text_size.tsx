import type { EllipsisSettings, BoxProps, SimpleHintPopperProps } from '@semcore/ui/base-components';
import type { TextProps } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type TextExampleProps = {
  ellipsis?: true | EllipsisSettings;
  size: TextProps['size'];
  w: BoxProps['w'];
  hintProps?: Partial<Omit<SimpleHintPopperProps, 'children'>> | false;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
};

const Demo = (props: TextExampleProps) => {
  const resolvedHintProps = props.hintProps === false
    ? false
    : {
        ...(props.hintPlacement ? { placement: props.hintPlacement } : {}),
        ...(typeof props.hintProps === 'object' ? props.hintProps : {}),
      };

  return (
    <Text
      w={props.w}
      mb={3}
      size={props.size}
      tag='p'
      mt={0}
      style={{ outline: '1px solid red' }}
      ellipsis={props.ellipsis}
      {...(resolvedHintProps !== undefined ? { hintProps: resolvedHintProps } : {})}
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
