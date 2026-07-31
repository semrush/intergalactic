import type { NSBox } from '@semcore/ui/base-components';
import type { NSText } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type TextExampleProps = {
  ellipsis?: NSText.EllipsisProps;
  size: NSText.Props['size'];
  w: NSBox.Props['w'];
  hintProps?: false;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
};

const Demo = (props: TextExampleProps) => {
  return (
    <Text
      w={props.w}
      mb={3}
      size={props.size}
      tag='p'
      mt={0}
      style={{ outline: '1px solid red' }}
      {...props.ellipsis}
      hint={props.hintProps}
      hint:placement={props.hintPlacement}
    >
      WordWord WordWord
    </Text>
  );
};

export const defaultProps: TextExampleProps = {
  ellipsis: { ellipsis: true },
  size: 400,
  w: 100,
};

Demo.defaultProps = defaultProps;

export default Demo;
