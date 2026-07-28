import Badge from '@semcore/ui/badge';
import type { NSBadge } from '@semcore/ui/badge';
import type { BoxProps } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import React from 'react';

type ExampleBadgeProps = NSBadge.Props & BoxProps;

const Demo = (props: ExampleBadgeProps) => {
  return (
    <Flex gap={2}>
      <Badge
        invert={props.invert}
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
  invert: undefined,
};

Demo.defaultProps = defaultExampleBadgeProps;
export default Demo;
