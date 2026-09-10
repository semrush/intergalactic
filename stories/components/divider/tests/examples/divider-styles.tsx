import { Flex } from '@semcore/ui/base-components';
import Divider from '@semcore/ui/divider';
import type { NSDivider } from '@semcore/ui/divider';
import React from 'react';

type DividerStylesExample = NSDivider.Props;
const Demo = (props: DividerStylesExample) => {
  return (
    <>
      <Flex w={200} style={{ background: '#979797' }} p={4} data-testid='wrap' h={100}>
        <Divider
          orientation={props.orientation}
          use={props.use}
          theme={props.theme}
          w={props.w}
          h={props.h}
          m={2}
        />

      </Flex>

    </>
  );
};
export const baseExampleProps: DividerStylesExample = {
  orientation: 'horizontal',
  use: 'primary',
  theme: 'default',
  w: undefined,
  h: undefined,
};

Demo.defaultProps = baseExampleProps;
export default Demo;
