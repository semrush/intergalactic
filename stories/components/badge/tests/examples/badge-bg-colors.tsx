import Badge from '@semcore/ui/badge';
import type { BadgeProps } from '@semcore/ui/badge';
import type { BoxProps } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import React from 'react';

type ExampleBadgeProps = BadgeProps & BoxProps;

const Demo = (props: ExampleBadgeProps) => {
  return (
    <Flex gap={2}>
      <Badge
        inverted={props.inverted}
        type={props.type}
        bg={props.bg}
        color={props.color}
        // @ts-ignore
        w={props.w}
        // @ts-ignore
        h={props.h}
        // @ts-ignore
        pt={props.pt}
        // @ts-ignore
        m={props.m}
      >
        Badge Test
      </Badge>
    </Flex>
  );
};

export const defaultExampleBadgeProps: ExampleBadgeProps = {
  type: undefined,
  bg: undefined,
  color: undefined,
  w: undefined,
  h: undefined,
  pt: undefined,
  m: undefined,
  inverted: undefined,
};

Demo.defaultProps = defaultExampleBadgeProps;
export default Demo;
